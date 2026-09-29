import clsx from "clsx";

/** Mesmo visual dos campos do formulário de contato. */
export const fieldClass = clsx(
  "w-full rounded-[10px] bg-surface-dim border border-border-input px-4 py-2.5",
  "text-[14px] text-text-light placeholder:text-text-darker",
  "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors",
);

export function Label({ text, children, hint }: { text: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12px] uppercase tracking-[1.2px] font-semibold text-text-dim">{text}</span>
      {children}
      {hint && <span className="text-[12px] text-text-muted">{hint}</span>}
    </label>
  );
}

export function Notice({ tone, children }: { tone: "success" | "error"; children: React.ReactNode }) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={clsx(
        "rounded-[10px] px-4 py-3 text-[13.5px] leading-[1.6] border",
        tone === "success" ? "bg-success/10 border-success/30 text-success" : "bg-red-500/10 border-red-500/30 text-red-500",
      )}
    >
      {children}
    </div>
  );
}
