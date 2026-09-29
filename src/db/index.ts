import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import * as schema from "./schema";

/*
 * Conexão da área do cliente.
 * - DATABASE_URL presente: Neon (driver HTTP serverless).
 * - Sem DATABASE_URL fora de produção (ou PORTAL_PGLITE=1): PGlite em .pglite/,
 *   um Postgres embutido para desenvolver e testar sem credenciais.
 */
export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;

/*
 * Guardado no globalThis, não numa variável do módulo: o Next carrega este
 * arquivo uma vez para páginas/Actions e outra para route handlers (e de novo
 * a cada hot reload). Com PGlite, cada cópia abriria o mesmo .pglite/ e uma
 * não enxergaria as gravações da outra (ex.: download dando 401 logo após o login).
 */
const globalForDb = globalThis as typeof globalThis & { __firminoDb?: Promise<Db> };

export function getDb(): Promise<Db> {
  globalForDb.__firminoDb ??= createDb().catch((err) => {
    globalForDb.__firminoDb = undefined; // falhou ao abrir: tenta de novo na próxima requisição
    throw err;
  });
  return globalForDb.__firminoDb;
}

async function createDb(): Promise<Db> {
  const url = process.env.DATABASE_URL;
  if (url && process.env.PORTAL_PGLITE !== "1") {
    const { neon } = await import("@neondatabase/serverless");
    const { drizzle } = await import("drizzle-orm/neon-http");
    return drizzle(neon(url), { schema }) as unknown as Db;
  }
  if (process.env.NODE_ENV === "production" && process.env.PORTAL_PGLITE !== "1") {
    throw new Error("[portal] DATABASE_URL ausente em produção");
  }
  const { createPgliteDb } = await import("./pglite");
  return createPgliteDb(".pglite");
}
