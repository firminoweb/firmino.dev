import { and, asc, desc, eq, isNull, or, type SQL } from "drizzle-orm";
import type { Db } from "@/db";
import {
  clients,
  deliveries,
  documentFiles,
  documents,
  milestones,
  projects,
  ticketMessages,
  tickets,
  users,
} from "@/db/schema";
import type { SessionUser } from "./auth";
import type { DocumentView, ProjectDetail, ProjectSummary, TicketDetail } from "./types";

/* ════════════════════════════════════════════
   Porta única de leitura do cliente.
   Toda consulta filtra pelo cliente da sessão
   (admin vê tudo). Item de outra empresa volta
   null, e a página responde 404.
   ════════════════════════════════════════════ */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isUuid = (id: string) => UUID.test(id);

// Cliente sem empresa vinculada não enxerga nada (nunca casa com um id real)
const NO_CLIENT = "00000000-0000-0000-0000-000000000000";

/** Filtro de projetos visíveis ao usuário; undefined = sem restrição (admin). */
function projectScope(user: SessionUser): SQL | undefined {
  if (user.role === "admin") return undefined;
  return eq(projects.clientId, user.clientId ?? NO_CLIENT);
}

const summaryFields = {
  id: projects.id,
  name: projects.name,
  summary: projects.summary,
  stage: projects.stage,
  status: projects.status,
};

export async function listProjectsForUser(db: Db, user: SessionUser): Promise<ProjectSummary[]> {
  return db.select(summaryFields).from(projects).where(projectScope(user)).orderBy(asc(projects.name));
}

async function projectForUser(db: Db, user: SessionUser, projectId: string) {
  if (!isUuid(projectId)) return null;
  const [row] = await db
    .select({ ...summaryFields, clientId: projects.clientId, clientName: clients.name })
    .from(projects)
    .innerJoin(clients, eq(clients.id, projects.clientId))
    .where(and(eq(projects.id, projectId), projectScope(user)));
  return row ?? null;
}

const documentFieldsSelect = {
  id: documents.id,
  kind: documents.kind,
  title: documents.title,
  referenceDate: documents.referenceDate,
  amountCents: documents.amountCents,
  paid: documents.paid,
  fileName: documents.fileName,
  sizeBytes: documents.sizeBytes,
};

export async function getProjectDetailForUser(
  db: Db,
  user: SessionUser,
  projectId: string,
): Promise<ProjectDetail | null> {
  const row = await projectForUser(db, user, projectId);
  if (!row) return null;
  const { clientId, clientName, ...project } = row;

  const [milestoneRows, deliveryRows, ticketRows, documentRows] = await Promise.all([
    db
      .select({
        id: milestones.id,
        title: milestones.title,
        description: milestones.description,
        dueDate: milestones.dueDate,
        status: milestones.status,
      })
      .from(milestones)
      .where(eq(milestones.projectId, projectId))
      .orderBy(asc(milestones.position), asc(milestones.dueDate)),
    db
      .select({
        id: deliveries.id,
        title: deliveries.title,
        description: deliveries.description,
        deliveredOn: deliveries.deliveredOn,
        linkUrl: deliveries.linkUrl,
      })
      .from(deliveries)
      .where(eq(deliveries.projectId, projectId))
      .orderBy(desc(deliveries.deliveredOn)),
    db
      .select({ id: tickets.id, title: tickets.title, status: tickets.status, updatedAt: tickets.updatedAt })
      .from(tickets)
      .where(eq(tickets.projectId, projectId))
      .orderBy(desc(tickets.updatedAt)),
    db
      .select(documentFieldsSelect)
      .from(documents)
      .where(
        and(eq(documents.clientId, clientId), or(eq(documents.projectId, projectId), isNull(documents.projectId))),
      )
      .orderBy(desc(documents.createdAt)),
  ]);

  return {
    project: { ...project, clientName },
    milestones: milestoneRows,
    deliveries: deliveryRows,
    tickets: ticketRows.map((t) => ({ ...t, updatedAt: t.updatedAt.toISOString() })),
    documents: documentRows as DocumentView[],
  };
}

export async function getTicketForUser(db: Db, user: SessionUser, ticketId: string): Promise<TicketDetail | null> {
  if (!isUuid(ticketId)) return null;
  const [row] = await db
    .select({
      id: tickets.id,
      title: tickets.title,
      status: tickets.status,
      updatedAt: tickets.updatedAt,
      projectId: projects.id,
      projectName: projects.name,
      clientId: clients.id,
      clientName: clients.name,
    })
    .from(tickets)
    .innerJoin(projects, eq(projects.id, tickets.projectId))
    .innerJoin(clients, eq(clients.id, projects.clientId))
    .where(and(eq(tickets.id, ticketId), projectScope(user)));
  if (!row) return null;

  const messages = await db
    .select({
      id: ticketMessages.id,
      body: ticketMessages.body,
      createdAt: ticketMessages.createdAt,
      authorName: users.name,
      authorRole: users.role,
    })
    .from(ticketMessages)
    .leftJoin(users, eq(users.id, ticketMessages.authorId))
    .where(eq(ticketMessages.ticketId, ticketId))
    .orderBy(asc(ticketMessages.createdAt));

  return {
    ticket: { ...row, updatedAt: row.updatedAt.toISOString() },
    messages: messages.map((m) => ({
      id: m.id,
      body: m.body,
      createdAt: m.createdAt.toISOString(),
      authorName: m.authorRole === "admin" ? "Equipe firmino.dev" : (m.authorName ?? "Cliente"),
      fromTeam: m.authorRole === "admin",
    })),
  };
}

/** Abre um chamado com a primeira mensagem. null se o projeto não é do usuário. */
export async function openTicket(db: Db, user: SessionUser, projectId: string, title: string, body: string) {
  if (!(await projectForUser(db, user, projectId))) return null;
  const [ticket] = await db
    .insert(tickets)
    .values({ projectId, openedBy: user.id, title: title.trim() })
    .returning({ id: tickets.id });
  await db.insert(ticketMessages).values({ ticketId: ticket.id, authorId: user.id, body: body.trim() });
  return ticket;
}

/** Responde um chamado. null se o chamado não é do usuário. */
export async function addTicketMessage(db: Db, user: SessionUser, ticketId: string, body: string) {
  const ticket = await getTicketForUser(db, user, ticketId);
  if (!ticket) return null;
  const [message] = await db
    .insert(ticketMessages)
    .values({ ticketId, authorId: user.id, body: body.trim() })
    .returning({ id: ticketMessages.id });
  // Cliente respondendo um chamado resolvido reabre; resposta da equipe mantém o status
  await db
    .update(tickets)
    .set({
      updatedAt: new Date(),
      ...(user.role === "client" && ticket.ticket.status === "resolvido" && { status: "aberto" as const }),
    })
    .where(eq(tickets.id, ticketId));
  return { message, ticket: ticket.ticket };
}

/** Arquivo de um documento, só se for do cliente do usuário. */
export async function getDocumentFileForUser(db: Db, user: SessionUser, documentId: string) {
  if (!isUuid(documentId)) return null;
  const scope = user.role === "admin" ? undefined : eq(documents.clientId, user.clientId ?? NO_CLIENT);
  const [row] = await db
    .select({
      fileName: documents.fileName,
      contentType: documents.contentType,
      data: documentFiles.data,
    })
    .from(documents)
    .innerJoin(documentFiles, eq(documentFiles.documentId, documents.id))
    .where(and(eq(documents.id, documentId), scope));
  return row ?? null;
}
