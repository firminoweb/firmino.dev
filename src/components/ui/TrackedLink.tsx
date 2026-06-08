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
}

/** Internal <Link> that emits a GA event on click (for CTA conversion tracking). */
export function TrackedLink({ href, event, eventParams, className, children }: TrackedLinkProps) {
  return (
    <Link href={href} className={className} onClick={() => trackEvent(event, eventParams)}>
      {children}
    </Link>
  );
}
