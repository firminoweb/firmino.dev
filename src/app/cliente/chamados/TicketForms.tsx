"use client";

import { useActionState } from "react";
import { fieldClass, Label, Notice } from "@/components/portal/form";
import { SubmitButton } from "@/components/portal/SubmitButton";
import { openTicketAction, replyTicketAction, type TicketFormState } from "./actions";

export function NewTicketForm({ projectId }: { projectId: string }) {
  const [state, action] = useActionState<TicketFormState, FormData>(openTicketAction.bind(null, projectId), {});
  return (
    <details className="gc p-5">
      <summary className="cursor-pointer text-[14.5px] font-semibold text-accent-light">+ Abrir um chamado</summary>
      <form action={action} className="flex flex-col gap-4 mt-4">
        <Label text="Assunto">
          <input name="title" required maxLength={160} className={fieldClass} placeholder="Ex.: ajuste na tela de cadastro" />
        </Label>
        <Label text="O que você precisa" hint="Descreva o pedido ou o problema. Se for um erro, conte o que você fez e o que apareceu na tela.">
          <textarea name="body" required rows={5} maxLength={5000} className={fieldClass} />
        </Label>
        {state.error && <Notice tone="error">{state.error}</Notice>}
        <SubmitButton pendingText="Enviando...">Abrir chamado →</SubmitButton>
      </form>
    </details>
  );
}

export function ReplyForm({ ticketId }: { ticketId: string }) {
  const [state, action] = useActionState<TicketFormState, FormData>(replyTicketAction.bind(null, ticketId), {});
  return (
    <form action={action} className="flex flex-col gap-3">
      <Label text="Responder">
        <textarea name="body" required rows={4} maxLength={5000} className={fieldClass} />
      </Label>
      {state.error && <Notice tone="error">{state.error}</Notice>}
      <SubmitButton pendingText="Enviando...">Enviar mensagem →</SubmitButton>
    </form>
  );
}
