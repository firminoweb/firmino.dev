import type { ReactNode } from "react";
import { ObfuscatedContactClient } from "./ObfuscatedContactClient";

interface ObfuscatedContactProps {
  /** Plain value: e.g. "falecom@firmino.dev" or "(11) 97083-6907". */
  value: string;
  kind: "email" | "phone";
  className?: string;
  /** Optional prefix (icon, label) rendered before the value in both states. */
  prefix?: ReactNode;
}

/**
 * Server wrapper that encodes the contact value before sending it to the
 * Client Component. This keeps the raw e-mail/phone out of:
 *   - the static HTML
 *   - the RSC payload Next.js inlines into the page
 *
 * The Client Component decodes it on render and only inserts a real
 * `mailto:`/`tel:` link after hydration.
 */
export function ObfuscatedContact({ value, kind, className, prefix }: ObfuscatedContactProps) {
  return (
    <ObfuscatedContactClient
      encoded={encode(value)}
      kind={kind}
      className={className}
      prefix={prefix}
    />
  );
}

function encode(s: string): string {
  // base64 then reverse → not a valid base64 string anymore, breaks
  // scrapers that try to decode every token they see.
  return Buffer.from(s, "utf-8").toString("base64").split("").reverse().join("");
}
