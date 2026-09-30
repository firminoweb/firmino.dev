"use client";

import { useState } from "react";
import clsx from "clsx";
import { ContactForm } from "./ContactForm";
import { trackEvent } from "@/lib/analytics";
import {
  COMPANY_SIZES,
  PROJECT_TYPES,
  TIMELINES,
  type COMPANY_SIZE_VALUES,
  type PROJECT_TYPE_VALUES,
  type TIMELINE_VALUES,
} from "@/lib/contact-options";

/* ════════════════════════════════════════════
   Pedido guiado · firmino.dev
   Três perguntas de clique (o que precisa,
   porte, prazo) e depois o formulário curto,
   que envia as respostas junto com o lead.
   Não mostra preço de propósito: a estimativa
   é feita na conversa.
   ════════════════════════════════════════════ */

interface Answers {
  projectType?: (typeof PROJECT_TYPE_VALUES)[number];
  size?: (typeof COMPANY_SIZE_VALUES)[number];
  timeline?: (typeof TIMELINE_VALUES)[number];
}

const STEPS = [
  { key: "projectType", title: "O que você precisa?", options: PROJECT_TYPES },
  { key: "size", title: "Qual o tamanho da sua operação?", options: COMPANY_SIZES },
  { key: "timeline", title: "Para quando?", options: TIMELINES },
] as const;

interface LeadWizardProps {
  /** Onde o pedido guiado está (GA e e-mail do lead). */
  source: string;
}

export function LeadWizard({ source }: LeadWizardProps) {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);

  function choose(key: keyof Answers, value: string) {
    if (step === 0 && !answers.projectType) {
      trackEvent("cta_click", { location: source, label: "pedido_guiado" });
    }
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  }

  const done = step >= STEPS.length;
  const current = STEPS[Math.min(step, STEPS.length - 1)];

  return (
    <div>
      <ol className="flex items-center gap-2 mb-6" aria-label="Etapas">
        {[...STEPS, { key: "contato" }].map((s, i) => (
          <li
            key={s.key}
            aria-current={i === step ? "step" : undefined}
            className={clsx(
              "h-1.5 flex-1 rounded-full transition-colors",
              i <= step ? "bg-accent" : "bg-border-card",
            )}
          />
        ))}
      </ol>

      {!done ? (
        <fieldset>
          <legend className="text-[12px] uppercase tracking-[1.5px] font-semibold text-text-dim mb-1">
            Passo {step + 1} de {STEPS.length + 1}
          </legend>
          <p className="font-serif text-[22px] sm:text-[26px] text-brand leading-[1.2] mb-5">{current.title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => choose(current.key, o.value)}
                className={clsx(
                  "text-left rounded-[10px] border px-4 py-3.5 text-[14.5px] font-medium transition-colors",
                  "bg-surface-dim text-text-light hover:border-accent hover:text-brand",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                  answers[current.key] === o.value ? "border-accent" : "border-border-input",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="mt-5 text-[13px] text-text-dim hover:text-accent-light transition-colors"
            >
              ← Voltar
            </button>
          )}
        </fieldset>
      ) : (
        <div>
          <p className="text-[12px] uppercase tracking-[1.5px] font-semibold text-text-dim mb-1">
            Passo {STEPS.length + 1} de {STEPS.length + 1}
          </p>
          <p className="font-serif text-[22px] sm:text-[26px] text-brand leading-[1.2] mb-3">
            Quase lá: como falamos com você?
          </p>
          <p className="text-[13.5px] text-text-dim leading-[1.7] mb-5">
            {STEPS.map((s) => s.options.find((o) => o.value === answers[s.key])?.label)
              .filter(Boolean)
              .join(" · ")}{" "}
            <button
              type="button"
              onClick={() => setStep(0)}
              className="underline underline-offset-2 hover:text-accent-light transition-colors"
            >
              Alterar
            </button>
          </p>
          <ContactForm
            compact
            source={source}
            projectType={answers.projectType}
            size={answers.size}
            timeline={answers.timeline}
          />
        </div>
      )}
    </div>
  );
}
