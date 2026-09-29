import { createPgliteDb } from "@/db/pglite";
import type { Db } from "@/db";
import { clients, projects, users } from "@/db/schema";

/** Banco PGlite em memória, com migrações, isolado por teste. */
export function testDb(): Promise<Db> {
  return createPgliteDb();
}

/** Dois clientes (A e B), cada um com uma pessoa e um projeto, e um admin. */
export async function seedTwoClients(db: Db) {
  const [clientA, clientB] = await db
    .insert(clients)
    .values([{ name: "Cliente A" }, { name: "Cliente B" }])
    .returning();
  const [alice, bob, admin] = await db
    .insert(users)
    .values([
      { email: "alice@a.com", name: "Alice", role: "client", clientId: clientA.id },
      { email: "bob@b.com", name: "Bob", role: "client", clientId: clientB.id },
      { email: "joao@firmino.dev", name: "João", role: "admin" },
    ])
    .returning();
  const [projectA, projectB] = await db
    .insert(projects)
    .values([
      { clientId: clientA.id, name: "Projeto A" },
      { clientId: clientB.id, name: "Projeto B" },
    ])
    .returning();
  return { clientA, clientB, alice, bob, admin, projectA, projectB };
}
