"use client";

import { Reveal, SectionLabel } from "@/components/ui";
import { KEY_ACHIEVEMENTS } from "@/data/portfolio";

export function KeyAchievements() {
  return (
    <section className="section-padding">
      <div className="content-container">
        <Reveal>
          <div className="text-center mb-12">
            <SectionLabel center>Resultados Comprovados</SectionLabel>
            <h2 className="font-serif section-heading">
              Impacto mensurável em<br />
              <span className="text-accent-light italic">cada entrega</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {KEY_ACHIEVEMENTS.map((a, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="gc py-9 px-6 text-center relative overflow-hidden">
                <div className="glow-line-top" />
                <div className="font-serif text-4xl lg:text-5xl font-normal text-white tracking-tight leading-none">{a.value}</div>
                <div className="text-sm text-accent-light font-semibold mt-2">{a.label}</div>
                <div className="text-xs text-text-dark mt-1">{a.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
