import clsx from "clsx";

const TONES = {
  neutral: "bg-surface-dim text-text-dim border-border-card",
  active: "bg-accent/10 text-accent-light border-accent/30",
  done: "bg-success/10 text-success border-success/30",
  warn: "bg-amber-500/10 text-amber-600 border-amber-500/30",
} as const;

export function StatusBadge({ tone, children }: { tone: keyof typeof TONES; children: React.ReactNode }) {
  return (
    <span className={clsx("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11.5px] font-semibold", TONES[tone])}>
      {children}
    </span>
  );
}
