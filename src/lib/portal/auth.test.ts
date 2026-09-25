import { describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import {
  consumeLoginToken,
  destroySession,
  getSessionUser,
  isLoginTokenUsable,
  requestLoginLink,
} from "./auth";
import { seedTwoClients, testDb } from "./test-utils";

const T0 = new Date("2026-09-25T12:00:00Z");
const minutes = (n: number) => new Date(T0.getTime() + n * 60_000);
const opts = { adminEmails: ["joao@firmino.dev"], now: T0 };

describe("pedido de link", () => {
  it("gera link para pessoa cadastrada, ignorando maiúsculas e espaços", async () => {
    const db = await testDb();
    const { alice } = await seedTwoClients(db);
    const res = await requestLoginLink(db, "  ALICE@a.com ", opts);
    expect(res?.user.id).toBe(alice.id);
    expect(res?.token).toMatch(/^[A-Za-z0-9_-]{40,}$/);
  });

  it("não gera link para e-mail desconhecido", async () => {
    const db = await testDb();
    await seedTwoClients(db);
    expect(await requestLoginLink(db, "estranho@x.com", opts)).toBeNull();
  });

  it("não gera link para pessoa desativada", async () => {
    const db = await testDb();
    const { alice } = await seedTwoClients(db);
    await db.update(users).set({ active: false }).where(eq(users.id, alice.id));
    expect(await requestLoginLink(db, "alice@a.com", opts)).toBeNull();
  });

  it("cria o administrador no primeiro acesso se o e-mail estiver em ADMIN_EMAILS", async () => {
    const db = await testDb();
    const res = await requestLoginLink(db, "novo-admin@firmino.dev", {
      adminEmails: ["novo-admin@firmino.dev"],
      now: T0,
    });
    expect(res?.user.role).toBe("admin");
  });

  it("limita a 3 links por e-mail a cada 15 minutos", async () => {
    const db = await testDb();
    await seedTwoClients(db);
    for (let i = 0; i < 3; i++) expect(await requestLoginLink(db, "alice@a.com", opts)).not.toBeNull();
    expect(await requestLoginLink(db, "alice@a.com", opts)).toBeNull();
    expect(await requestLoginLink(db, "alice@a.com", { ...opts, now: minutes(16) })).not.toBeNull();
  });
});

describe("uso do link", () => {
  it("cria sessão uma única vez", async () => {
    const db = await testDb();
    await seedTwoClients(db);
    const { token } = (await requestLoginLink(db, "alice@a.com", opts))!;
    expect(await isLoginTokenUsable(db, token, minutes(1))).toBe(true);
    const first = await consumeLoginToken(db, token, minutes(1));
    expect(first?.user.email).toBe("alice@a.com");
    expect(await consumeLoginToken(db, token, minutes(2))).toBeNull();
    expect(await isLoginTokenUsable(db, token, minutes(2))).toBe(false);
  });

  it("rejeita link expirado (mais de 15 minutos)", async () => {
    const db = await testDb();
    await seedTwoClients(db);
    const { token } = (await requestLoginLink(db, "alice@a.com", opts))!;
    expect(await consumeLoginToken(db, token, minutes(16))).toBeNull();
  });

  it("rejeita token desconhecido", async () => {
    const db = await testDb();
    expect(await consumeLoginToken(db, "token-que-nao-existe-aaaaaaaaaaaaaaaaaaaaaaaa", T0)).toBeNull();
  });
});

describe("sessão", () => {
  async function loggedIn() {
    const db = await testDb();
    const seed = await seedTwoClients(db);
    const { token } = (await requestLoginLink(db, "alice@a.com", opts))!;
    const { sessionToken } = (await consumeLoginToken(db, token, T0))!;
    return { db, seed, sessionToken };
  }

  it("identifica o usuário da sessão", async () => {
    const { db, seed, sessionToken } = await loggedIn();
    const user = await getSessionUser(db, sessionToken, minutes(60));
    expect(user).toMatchObject({ id: seed.alice.id, role: "client", clientId: seed.clientA.id });
  });

  it("expira depois de 30 dias", async () => {
    const { db, sessionToken } = await loggedIn();
    expect(await getSessionUser(db, sessionToken, minutes(60 * 24 * 31))).toBeNull();
  });

  it("perde o acesso na hora se a pessoa for desativada", async () => {
    const { db, seed, sessionToken } = await loggedIn();
    await db.update(users).set({ active: false }).where(eq(users.id, seed.alice.id));
    expect(await getSessionUser(db, sessionToken, minutes(1))).toBeNull();
  });

  it("sair encerra a sessão", async () => {
    const { db, sessionToken } = await loggedIn();
    await destroySession(db, sessionToken);
    expect(await getSessionUser(db, sessionToken, minutes(1))).toBeNull();
  });
});
