"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import clsx from "clsx";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);

  return (
    <div
      ref={ref}
      className={clsx("reveal-base", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
