"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { trackEvent, type EventParams } from "@/lib/analytics";

interface TrackedLinkProps {
  href: string;
  event: string;
  eventParams?: EventParams;
  className?: string;
  children: ReactNode;
  /** Roda depois do evento (ex.: fechar o menu mobile). */
  onClick?: () => void;
}

/** Internal <Link> that emits a GA event on click (for CTA conversion tracking). */
export function TrackedLink({ href, event, eventParams, className, children, onClick }: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        trackEvent(event, eventParams);
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}
