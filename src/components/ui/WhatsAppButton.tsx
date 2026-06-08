"use client";

import type { ReactNode } from "react";
import clsx from "clsx";
import { whatsappLink } from "@/data/portfolio";
import { trackEvent } from "@/lib/analytics";

interface WhatsAppButtonProps {
  /** Optional custom pre-filled message. */
  message?: string;
  /** Where the click came from — recorded on the lead event. */
  source?: string;
  className?: string;
  children: ReactNode;
}

/**
 * WhatsApp deep-link that fires a `generate_lead` event on click.
 * Renders a plain anchor so it still works without JS (tracking is the
 * only thing that needs the client; the link itself is server-safe).
 */
export function WhatsAppButton({
  message,
  source = "site",
  className,
  children,
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("generate_lead", { method: "whatsapp", source })}
      className={clsx(className)}
    >
      {children}
    </a>
  );
}
