import clsx from "clsx";

interface ClientWordmarkProps {
  name: string;
  className?: string;
}

/**
 * Tipografia de marca neutra para clientes sem logo bitmap disponível.
 * Mantém o mesmo visual dos chips com logo (fundo claro, altura coerente).
 */
export function ClientWordmark({ name, className }: ClientWordmarkProps) {
  return (
    <span className={clsx("client-wordmark", className)} aria-label={name}>
      {name}
    </span>
  );
}
