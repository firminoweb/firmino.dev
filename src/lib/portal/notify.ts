import { Resend } from "resend";

/* ════════════════════════════════════════════
   E-mails da área do cliente (Resend).
   Sem RESEND_API_KEY (dev): só registra no log,
   inclusive o link de acesso, para testar.
   Falha de e-mail nunca derruba a ação.
   ════════════════════════════════════════════ */

const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "firmino.dev <onboarding@resend.dev>";
const TEAM_EMAIL = process.env.CONTACT_TO_EMAIL || "falecom@firmino.dev";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function send(to: string | string[], subject: string, lines: string[], action?: { label: string; url: string }) {
  const recipients = (Array.isArray(to) ? to : [to]).filter(Boolean);
  if (!recipients.length) return;
  const text = [...lines, ...(action ? ["", `${action.label}: ${action.url}`] : [])].join("\n");
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[Portal] e-mail (sem RESEND_API_KEY) para ${recipients.join(", ")}: ${subject}\n${text}`);
    return;
  }
  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; line-height: 1.6; color: #111; max-width: 520px;">
      <p style="font-size: 13px; color: #555; margin: 0 0 16px;">firmino.dev · Área do cliente</p>
      ${lines.map((l) => (l ? `<p style="margin: 0 0 12px;">${escapeHtml(l)}</p>` : "")).join("")}
      ${
        action
          ? `<p style="margin: 24px 0;"><a href="${escapeHtml(action.url)}" style="background: #2f4fd9; color: #fff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600;">${escapeHtml(action.label)}</a></p>`
          : ""
      }
    </div>`;
  try {
    const { error } = await new Resend(apiKey).emails.send({ from: FROM_EMAIL, to: recipients, subject, html, text });
    if (error) console.error("[Portal] Resend error", error);
  } catch (err) {
    console.error("[Portal] e-mail falhou", err);
  }
}

export function sendLoginLink(to: string, name: string, url: string) {
  return send(
    to,
    "Seu link de acesso à área do cliente firmino.dev",
    [`Olá, ${name}!`, "Use o botão abaixo para entrar na área do cliente. O link vale por 15 minutos e só pode ser usado uma vez.", "Se você não pediu este acesso, é só ignorar este e-mail."],
    { label: "Entrar na área do cliente", url },
  );
}

export function notifyTeamTicket(opts: { clientName: string; projectName: string; title: string; body: string; url: string; isNew: boolean }) {
  return send(
    TEAM_EMAIL,
    `[Área do cliente] ${opts.isNew ? "Novo chamado" : "Nova mensagem"}: ${opts.title} · ${opts.clientName}`,
    [`${opts.clientName} · ${opts.projectName}`, opts.title, opts.body],
    { label: "Abrir o chamado", url: opts.url },
  );
}

export function notifyClient(to: string[], subject: string, lines: string[], url: string) {
  return send(to, subject, lines, { label: "Ver na área do cliente", url });
}
