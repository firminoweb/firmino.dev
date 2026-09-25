"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { addTicketMessage, getProjectDetailForUser, openTicket } from "@/lib/portal/access";
import { clientEmails, setTicketStatus } from "@/lib/portal/admin";
import { notifyClient, notifyTeamTicket } from "@/lib/portal/notify";
import { requestOrigin, requireAdmin, requireUser } from "@/lib/portal/session";
import type { TicketStatus } from "@/lib/portal/types";

export interface TicketFormState {
  error?: string;
}

export async function openTicketAction(projectId: string, _prev: TicketFormState, formData: FormData): Promise<TicketFormState> {
  const user = await requireUser();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (title.length < 3 || body.length < 5) return { error: "Escreva um título e descreva o que você precisa." };
  if (title.length > 160 || body.length > 5000) return { error: "Texto muito longo." };

  const db = await getDb();
  const detail = await getProjectDetailForUser(db, user, projectId);
  const ticket = detail && (await openTicket(db, user, projectId, title, body));
  if (!detail || !ticket) return { error: "Projeto não encontrado." };

  await notifyTeamTicket({
    clientName: detail.project.clientName,
    projectName: detail.project.name,
    title,
    body,
    url: `${await requestOrigin()}/cliente/chamados/${ticket.id}`,
    isNew: true,
  });
  redirect(`/cliente/chamados/${ticket.id}`);
}

export async function replyTicketAction(ticketId: string, _prev: TicketFormState, formData: FormData): Promise<TicketFormState> {
  const user = await requireUser();
  const body = String(formData.get("body") ?? "").trim();
  if (body.length < 2) return { error: "Escreva a sua mensagem." };
  if (body.length > 5000) return { error: "Mensagem muito longa." };

  const db = await getDb();
  const res = await addTicketMessage(db, user, ticketId, body);
  if (!res) return { error: "Chamado não encontrado." };

  const url = `${await requestOrigin()}/cliente/chamados/${ticketId}`;
  const { ticket } = res;
  if (user.role === "admin") {
    await notifyClient(
      await clientEmails(db, ticket.clientId),
      `Resposta no seu chamado: ${ticket.title}`,
      [`A equipe firmino.dev respondeu o chamado "${ticket.title}" (${ticket.projectName}):`, body],
      url,
    );
  } else {
    await notifyTeamTicket({ clientName: ticket.clientName, projectName: ticket.projectName, title: ticket.title, body, url, isNew: false });
  }
  revalidatePath(`/cliente/chamados/${ticketId}`);
  return {};
}

export async function setTicketStatusAction(ticketId: string, formData: FormData) {
  const admin = await requireAdmin();
  const status = String(formData.get("status")) as TicketStatus;
  if (!["aberto", "em_andamento", "resolvido"].includes(status)) return;
  await setTicketStatus(await getDb(), admin, ticketId, status);
  revalidatePath(`/cliente/chamados/${ticketId}`);
}
