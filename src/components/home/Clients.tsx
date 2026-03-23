"use client";

import { Reveal } from "@/components/ui";
import { CLIENTS } from "@/data/portfolio";

export function Clients() {
  return (
    <Reveal>
      <section className="section-padding-sm">
        <div className="content-container">
          <p className="text-center text-xs text-text-dark tracking-[2px] uppercase mb-7 font-medium">
            Empresas que confiam no meu trabalho
          </p>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-9 items-center py-7 border-y border-border-subtle">
            {CLIENTS.map((c, i) => (
              <span key={i} className="client-name !text-[11px] sm:!text-[14px]">{c}</span>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
