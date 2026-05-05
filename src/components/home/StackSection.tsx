"use client";

import { useState } from "react";
import clsx from "clsx";
import { Reveal, SectionLabel } from "@/components/ui";
import { STACK, STACK_DEFAULT_TAB } from "@/data/portfolio";

export function StackSection() {
  const [activeStack, setActiveStack] = useState(STACK_DEFAULT_TAB);

  return (
    <section id="stack" className="section-padding">
      <div className="content-container">
        <Reveal>
          <div className="text-center mb-12">
            <SectionLabel center>Nossa Stack</SectionLabel>
            <h2 className="font-serif section-heading">
              Tecnologias que usamos para<br />
              <span className="text-accent-light italic">entregar resultados</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex justify-center gap-2 mb-9 flex-wrap">
            {Object.keys(STACK).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveStack(cat)}
                className={clsx(
                  "stack-tab",
                  activeStack === cat ? "stack-tab-active" : "stack-tab-inactive",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center items-center content-center gap-2.5 min-h-[60px]">
            {STACK[activeStack]?.map((t, i) => (
              <div
                key={t + activeStack}
                className="gc stack-pill py-3 px-5 sm:py-3.5 sm:px-[26px] text-[13px] sm:text-[14.5px] font-medium text-text-nav tracking-tight animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {t}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
