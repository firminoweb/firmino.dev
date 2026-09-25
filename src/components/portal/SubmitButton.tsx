"use client";

import clsx from "clsx";
import { useFormStatus } from "react-dom";

/** Botão de envio que desabilita e troca o texto enquanto a Server Action roda. */
export function SubmitButton({
  children,
  pendingText = "Salvando...",
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  pendingText?: string;
  variant?: "primary" | "ghost" | "danger";
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        variant === "primary" && "btn-primary",
        variant === "ghost" && "btn-ghost",
        variant === "danger" && "text-[13px] text-red-500 hover:text-red-600 font-medium",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        className,
      )}
    >
      {pending ? pendingText : children}
    </button>
  );
}
