import { describe, expect, it } from "vitest";
import { documents, documentFiles } from "@/db/schema";
import {
  addTicketMessage,
  getDocumentFileForUser,
  getProjectDetailForUser,
  getTicketForUser,
  listProjectsForUser,
  openTicket,
} from "./access";
import type { SessionUser } from "./auth";
import { seedTwoClients, testDb } from "./test-utils";

const asSession = (u: { id: string; email: string; name: string; role: "admin" | "client"; clientId: string | null }): SessionUser => ({
  id: u.id,
  email: u.email,
  name: u.name,
  role: u.role,
  clientId: u.clientId,
});

async function setup() {
  const db = await testDb();
  const seed = await seedTwoClients(db);
  return { db, ...seed, alice: asSession(seed.alice), bob: asSession(seed.bob), admin: asSession(seed.admin) };
}

describe("isolamento entre clientes", () => {
  it("cliente só lista os projetos da própria empresa", async () => {
    const { db, alice, projectA } = await setup();
    const list = await listProjectsForUser(db, alice);
    expect(list.map((p) => p.id)).toEqual([projectA.id]);
  });

  it("cliente não abre projeto de outra empresa, nem trocando o id", async () => {
    const { db, alice, projectA, projectB } = await setup();
    expect(await getProjectDetailForUser(db, alice, projectA.id)).not.toBeNull();
    expect(await getProjectDetailForUser(db, alice, projectB.id)).toBeNull();
  });

  it("id inválido não quebra, só não encontra", async () => {
    const { db, alice } = await setup();
    expect(await getProjectDetailForUser(db, alice, "nao-e-uuid")).toBeNull();
  });

  it("cliente não abre chamado em projeto de outra empresa", async () => {
    const { db, alice, projectB } = await setup();
    expect(await openTicket(db, alice, projectB.id, "Título", "Mensagem do chamado")).toBeNull();
  });

  it("cliente não lê nem responde chamado de outra empresa", async () => {
    const { db, alice, bob, projectB } = await setup();
    const ticket = await openTicket(db, bob, projectB.id, "Erro no login", "Não consigo entrar no sistema");
    expect(ticket).not.toBeNull();
    expect(await getTicketForUser(db, alice, ticket!.id)).toBeNull();
    expect(await addTicketMessage(db, alice, ticket!.id, "Mensagem intrusa")).toBeNull();
    expect((await getTicketForUser(db, bob, ticket!.id))?.messages).toHaveLength(1);
  });

  it("cliente não baixa documento de outra empresa", async () => {
    const { db, alice, bob, clientB } = await setup();
    const [doc] = await db
      .insert(documents)
      .values({ clientId: clientB.id, kind: "contrato", title: "Contrato B", fileName: "b.pdf", contentType: "application/pdf", sizeBytes: 3 })
      .returning();
    await db.insert(documentFiles).values({ documentId: doc.id, data: Buffer.from("PDF") });
    expect(await getDocumentFileForUser(db, alice, doc.id)).toBeNull();
    const own = await getDocumentFileForUser(db, bob, doc.id);
    expect(Buffer.from(own!.data).toString()).toBe("PDF");
  });

  it("admin acessa projetos de qualquer cliente", async () => {
    const { db, admin, projectA, projectB } = await setup();
    expect(await getProjectDetailForUser(db, admin, projectA.id)).not.toBeNull();
    expect(await getProjectDetailForUser(db, admin, projectB.id)).not.toBeNull();
  });
});

describe("detalhe do projeto", () => {
  it("traz cronograma, entregas, chamados e documentos do projeto e gerais do cliente", async () => {
    const { db, alice, clientA, projectA } = await setup();
    await db.insert(documents).values([
      { clientId: clientA.id, kind: "contrato", title: "Contrato geral", fileName: "c.pdf", contentType: "application/pdf", sizeBytes: 1 },
      { clientId: clientA.id, projectId: projectA.id, kind: "nota_fiscal", title: "NF 1", fileName: "n.pdf", contentType: "application/pdf", sizeBytes: 1 },
    ]);
    await openTicket(db, alice, projectA.id, "Ajuste", "Trocar a cor do botão");
    const detail = await getProjectDetailForUser(db, alice, projectA.id);
    expect(detail?.documents.map((d) => d.title).sort()).toEqual(["Contrato geral", "NF 1"]);
    expect(detail?.tickets).toHaveLength(1);
    expect(detail?.milestones).toEqual([]);
    expect(detail?.deliveries).toEqual([]);
  });
});
