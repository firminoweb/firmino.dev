"use client";

import { useActionState } from "react";
import { fieldClass, Label, Notice } from "@/components/portal/form";
import { SubmitButton } from "@/components/portal/SubmitButton";
import { requestLinkAction } from "../actions";

export function LoginForm() {
  const [state, action] = useActionState(requestLinkAction, { sent: false });

  if (state.sent) {
    return (
      <Notice tone="success">
        Se o e-mail estiver cadastrado, você vai receber um link de acesso em instantes. Ele vale por 15 minutos. Confira também a caixa de spam.
      </Notice>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <Label text="Seu e-mail">
        <input name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="voce@empresa.com.br" />
      </Label>
      <SubmitButton pendingText="Enviando...">Receber link de acesso →</SubmitButton>
    </form>
  );
}
