"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "sending" | "sent" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const formOpenedAt = useRef<number>(0);

  // Stamp the open time after mount — keeps render pure (no Date.now in render)
  // and still feeds the server-side "filled too fast" bot trap.
  useEffect(() => {
    formOpenedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? ""),
      elapsedMs: Date.now() - formOpenedAt.current,
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
      trackEvent("generate_lead", { method: "form" });
      form.reset();
      formOpenedAt.current = Date.now();
    } catch {
      setServerError("Erro de rede. Verifique sua conexão e tente novamente.");
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
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

      <Field label="Empresa (opcional)" name="company" disabled={sending} />

      <Field
        label="Mensagem"
        name="message"
        textarea
        required
        error={errors.message}
        disabled={sending}
      />

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
        <Button type="submit" disabled={sending}>
          {sending ? "Enviando..." : "Enviar mensagem →"}
        </Button>
        <p className="text-[12px] text-text-dark leading-[1.6]">
          Respondemos em até 24h úteis. Seus dados não são compartilhados.
        </p>
      </div>

      {status === "sent" && (
        <FormFeedback variant="success">
          Mensagem enviada. Em breve entraremos em contato.
        </FormFeedback>
      )}

      {status === "error" && serverError && (
        <FormFeedback variant="error">{serverError}</FormFeedback>
      )}
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  error?: string;
  disabled?: boolean;
}

function Field({ label, name, type = "text", required, textarea, error, disabled }: FieldProps) {
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
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={6}
          disabled={disabled}
          className={clsx(baseClass, "resize-y min-h-[140px] leading-[1.65]")}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          disabled={disabled}
          autoComplete={autoCompleteFor(name)}
          className={baseClass}
        />
      )}
      {error && <span className="text-[12px] text-red-400">{error}</span>}
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
    case "company":
      return "organization";
    default:
      return "off";
  }
}
