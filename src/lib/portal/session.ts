import { cache } from "react";
import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getDb } from "@/db";
import { adminEmailsFromEnv, getSessionUser, SESSION_TTL_MS, type SessionUser } from "./auth";

/* ════════════════════════════════════════════
   Sessão da área do cliente no Next (cookies).
   Só usado em Server Components e Actions de
   /cliente; as páginas públicas nunca chamam.
   ════════════════════════════════════════════ */

export const SESSION_COOKIE = "firmino_session";

export async function setSessionCookie(token: string) {
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/cliente",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function readSessionCookie(): Promise<string | undefined> {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function clearSessionCookie() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/cliente" });
}

/** Usuário logado (uma consulta por requisição, graças ao cache do React). */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const token = await readSessionCookie();
  if (!token) return null;
  return getSessionUser(await getDb(), token);
});

/** Admin de verdade: papel no banco E e-mail ainda listado em ADMIN_EMAILS. */
export function isAdmin(user: SessionUser | null): boolean {
  return user?.role === "admin" && adminEmailsFromEnv().includes(user.email);
}

export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/cliente/entrar");
  return user;
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  if (!isAdmin(user)) notFound();
  return user;
}

/** Origem do site na requisição atual (links de e-mail certos em dev, preview e produção). */
export async function requestOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "firmino.dev";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}
