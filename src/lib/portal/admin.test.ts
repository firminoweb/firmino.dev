import { describe, expect, it } from "vitest";
import { getDocumentFileForUser, getProjectDetailForUser } from "./access";
import {
  addDelivery,
  addDocument,
  addMilestone,
  AdminOnlyError,
  createClient,
  createProject,
  createUser,
  listClientsWithCounts,
  setTicketStatus,
  updateMilestone,
} from "./admin";
import { openTicket } from "./access";
import type { SessionUser } from "./auth";
import { seedTwoClients, testDb } from "./test-utils";

const pdf = { fileName: "nf.pdf", contentType: "application/pdf", data: Buffer.from("%PDF-1.4 teste") };

async function setup() {
  const db = await testDb();
  const seed = await seedTwoClients(db);
  const admin: SessionUser = { ...seed.admin, role: "admin", clientId: null };
  const alice: SessionUser = { ...seed.alice, role: "client", clientId: seed.clientA.id };
  return { db, ...seed, admin, alice };
}

describe("somente administrador", () => {
  it("cliente não consegue usar nenhuma ação de admin", async () => {
    const { db, alice, clientA, projectA } = await setup();
    await expect(createClient(db, alice, { name: "X" })).rejects.toBeInstanceOf(AdminOnlyError);
    await expect(createUser(db, alice, { clientId: clientA.id, name: "Y", email: "y@y.com" })).rejects.toBeInstanceOf(AdminOnlyError);
    await expect(addMilestone(db, alice, { projectId: projectA.id, title: "Z" })).rejects.toBeInstanceOf(AdminOnlyError);
    await expect(addDocument(db, alice, { clientId: clientA.id, kind: "contrato", title: "C", file: pdf })).rejects.toBeInstanceOf(AdminOnlyError);
  });
});

describe("cadastros do admin", () => {
  it("cria cliente, pessoa (e-mail normalizado) e projeto", async () => {
    const { db, admin } = await setup();
    const client = await createClient(db, admin, { name: "Clínica Sorriso" });
    const person = await createUser(db, admin, { clientId: client.id, name: "Maria", email: " Maria@Clinica.com " });
    expect(person.ok && person.user.email).toBe("maria@clinica.com");
    const project = await createProject(db, admin, { clientId: client.id, name: "Sistema de agendamento" });
    expect(project.name).toBe("Sistema de agendamento");
    const list = await listClientsWithCounts(db, admin);
    expect(list.find((c) => c.id === client.id)).toMatchObject({ people: 1, projects: 1 });
  });

  it("não duplica e-mail de pessoa", async () => {
    const { db, admin, clientB } = await setup();
    const res = await createUser(db, admin, { clientId: clientB.id, name: "Alice 2", email: "ALICE@a.com" });
    expect(res.ok).toBe(false);
  });

  it("cronograma, entregas e documentos aparecem para o cliente", async () => {
    const { db, admin, alice, clientA, projectA } = await setup();
    const m = await addMilestone(db, admin, { projectId: projectA.id, title: "Protótipo", dueDate: "2026-10-10" });
    await updateMilestone(db, admin, { id: m.id, status: "concluida" });
    await addDelivery(db, admin, { projectId: projectA.id, title: "Tela de login", deliveredOn: "2026-10-01" });
    const doc = await addDocument(db, admin, {
      clientId: clientA.id,
      projectId: projectA.id,
      kind: "nota_fiscal",
      title: "NF outubro",
      amountCents: 150000,
      paid: false,
      file: pdf,
    });
    const detail = await getProjectDetailForUser(db, alice, projectA.id);
    expect(detail?.milestones[0]).toMatchObject({ title: "Protótipo", status: "concluida" });
    expect(detail?.deliveries[0].title).toBe("Tela de login");
    expect(detail?.documents[0]).toMatchObject({ title: "NF outubro", amountCents: 150000, paid: false });
    const file = await getDocumentFileForUser(db, alice, doc.id);
    expect(Buffer.from(file!.data).toString()).toBe("%PDF-1.4 teste");
  });

  it("recusa documento que não é PDF ou imagem, ou maior que 4 MB", async () => {
    const { db, admin, clientA } = await setup();
    await expect(
      addDocument(db, admin, { clientId: clientA.id, kind: "outro", title: "x", file: { ...pdf, contentType: "application/x-msdownload" } }),
    ).rejects.toThrow();
    await expect(
      addDocument(db, admin, { clientId: clientA.id, kind: "outro", title: "x", file: { ...pdf, data: Buffer.alloc(4 * 1024 * 1024 + 1) } }),
    ).rejects.toThrow();
  });

  it("admin muda o status do chamado", async () => {
    const { db, admin, alice, projectA } = await setup();
    const t = await openTicket(db, alice, projectA.id, "Bug", "O botão não funciona");
    await setTicketStatus(db, admin, t!.id, "resolvido");
    const detail = await getProjectDetailForUser(db, alice, projectA.id);
    expect(detail?.tickets[0].status).toBe("resolvido");
  });
});
