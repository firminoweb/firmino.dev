import { z } from "zod";
import { Resend } from "resend";
import { jsonResponse, errorResponse } from "@/lib/api";

const PROJECT_TYPE_LABELS: Record<string, string> = {
  web: "Site ou sistema web",
  mobile: "App mobile (iOS/Android)",
  ia: "IA e automação",
  reforco: "Reforço para time ou agência",
  outro: "Outro / ainda não sei",
};

const ContactSchema = z.object({
  name: z.string().min(2, "Nome muito curto").max(120, "Nome muito longo"),
  email: z.email("E-mail inválido").max(180),
  company: z.string().max(160).optional().default(""),
  projectType: z.enum(["web", "mobile", "ia", "reforco", "outro"], {
    message: "Selecione uma opção",
  }),
  message: z.string().min(10, "Mensagem muito curta (mín. 10 caracteres)").max(4000, "Mensagem muito longa"),
  website: z.string().max(0).optional().default(""), // honeypot — must be empty
  elapsedMs: z.number().int().nonnegative().optional().default(0),
});

const MIN_FILL_TIME_MS = 2_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "falecom@firmino.dev";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "firmino.dev <onboarding@resend.dev>";

const rateLimitBucket = new Map<string, number[]>();

function clientId(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "anon";
}

function rateLimited(id: string): boolean {
  const now = Date.now();
  const hits = (rateLimitBucket.get(id) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (hits.length >= RATE_LIMIT_MAX) {
    rateLimitBucket.set(id, hits);
    return true;
  }
  hits.push(now);
  rateLimitBucket.set(id, hits);
  return false;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return errorResponse("Payload inválido", 400);
  }

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fields[key]) fields[key] = issue.message;
    }
    return Response.json(
      { success: false, error: "Verifique os campos do formulário.", fields },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Anti-spam — silent drop (honeypot or filled too fast)
  if (data.website.length > 0 || data.elapsedMs < MIN_FILL_TIME_MS) {
    return jsonResponse({ received: true }, 201);
  }

  if (rateLimited(clientId(request))) {
    return errorResponse("Muitas tentativas. Tente novamente em alguns minutos.", 429);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Contact] RESEND_API_KEY ausente — registrando em log apenas.");
    console.log("[Contact]", data);
    return jsonResponse({ received: true, delivered: false }, 201);
  }

  const resend = new Resend(apiKey);
  const projectTypeLabel = PROJECT_TYPE_LABELS[data.projectType] ?? data.projectType;
  const subject = `[firmino.dev] Novo contato — ${data.name} · ${projectTypeLabel}`;
  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin: 0 0 16px; font-size: 18px;">Novo contato pelo site</h2>
      <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>E-mail:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
      ${data.company ? `<p><strong>Empresa:</strong> ${escapeHtml(data.company)}</p>` : ""}
      <p><strong>Tipo de projeto:</strong> ${escapeHtml(projectTypeLabel)}</p>
      <p style="margin-top: 16px;"><strong>Mensagem:</strong></p>
      <p style="white-space: pre-wrap; background: #f6f7fb; padding: 12px 14px; border-radius: 8px; border: 1px solid #e5e7eb;">${escapeHtml(data.message)}</p>
    </div>
  `;
  const text = [
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
    data.company ? `Empresa: ${data.company}` : null,
    `Tipo de projeto: ${projectTypeLabel}`,
    "",
    "Mensagem:",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("[Contact] Resend error", error);
      return errorResponse("Falha ao enviar a mensagem. Tente novamente em instantes.", 502);
    }

    return jsonResponse({ received: true, delivered: true }, 201);
  } catch (err) {
    console.error("[Contact] Unexpected error", err);
    return errorResponse("Erro inesperado ao enviar a mensagem.", 500);
  }
}
