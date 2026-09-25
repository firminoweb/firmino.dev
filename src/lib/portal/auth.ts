import { and, count, eq, gt, isNull } from "drizzle-orm";
import type { Db } from "@/db";
import { loginTokens, sessions, users } from "@/db/schema";
import { hashToken, newToken } from "./tokens";

/* ════════════════════════════════════════════
   Login da área do cliente (link mágico)
   Funções puras sobre o banco (testáveis com
   PGlite). Cookies, e-mail e redirecionamento
   ficam em session.ts e nas Server Actions.
   ════════════════════════════════════════════ */

export const LOGIN_TOKEN_TTL_MS = 15 * 60_000;
export const SESSION_TTL_MS = 30 * 24 * 60 * 60_000;
export const MAX_LINKS_PER_WINDOW = 3;

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "client";
  clientId: string | null;
}

interface RequestOptions {
  adminEmails: string[];
  now?: Date;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** E-mails de administrador a partir da variável ADMIN_EMAILS (separados por vírgula). */
export function adminEmailsFromEnv(): string[] {
  return (process.env.ADMIN_EMAILS ?? "").split(",").map(normalizeEmail).filter(Boolean);
}

const userFields = {
  id: users.id,
  email: users.email,
  name: users.name,
  role: users.role,
  clientId: users.clientId,
};

async function findUserByEmail(db: Db, email: string) {
  const [user] = await db
    .select({ ...userFields, active: users.active })
    .from(users)
    .where(eq(users.email, email));
  return user;
}

/**
 * Gera um link de acesso. Devolve null (sem revelar o motivo) para e-mail
 * desconhecido, pessoa desativada ou excesso de pedidos.
 */
export async function requestLoginLink(
  db: Db,
  rawEmail: string,
  { adminEmails, now = new Date() }: RequestOptions,
): Promise<{ token: string; user: SessionUser } | null> {
  const email = normalizeEmail(rawEmail);
  if (!email) return null;

  let user = await findUserByEmail(db, email);
  if (!user && adminEmails.includes(email)) {
    const [created] = await db
      .insert(users)
      .values({ email, name: email.split("@")[0], role: "admin" })
      .returning({ ...userFields, active: users.active });
    user = created;
  }
  if (!user?.active) return null;

  const windowStart = new Date(now.getTime() - LOGIN_TOKEN_TTL_MS);
  const [{ recent }] = await db
    .select({ recent: count() })
    .from(loginTokens)
    .where(and(eq(loginTokens.userId, user.id), gt(loginTokens.createdAt, windowStart)));
  if (recent >= MAX_LINKS_PER_WINDOW) return null;

  const token = newToken();
  await db.insert(loginTokens).values({
    userId: user.id,
    tokenHash: hashToken(token),
    expiresAt: new Date(now.getTime() + LOGIN_TOKEN_TTL_MS),
    createdAt: now,
  });

  return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role, clientId: user.clientId } };
}

/** O link ainda pode ser usado? (tela de confirmação, sem consumir) */
export async function isLoginTokenUsable(db: Db, token: string, now = new Date()): Promise<boolean> {
  const [row] = await db
    .select({ id: loginTokens.id })
    .from(loginTokens)
    .where(
      and(eq(loginTokens.tokenHash, hashToken(token)), isNull(loginTokens.usedAt), gt(loginTokens.expiresAt, now)),
    );
  return Boolean(row);
}

/**
 * Consome o link (uso único, atômico) e cria a sessão.
 * Devolve o token da sessão para o cookie.
 */
export async function consumeLoginToken(
  db: Db,
  token: string,
  now = new Date(),
): Promise<{ sessionToken: string; user: SessionUser } | null> {
  const [used] = await db
    .update(loginTokens)
    .set({ usedAt: now })
    .where(
      and(eq(loginTokens.tokenHash, hashToken(token)), isNull(loginTokens.usedAt), gt(loginTokens.expiresAt, now)),
    )
    .returning({ userId: loginTokens.userId });
  if (!used) return null;

  const [user] = await db
    .select(userFields)
    .from(users)
    .where(and(eq(users.id, used.userId), eq(users.active, true)));
  if (!user) return null;

  const sessionToken = newToken();
  await db.insert(sessions).values({
    userId: user.id,
    tokenHash: hashToken(sessionToken),
    expiresAt: new Date(now.getTime() + SESSION_TTL_MS),
    createdAt: now,
  });
  return { sessionToken, user };
}

/** Usuário da sessão, ou null se a sessão não existe, expirou ou a pessoa foi desativada. */
export async function getSessionUser(db: Db, sessionToken: string, now = new Date()): Promise<SessionUser | null> {
  const [user] = await db
    .select(userFields)
    .from(sessions)
    .innerJoin(users, eq(users.id, sessions.userId))
    .where(and(eq(sessions.tokenHash, hashToken(sessionToken)), gt(sessions.expiresAt, now), eq(users.active, true)));
  return user ?? null;
}

export async function destroySession(db: Db, sessionToken: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.tokenHash, hashToken(sessionToken)));
}
