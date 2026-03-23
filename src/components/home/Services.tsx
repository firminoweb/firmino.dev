"use client";

import { Reveal, SectionLabel } from "@/components/ui";
import { SERVICES } from "@/data/portfolio";

export function Services() {
  return (
    <section id="serviços" className="section-padding">
      <div className="content-container">
        <Reveal>
          <div className="text-center mb-15">
            <SectionLabel center>Serviços</SectionLabel>
            <h2 className="font-serif section-heading">
              Potencialize seu negócio com<br />
              <span className="text-accent-light italic">tecnologia de ponta</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[18px]">
          {SERVICES.map((s, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="gc py-8 px-7 relative overflow-hidden cursor-default">
                <div className="service-icon">{s.icon}</div>
                <h3 className="text-[16.5px] font-bold text-text-light mb-2.5 tracking-tight">{s.title}</h3>
                <p className="text-[13.5px] text-text-dim leading-[1.7]">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
