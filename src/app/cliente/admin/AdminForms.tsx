"use client";

import { useActionState } from "react";
import { fieldClass, Label, Notice } from "@/components/portal/form";
import { SubmitButton } from "@/components/portal/SubmitButton";
import { STATUS_LABELS } from "@/lib/portal/types";
import { addDocumentAction, createUserAction, type AdminFormState } from "./actions";

export function CreateUserForm({ clientId }: { clientId: string }) {
  const [state, action] = useActionState<AdminFormState, FormData>(createUserAction.bind(null, clientId), {});
  return (
    <form action={action} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
      <Label text="Nome">
        <input name="name" required className={fieldClass} />
      </Label>
      <Label text="E-mail">
        <input name="email" type="email" required className={fieldClass} />
      </Label>
      <SubmitButton>Dar acesso</SubmitButton>
      {state.error && <div className="sm:col-span-3"><Notice tone="error">{state.error}</Notice></div>}
      {state.ok && <div className="sm:col-span-3"><Notice tone="success">{state.ok}</Notice></div>}
    </form>
  );
}

export function DocumentUploadForm({ clientId, projectId }: { clientId: string; projectId: string | null }) {
  const [state, action] = useActionState<AdminFormState, FormData>(addDocumentAction.bind(null, { clientId, projectId }), {});
  return (
    <form action={action} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Label text="Tipo">
        <select name="kind" className={fieldClass} defaultValue={projectId ? "nota_fiscal" : "contrato"}>
          {Object.entries(STATUS_LABELS.document).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Label>
      <Label text="Título">
        <input name="title" required className={fieldClass} placeholder="Ex.: NF outubro/2026" />
      </Label>
      <Label text="Data de referência">
        <input name="referenceDate" type="date" className={fieldClass} />
      </Label>
      <Label text="Valor (faturas)" hint="Ex.: 1.500,00. Deixe vazio se não for fatura.">
        <input name="amount" inputMode="decimal" className={fieldClass} />
      </Label>
      <Label text="Pagamento (faturas)">
        <select name="paid" className={fieldClass} defaultValue="">
          <option value="">Não se aplica</option>
          <option value="nao">Pendente</option>
          <option value="sim">Pago</option>
        </select>
      </Label>
      <Label text="Arquivo" hint="PDF, PNG ou JPG, até 4 MB.">
        <input name="file" type="file" required accept="application/pdf,image/png,image/jpeg" className={fieldClass} />
      </Label>
      <label className="flex items-center gap-2 text-[13px] text-text-dim sm:col-span-2">
        <input type="checkbox" name="notify" defaultChecked /> Avisar o cliente por e-mail
      </label>
      {state.error && <div className="sm:col-span-2"><Notice tone="error">{state.error}</Notice></div>}
      {state.ok && <div className="sm:col-span-2"><Notice tone="success">{state.ok}</Notice></div>}
      <div className="sm:col-span-2">
        <SubmitButton pendingText="Enviando...">Enviar documento</SubmitButton>
      </div>
    </form>
  );
}
