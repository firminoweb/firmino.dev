"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Button, TrackedExternalLink, WhatsAppGlyph } from "@/components/ui";
import { whatsappLink } from "@/data/portfolio";
import { trackEvent } from "@/lib/analytics";
import { readAttribution } from "@/lib/attribution";
import {
  BUDGET_RANGES,
  PROJECT_TYPES,
  PROJECT_TYPE_VALUES,
  SOURCE_PATTERN,
  type COMPANY_SIZE_VALUES,
  type TIMELINE_VALUES,
} from "@/lib/contact-options";

type Status = "idle" | "sending" | "sent" | "error";
type ProjectType = (typeof PROJECT_TYPE_VALUES)[number];

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
}

interface ContactFormProps {
  /** Botão de origem. O `?origem=` da URL (links de contactHref) tem prioridade. */
  source?: string;
  /** Tipo já escolhido (pedido guiado). Sem ele, vale o `?tipo=` da URL. */
  projectType?: ProjectType;
  /** Respostas do pedido guiado, enviadas junto com o lead. */
  size?: (typeof COMPANY_SIZE_VALUES)[number];
  timeline?: (typeof TIMELINE_VALUES)[number];
  /** Versão curta (pedido guiado): sem empresa e com mensagem menor. */
  compact?: boolean;
}

export function ContactForm({ source, projectType, size, timeline, compact }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const formOpenedAt = useRef<number>(0);
  const urlSource = useRef<string | undefined>(undefined);

  // Stamp the open time after mount — keeps render pure (no Date.now in render)
  // and still feeds the server-side "filled too fast" bot trap.
  useEffect(() => {
    formOpenedAt.current = Date.now();
  }, []);

  // ?origem= e ?tipo= lidos no navegador: /contato continua estático
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const origem = params.get("origem");
    if (origem && SOURCE_PATTERN.test(origem)) urlSource.current = origem;
    const tipo = params.get("tipo");
    const select = formRef.current?.elements.namedItem("projectType");
    if (!projectType && select instanceof HTMLSelectElement && PROJECT_TYPE_VALUES.some((v) => v === tipo)) {
      select.value = tipo as string;
    }
  }, [projectType]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const leadSource = urlSource.current ?? source;
    const budget = String(formData.get("budget") ?? "");

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      projectType: projectType ?? String(formData.get("projectType") ?? ""),
      budget: budget || undefined,
      size,
      timeline,
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? ""),
      elapsedMs: Date.now() - formOpenedAt.current,
      channel: "form",
      source: leadSource,
      attribution: readAttribution(),
    };

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: {
        success: boolean;
        error?: string;
        fields?: FieldErrors;
      } = await res.json();

      if (!res.ok || !data.success) {
        if (data.fields) setErrors(data.fields);
        setServerError(data.error ?? "Não foi possível enviar. Tente novamente.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      trackEvent("generate_lead", {
        method: "form",
        project_type: payload.projectType,
        source: leadSource ?? "contato",
        budget: payload.budget,
      });
      form.reset();
      formOpenedAt.current = Date.now();
    } catch {
      setServerError("Erro de rede. Verifique sua conexão e tente novamente.");
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Honeypot — invisible to humans, attractive to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none">
        <label>
          Não preencha este campo
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nome" name="name" required error={errors.name} disabled={sending} />
        <Field
          label="E-mail"
          name="email"
          type="email"
          required
          error={errors.email}
          disabled={sending}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="WhatsApp (opcional)"
          name="phone"
          type="tel"
          placeholder="(11) 91234-5678"
          hint="Para responder mais rápido"
          error={errors.phone}
          disabled={sending}
        />
        {compact ? (
          <BudgetField disabled={sending} />
        ) : (
          <Field label="Empresa (opcional)" name="company" disabled={sending} />
        )}
      </div>

      {!compact && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {!projectType && (
            <Field
              label="O que você precisa"
              name="projectType"
              options={[...PROJECT_TYPES]}
              required
              error={errors.projectType}
              disabled={sending}
            />
          )}
          <BudgetField disabled={sending} />
        </div>
      )}

      <Field
        label="Mensagem"
        name="message"
        textarea
        rows={compact ? 4 : 6}
        placeholder="Ex.: quero um sistema para agendar os alunos e cobrar a mensalidade por Pix."
        required
        error={errors.message}
        disabled={sending}
      />

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
        <Button type="submit" disabled={sending}>
          {sending ? "Enviando..." : "Enviar mensagem →"}
        </Button>
        <p className="text-[12px] text-text-dark leading-[1.6]">
          Respondemos em até 24h úteis. Seus dados são usados só para responder ao seu
          contato.{" "}
          <Link
            href="/politica-de-privacidade"
            className="underline underline-offset-2 hover:text-text-muted transition-colors"
          >
            Política de Privacidade
          </Link>
          .
        </p>
      </div>

      {status === "sent" && (
        <FormFeedback variant="success">
          <p>Mensagem enviada. Em breve entraremos em contato.</p>
          {/* cta_click, não generate_lead: o lead já foi contado no envio */}
          <TrackedExternalLink
            href={whatsappLink("Olá! Acabei de enviar o formulário do site da firmino.dev e quero adiantar a conversa.")}
            event="cta_click"
            eventParams={{ location: "form_sucesso", label: "whatsapp" }}
            className="inline-flex items-center gap-2 mt-2 font-semibold underline underline-offset-2"
          >
            <WhatsAppGlyph className="w-4 h-4" />
            Quer adiantar? Chame no WhatsApp
          </TrackedExternalLink>
        </FormFeedback>
      )}

      {status === "error" && serverError && (
        <FormFeedback variant="error">{serverError}</FormFeedback>
      )}
    </form>
  );
}

function BudgetField({ disabled }: { disabled?: boolean }) {
  return (
    <Field
      label="Quanto você pensa em investir? (opcional)"
      name="budget"
      options={[...BUDGET_RANGES]}
      disabled={disabled}
    />
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  options?: { value: string; label: string }[];
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  rows = 6,
  options,
  placeholder,
  hint,
  error,
  disabled,
}: FieldProps) {
  const baseClass = clsx(
    "w-full rounded-[10px] bg-surface-dim border border-border-input px-4 py-3",
    "text-[14px] text-text-light placeholder:text-text-darker",
    "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40",
    "transition-colors",
    error && "border-red-500/60 focus:border-red-500 focus:ring-red-500/30",
    disabled && "opacity-60 cursor-not-allowed",
  );

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12px] uppercase tracking-[1.5px] font-semibold text-text-dim">
        {label}
        {required && <span className="text-accent-light"> *</span>}
      </span>
      {options ? (
        <select
          name={name}
          required={required}
          disabled={disabled}
          defaultValue=""
          className={clsx(baseClass, "form-select appearance-none cursor-pointer")}
        >
          {/* Campo opcional pode voltar para "Selecione..." */}
          <option value="" disabled={required}>
            Selecione...
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          name={name}
          required={required}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(baseClass, "resize-y min-h-[110px] leading-[1.65]")}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          inputMode={type === "tel" ? "tel" : undefined}
          disabled={disabled}
          autoComplete={autoCompleteFor(name)}
          className={baseClass}
        />
      )}
      {error ? (
        <span className="text-[12px] text-red-400">{error}</span>
      ) : (
        hint && <span className="text-[11.5px] text-text-darker">{hint}</span>
      )}
    </label>
  );
}

function FormFeedback({
  variant,
  children,
}: {
  variant: "success" | "error";
  children: React.ReactNode;
}) {
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={clsx(
        "rounded-[10px] px-4 py-3 text-[13.5px] leading-[1.6] border",
        variant === "success"
          ? "bg-success/10 border-success/30 text-success"
          : "bg-red-500/10 border-red-500/30 text-red-500",
      )}
    >
      {children}
    </div>
  );
}

function autoCompleteFor(name: string): string {
  switch (name) {
    case "name":
      return "name";
    case "email":
      return "email";
    case "phone":
      return "tel";
    case "company":
      return "organization";
    default:
      return "off";
  }
}
