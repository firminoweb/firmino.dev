import { describe, expect, it } from "vitest";
import { ContactSchema } from "./contact";
import { contactHref } from "./contact-options";

const base = {
  name: "Maria Souza",
  email: "maria@exemplo.com.br",
  projectType: "web",
  message: "Quero um sistema para agendar e cobrar os alunos.",
};

describe("ContactSchema: campos opcionais do lead", () => {
  it("aceita o pedido sem nenhum campo novo (API e MCP antigos continuam valendo)", () => {
    const r = ContactSchema.safeParse(base);
    expect(r.success).toBe(true);
    expect(r.data?.phone).toBe("");
    expect(r.data?.budget).toBeUndefined();
  });

  it("guarda só os dígitos do WhatsApp", () => {
    const r = ContactSchema.safeParse({ ...base, phone: "(11) 91234-5678" });
    expect(r.data?.phone).toBe("11912345678");
  });

  it("recusa WhatsApp curto demais, para a pessoa corrigir", () => {
    const r = ContactSchema.safeParse({ ...base, phone: "91234-5678" });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0].path).toEqual(["phone"]);
  });

  it("aceita verba, porte e prazo válidos", () => {
    const r = ContactSchema.safeParse({ ...base, budget: "10k-30k", size: "pequena", timeline: "urgente" });
    expect(r.data).toMatchObject({ budget: "10k-30k", size: "pequena", timeline: "urgente" });
  });

  it("valor desconhecido de verba, porte, prazo ou origem vira ausente, sem barrar o lead", () => {
    const r = ContactSchema.safeParse({
      ...base,
      budget: "1-milhao",
      size: "gigante",
      timeline: "ontem",
      source: "<script>",
    });
    expect(r.success).toBe(true);
    expect(r.data?.budget).toBeUndefined();
    expect(r.data?.size).toBeUndefined();
    expect(r.data?.timeline).toBeUndefined();
    expect(r.data?.source).toBeUndefined();
  });

  it("aceita o slug do botão de origem", () => {
    const r = ContactSchema.safeParse({ ...base, source: "servico-automacoes-com-ia" });
    expect(r.data?.source).toBe("servico-automacoes-com-ia");
  });
});

describe("contactHref", () => {
  it("monta o link do formulário com origem e tipo", () => {
    expect(contactHref("blog-quanto-custa", "mobile")).toBe("/contato?origem=blog-quanto-custa&tipo=mobile");
    expect(contactHref("navbar")).toBe("/contato?origem=navbar");
  });
});
