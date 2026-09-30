import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Resend simulada: guarda o e-mail em vez de enviar
const sent = vi.hoisted(() => [] as { subject: string; html: string; text: string }[]);
vi.mock("resend", () => ({
  Resend: class {
    emails = {
      send: async (email: { subject: string; html: string; text: string }) => {
        sent.push(email);
        return { error: null };
      },
    };
  },
}));

const { submitContact } = await import("./contact-service");

const lead = {
  name: "Maria Souza",
  email: "maria@exemplo.com.br",
  projectType: "ia",
  message: "Quero automatizar o atendimento no WhatsApp.",
  elapsedMs: 5_000,
  channel: "form",
};

describe("e-mail do lead", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "re_teste");
    sent.length = 0;
  });
  afterEach(() => vi.unstubAllEnvs());

  it("mostra WhatsApp, verba, porte, prazo e botão de origem", async () => {
    const r = await submitContact(
      {
        ...lead,
        phone: "(11) 91234-5678",
        budget: "10k-30k",
        size: "pequena",
        timeline: "urgente",
        source: "servico-automacoes-com-ia",
      },
      "ip-1",
    );
    expect(r.status).toBe(201);
    const [email] = sent;
    expect(email.subject).toBe("[firmino.dev] Novo contato: Maria Souza · IA e automação · R$ 10 mil a R$ 30 mil");
    expect(email.html).toContain('<a href="https://wa.me/5511912345678">(11) 91234-5678</a>');
    expect(email.text).toContain("Verba estimada: R$ 10 mil a R$ 30 mil");
    expect(email.text).toContain("Porte: Pequena empresa (até 20 pessoas)");
    expect(email.text).toContain("Prazo: O quanto antes");
    expect(email.text).toContain("Botão de origem: servico-automacoes-com-ia");
  });

  it("sem os campos opcionais, o e-mail fica como antes", async () => {
    await submitContact(lead, "ip-2");
    const [email] = sent;
    expect(email.subject).toBe("[firmino.dev] Novo contato: Maria Souza · IA e automação");
    expect(email.text).not.toContain("WhatsApp:");
    expect(email.text).not.toContain("Verba estimada");
    expect(email.text).not.toContain("Botão de origem");
  });

  it("\"ainda não sei\" aparece no corpo, mas não no assunto", async () => {
    await submitContact({ ...lead, budget: "nao-sei" }, "ip-3");
    const [email] = sent;
    expect(email.subject).not.toContain("não sei");
    expect(email.text).toContain("Verba estimada: Ainda não sei, quero uma estimativa");
  });
});
