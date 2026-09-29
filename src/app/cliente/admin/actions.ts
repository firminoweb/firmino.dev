"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import {
  addDelivery,
  addDocument,
  addMilestone,
  clientEmails,
  createClient,
  createProject,
  createUser,
  deleteDelivery,
  deleteDocument,
  deleteMilestone,
  getProjectClientId,
  setDocumentPaid,
  setUserActive,
  updateClient,
  updateMilestone,
  updateProject,
} from "@/lib/portal/admin";
import { notifyClient } from "@/lib/portal/notify";
import { requestOrigin, requireAdmin } from "@/lib/portal/session";
import { STATUS_LABELS, type DocumentKind, type MilestoneStatus, type ProjectStatus } from "@/lib/portal/types";

export interface AdminFormState {
  error?: string;
  ok?: string;
}

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const clientPath = (id: string) => `/cliente/admin/clientes/${id}`;
const projectPath = (id: string) => `/cliente/admin/projetos/${id}`;

/** "1.500,00" / "1500" / "1500.5" → centavos; vazio → null. */
function parseMoney(value: string): number | null {
  if (!value) return null;
  const normalized = value.replace(/[^\d,.-]/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? Math.round(n * 100) : null;
}

/* ── Clientes e pessoas ── */

export async function createClientAction(formData: FormData) {
  const admin = await requireAdmin();
  const name = str(formData, "name");
  if (!name) return;
  const client = await createClient(await getDb(), admin, { name });
  redirect(clientPath(client.id));
}

export async function updateClientAction(clientId: string, formData: FormData) {
  const admin = await requireAdmin();
  const name = str(formData, "name");
  if (name) await updateClient(await getDb(), admin, { id: clientId, name });
  revalidatePath(clientPath(clientId));
}

export async function createUserAction(clientId: string, _prev: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const admin = await requireAdmin();
  const name = str(formData, "name");
  if (!name) return { error: "Informe o nome." };
  const res = await createUser(await getDb(), admin, { clientId, name, email: str(formData, "email") });
  if (!res.ok) return { error: res.error };
  revalidatePath(clientPath(clientId));
  return { ok: `Acesso criado para ${res.user.email}. Avise a pessoa que ela entra em /cliente/entrar com esse e-mail.` };
}

export async function setUserActiveAction(userId: string, clientId: string, active: boolean) {
  const admin = await requireAdmin();
  await setUserActive(await getDb(), admin, userId, active);
  revalidatePath(clientPath(clientId));
}

/* ── Projetos ── */

export async function createProjectAction(clientId: string, formData: FormData) {
  const admin = await requireAdmin();
  const name = str(formData, "name");
  if (!name) return;
  const project = await createProject(await getDb(), admin, { clientId, name, summary: str(formData, "summary") });
  redirect(projectPath(project.id));
}

export async function updateProjectAction(projectId: string, formData: FormData) {
  const admin = await requireAdmin();
  const status = str(formData, "status") as ProjectStatus;
  if (!(status in STATUS_LABELS.project)) return;
  await updateProject(await getDb(), admin, {
    id: projectId,
    name: str(formData, "name"),
    summary: str(formData, "summary"),
    stage: str(formData, "stage"),
    status,
  });
  revalidatePath(projectPath(projectId));
}

/* ── Cronograma ── */

export async function addMilestoneAction(projectId: string, formData: FormData) {
  const admin = await requireAdmin();
  const title = str(formData, "title");
  if (!title) return;
  await addMilestone(await getDb(), admin, {
    projectId,
    title,
    description: str(formData, "description"),
    dueDate: str(formData, "dueDate") || null,
  });
  revalidatePath(projectPath(projectId));
}

export async function updateMilestoneAction(milestoneId: string, projectId: string, formData: FormData) {
  const admin = await requireAdmin();
  const status = str(formData, "status") as MilestoneStatus;
  await updateMilestone(await getDb(), admin, {
    id: milestoneId,
    title: str(formData, "title"),
    description: str(formData, "description"),
    dueDate: str(formData, "dueDate") || null,
    ...(status in STATUS_LABELS.milestone && { status }),
  });
  revalidatePath(projectPath(projectId));
}

export async function deleteMilestoneAction(milestoneId: string, projectId: string) {
  const admin = await requireAdmin();
  await deleteMilestone(await getDb(), admin, milestoneId);
  revalidatePath(projectPath(projectId));
}

/* ── Entregas ── */

export async function addDeliveryAction(projectId: string, formData: FormData) {
  const admin = await requireAdmin();
  const title = str(formData, "title");
  const deliveredOn = str(formData, "deliveredOn");
  if (!title || !deliveredOn) return;
  const db = await getDb();
  await addDelivery(db, admin, {
    projectId,
    title,
    description: str(formData, "description"),
    deliveredOn,
    linkUrl: str(formData, "linkUrl") || null,
  });
  if (formData.get("notify") === "on") {
    const clientId = await getProjectClientId(db, projectId);
    if (clientId) {
      await notifyClient(
        await clientEmails(db, clientId),
        `Nova entrega no seu projeto: ${title}`,
        ["Tem entrega nova no seu projeto.", title, str(formData, "description")],
        `${await requestOrigin()}/cliente/projetos/${projectId}`,
      );
    }
  }
  revalidatePath(projectPath(projectId));
}

export async function deleteDeliveryAction(deliveryId: string, projectId: string) {
  const admin = await requireAdmin();
  await deleteDelivery(await getDb(), admin, deliveryId);
  revalidatePath(projectPath(projectId));
}

/* ── Documentos e faturas ── */

export async function addDocumentAction(
  target: { clientId: string; projectId: string | null },
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const admin = await requireAdmin();
  const file = formData.get("file");
  const title = str(formData, "title");
  const kind = str(formData, "kind") as DocumentKind;
  if (!(file instanceof File) || file.size === 0) return { error: "Escolha o arquivo." };
  if (!title) return { error: "Informe o título." };
  if (!(kind in STATUS_LABELS.document)) return { error: "Tipo inválido." };

  const paidValue = str(formData, "paid");
  const db = await getDb();
  try {
    await addDocument(db, admin, {
      ...target,
      kind,
      title,
      referenceDate: str(formData, "referenceDate") || null,
      amountCents: parseMoney(str(formData, "amount")),
      paid: paidValue === "" ? null : paidValue === "sim",
      file: { fileName: file.name, contentType: file.type, data: Buffer.from(await file.arrayBuffer()) },
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Falha ao salvar o arquivo." };
  }

  if (formData.get("notify") === "on") {
    await notifyClient(
      await clientEmails(db, target.clientId),
      `Novo documento na área do cliente: ${title}`,
      [`Um novo documento foi disponibilizado para você: ${title}.`],
      `${await requestOrigin()}${target.projectId ? `/cliente/projetos/${target.projectId}` : "/cliente"}`,
    );
  }
  revalidatePath(target.projectId ? projectPath(target.projectId) : clientPath(target.clientId));
  return { ok: "Documento enviado." };
}

export async function setDocumentPaidAction(documentId: string, path: string, paid: boolean) {
  const admin = await requireAdmin();
  await setDocumentPaid(await getDb(), admin, documentId, paid);
  revalidatePath(path);
}

export async function deleteDocumentAction(documentId: string, path: string) {
  const admin = await requireAdmin();
  await deleteDocument(await getDb(), admin, documentId);
  revalidatePath(path);
}
