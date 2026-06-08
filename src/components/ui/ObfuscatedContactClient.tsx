"use client";

import { useEffect, useState, type ReactNode } from "react";

type Kind = "email" | "phone";

interface ObfuscatedContactClientProps {
  /** base64-of-(reversed value) — see encode() in ObfuscatedContact.tsx */
  encoded: string;
  kind: Kind;
  className?: string;
  prefix?: ReactNode;
}

const ZWSP = "​";

export function ObfuscatedContactClient({
  encoded,
  kind,
  className,
  prefix,
}: ObfuscatedContactClientProps) {
  const value = decode(encoded);
  const [revealed, setRevealed] = useState(false);

  // Intentional hydration gate: SSR renders the scrambled span (keeps the
  // raw mailto:/tel: out of static HTML for scrapers); only after mount do
  // we swap in the real link. setState-in-effect is the correct pattern here.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRevealed(true);
  }, []);

  if (!revealed) {
    return (
      <span className={className} aria-label={kind === "email" ? "e-mail" : "telefone"}>
        {prefix}
        {scramble(value)}
      </span>
    );
  }

  const href =
    kind === "email"
      ? `mailto:${value}`
      : `tel:+55${value.replace(/\D/g, "")}`;

  return (
    <a className={className} href={href} rel="nofollow noopener">
      {prefix}
      {value}
    </a>
  );
}

function decode(encoded: string): string {
  const reversed = encoded.split("").reverse().join("");
  if (typeof window === "undefined") {
    return Buffer.from(reversed, "base64").toString("utf-8");
  }
  return atob(reversed);
}

function scramble(s: string): string {
  return s.split("").join(ZWSP);
}
