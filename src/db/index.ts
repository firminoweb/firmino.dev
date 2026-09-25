import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import * as schema from "./schema";

/*
 * Conexão da área do cliente.
 * - DATABASE_URL presente: Neon (driver HTTP serverless).
 * - Sem DATABASE_URL fora de produção (ou PORTAL_PGLITE=1): PGlite em .pglite/,
 *   um Postgres embutido para desenvolver e testar sem credenciais.
 */
export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;

let dbPromise: Promise<Db> | undefined;

export function getDb(): Promise<Db> {
  dbPromise ??= createDb();
  return dbPromise;
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
