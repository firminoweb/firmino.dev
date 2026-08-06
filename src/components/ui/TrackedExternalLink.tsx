"use client";

import type { ReactNode } from "react";
import { trackEvent, type EventParams } from "@/lib/analytics";

interface TrackedExternalLinkProps {
  href: string;
  event: string;
  eventParams?: EventParams;
  className?: string;
  children: ReactNode;
  /** Baixa o arquivo em vez de navegar (usado no PDF do CV). */
  download?: boolean;
}

/**
 * <a> externo com evento GA no clique. Complementa o TrackedLink, que usa
 * next/link e por isso não carrega target/rel/download — necessários para
 * perfis externos (LinkedIn, GitHub) e para assets estáticos como o CV.
 */
export function TrackedExternalLink({
  href,
  event,
  eventParams,
  className,
  children,
  download,
}: TrackedExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download={download}
      className={className}
      onClick={() => trackEvent(event, eventParams)}
    >
      {children}
    </a>
  );
}
