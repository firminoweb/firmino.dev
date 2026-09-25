import { and, asc, count, desc, eq, isNull, ne } from "drizzle-orm";
import type { Db } from "@/db";
import {
  clients,
  deliveries,
  documentFiles,
  documents,
  milestones,
  projects,
  tickets,
  users,
} from "@/db/schema";
import { normalizeEmail, type SessionUser } from "./auth";
import type { DocumentKind, MilestoneStatus, ProjectStatus, TicketStatus } from "./types";

/* ════════════════════════════════════════════
   Ações do administrador da área do cliente.
   Toda função confere o papel (assertAdmin)
   além da verificação feita na página/Action.
   ════════════════════════════════════════════ */

export class AdminOnlyError extends Error {
  constructor() {
    super("Ação restrita ao administrador");
  }
}

function assertAdmin(user: SessionUser) {
  if (user.role !== "admin") throw new AdminOnlyError();
}

export const MAX_FILE_BYTES = 4 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ["application/pdf", "image/png", "image/jpeg"];

/* ── Clientes e pessoas ── */

export async function listClientsWithCounts(db: Db, admin: SessionUser) {
  assertAdmin(admin);
  const [clientRows, peopleRows, projectRows] = await Promise.all([
    db.select().from(clients).orderBy(asc(clients.name)),
    db.select({ clientId: users.clientId, n: count() }).from(users).where(eq(users.role, "client")).groupBy(users.clientId),
    db.select({ clientId: projects.clientId, n: count() }).from(projects).groupBy(projects.clientId),
  ]);
  const people = new Map(peopleRows.map((r) => [r.clientId, r.n]));
  const projectCount = new Map(projectRows.map((r) => [r.clientId, r.n]));
  return clientRows.map((c) => ({
    id: c.id,
    name: c.name,
    people: people.get(c.id) ?? 0,
    projects: projectCount.get(c.id) ?? 0,
  }));
}

export async function getClientForAdmin(db: Db, admin: SessionUser, clientId: string) {
  assertAdmin(admin);
  const [client] = await db.select().from(clients).where(eq(clients.id, clientId));
  if (!client) return null;
  const [people, projectRows, generalDocs] = await Promise.all([
    db
      .select({ id: users.id, name: users.name, email: users.email, active: users.active })
      .from(users)
      .where(eq(users.clientId, clientId))
      .orderBy(asc(users.name)),
    db
      .select({ id: projects.id, name: projects.name, stage: projects.stage, status: projects.status })
      .from(projects)
      .where(eq(projects.clientId, clientId))
      .orderBy(asc(projects.name)),
    db
      .select({ id: documents.id, title: documents.title, kind: documents.kind, fileName: documents.fileName })
      .from(documents)
      .where(and(eq(documents.clientId, clientId), isNull(documents.projectId)))
      .orderBy(desc(documents.createdAt)),
  ]);
  return { client, people, projects: projectRows, documents: generalDocs };
}

export async function createClient(db: Db, admin: SessionUser, input: { name: string }) {
  assertAdmin(admin);
  const [client] = await db.insert(clients).values({ name: input.name.trim() }).returning();
  return client;
}

export async function updateClient(db: Db, admin: SessionUser, input: { id: string; name: string }) {
  assertAdmin(admin);
  await db.update(clients).set({ name: input.name.trim() }).where(eq(clients.id, input.id));
}

export async function createUser(
  db: Db,
  admin: SessionUser,
  input: { clientId: string; name: string; email: string },
): Promise<{ ok: true; user: { id: string; email: string } } | { ok: false; error: string }> {
  assertAdmin(admin);
  const email = normalizeEmail(input.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "E-mail inválido." };
  const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
  if (existing) return { ok: false, error: "Esse e-mail já tem acesso cadastrado." };
  const [user] = await db
    .insert(users)
    .values({ clientId: input.clientId, name: input.name.trim(), email, role: "client" })
    .returning({ id: users.id, email: users.email });
  return { ok: true, user };
}

export async function setUserActive(db: Db, admin: SessionUser, userId: string, active: boolean) {
  assertAdmin(admin);
  await db.update(users).set({ active }).where(and(eq(users.id, userId), ne(users.role, "admin")));
}

/** E-mails ativos de um cliente, para os avisos. */
export async function clientEmails(db: Db, clientId: string): Promise<string[]> {
  const rows = await db
    .select({ email: users.email })
    .from(users)
    .where(and(eq(users.clientId, clientId), eq(users.active, true)));
  return rows.map((r) => r.email);
}

/* ── Projetos ── */

export async function createProject(
  db: Db,
  admin: SessionUser,
  input: { clientId: string; name: string; summary?: string; stage?: string },
) {
  assertAdmin(admin);
  const [project] = await db
    .insert(projects)
    .values({
      clientId: input.clientId,
      name: input.name.trim(),
      summary: input.summary?.trim() ?? "",
      stage: input.stage?.trim() ?? "",
    })
    .returning();
  return project;
}

export async function updateProject(
  db: Db,
  admin: SessionUser,
  input: { id: string; name: string; summary: string; stage: string; status: ProjectStatus },
) {
  assertAdmin(admin);
  await db
    .update(projects)
    .set({
      name: input.name.trim(),
      summary: input.summary.trim(),
      stage: input.stage.trim(),
      status: input.status,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, input.id));
}

export async function getProjectClientId(db: Db, projectId: string): Promise<string | null> {
  const [row] = await db.select({ clientId: projects.clientId }).from(projects).where(eq(projects.id, projectId));
  return row?.clientId ?? null;
}

/* ── Cronograma ── */

export async function addMilestone(
  db: Db,
  admin: SessionUser,
  input: { projectId: string; title: string; description?: string; dueDate?: string | null },
) {
  assertAdmin(admin);
  const [{ n }] = await db.select({ n: count() }).from(milestones).where(eq(milestones.projectId, input.projectId));
  const [milestone] = await db
    .insert(milestones)
    .values({
      projectId: input.projectId,
      title: input.title.trim(),
      description: input.description?.trim() ?? "",
      dueDate: input.dueDate || null,
      position: n,
    })
    .returning();
  return milestone;
}

export async function updateMilestone(
  db: Db,
  admin: SessionUser,
  input: { id: string; title?: string; description?: string; dueDate?: string | null; status?: MilestoneStatus },
) {
  assertAdmin(admin);
  await db
    .update(milestones)
    .set({
      ...(input.title !== undefined && { title: input.title.trim() }),
      ...(input.description !== undefined && { description: input.description.trim() }),
      ...(input.dueDate !== undefined && { dueDate: input.dueDate || null }),
      ...(input.status && { status: input.status, completedAt: input.status === "concluida" ? new Date() : null }),
    })
    .where(eq(milestones.id, input.id));
}

export async function deleteMilestone(db: Db, admin: SessionUser, id: string) {
  assertAdmin(admin);
  await db.delete(milestones).where(eq(milestones.id, id));
}

/* ── Entregas ── */

export async function addDelivery(
  db: Db,
  admin: SessionUser,
  input: { projectId: string; title: string; description?: string; deliveredOn: string; linkUrl?: string | null },
) {
  assertAdmin(admin);
  const [delivery] = await db
    .insert(deliveries)
    .values({
      projectId: input.projectId,
      title: input.title.trim(),
      description: input.description?.trim() ?? "",
      deliveredOn: input.deliveredOn,
      linkUrl: input.linkUrl?.trim() || null,
    })
    .returning();
  return delivery;
}

export async function deleteDelivery(db: Db, admin: SessionUser, id: string) {
  assertAdmin(admin);
  await db.delete(deliveries).where(eq(deliveries.id, id));
}

/* ── Documentos e faturas ── */

export async function addDocument(
  db: Db,
  admin: SessionUser,
  input: {
    clientId: string;
    projectId?: string | null;
    kind: DocumentKind;
    title: string;
    referenceDate?: string | null;
    amountCents?: number | null;
    paid?: boolean | null;
    file: { fileName: string; contentType: string; data: Buffer };
  },
) {
  assertAdmin(admin);
  if (!ALLOWED_FILE_TYPES.includes(input.file.contentType)) {
    throw new Error("Tipo de arquivo não permitido. Envie PDF, PNG ou JPG.");
  }
  if (input.file.data.byteLength > MAX_FILE_BYTES) throw new Error("Arquivo maior que 4 MB.");

  const [doc] = await db
    .insert(documents)
    .values({
      clientId: input.clientId,
      projectId: input.projectId || null,
      kind: input.kind,
      title: input.title.trim(),
      referenceDate: input.referenceDate || null,
      amountCents: input.amountCents ?? null,
      paid: input.paid ?? null,
      fileName: input.file.fileName,
      contentType: input.file.contentType,
      sizeBytes: input.file.data.byteLength,
    })
    .returning();
  await db.insert(documentFiles).values({ documentId: doc.id, data: input.file.data });
  return doc;
}

export async function setDocumentPaid(db: Db, admin: SessionUser, id: string, paid: boolean) {
  assertAdmin(admin);
  await db.update(documents).set({ paid }).where(eq(documents.id, id));
}

export async function deleteDocument(db: Db, admin: SessionUser, id: string) {
  assertAdmin(admin);
  await db.delete(documents).where(eq(documents.id, id));
}

/* ── Chamados ── */

export async function setTicketStatus(db: Db, admin: SessionUser, ticketId: string, status: TicketStatus) {
  assertAdmin(admin);
  await db.update(tickets).set({ status, updatedAt: new Date() }).where(eq(tickets.id, ticketId));
}

/** Chamados não resolvidos de todos os clientes, mais recentes primeiro (painel). */
export async function listOpenTickets(db: Db, admin: SessionUser) {
  assertAdmin(admin);
  const rows = await db
    .select({
      id: tickets.id,
      title: tickets.title,
      status: tickets.status,
      updatedAt: tickets.updatedAt,
      projectName: projects.name,
      clientName: clients.name,
    })
    .from(tickets)
    .innerJoin(projects, eq(projects.id, tickets.projectId))
    .innerJoin(clients, eq(clients.id, projects.clientId))
    .where(ne(tickets.status, "resolvido"))
    .orderBy(desc(tickets.updatedAt));
  return rows.map((r) => ({ ...r, updatedAt: r.updatedAt.toISOString() }));
}
