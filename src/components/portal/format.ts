/** "2026-10-10" ou ISO → "10 out. 2026" (sem deslocar o dia por fuso). */
export function formatDate(value: string | null | undefined): string {
  if (!value) return "Sem data";
  const d = value.length === 10 ? new Date(`${value}T12:00:00Z`) : new Date(value);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "America/Sao_Paulo" });
}

export function formatMoney(cents: number | null | undefined): string {
  if (cents == null) return "";
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatSize(bytes: number): string {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
