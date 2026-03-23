"use client";

import { Reveal, SectionLabel } from "@/components/ui";
import { CERTIFICATIONS, EDUCATION, LANGUAGES } from "@/data/portfolio";

export function Certifications() {
  return (
    <section id="certificações" className="section-padding">
      <div className="content-container">
        <Reveal>
          <div className="text-center mb-12">
            <SectionLabel center>Certificações & Formação</SectionLabel>
            <h2 className="font-serif section-heading">
              Aprendizado<br />
              <span className="text-accent-light italic">contínuo</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
          <Reveal>
            <div>
              <h3 className="sub-heading">Certificações</h3>
              <div className="flex flex-col gap-3">
                {CERTIFICATIONS.map((c, i) => (
                  <div key={i} className="gc py-5 px-6 flex items-center gap-4">
                    <div className="cert-icon">{c.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-text-main mb-0.5">{c.name}</div>
                      <div className="text-xs text-text-dim">{c.issuer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h3 className="sub-heading">Formação Acadêmica</h3>
              <div className="flex flex-col gap-3">
                {EDUCATION.map((e, i) => (
                  <div key={i} className="gc py-6 px-6 relative overflow-hidden">
                    <div className="glow-line-top-wide" />
                    <div className="text-[13px] text-accent-light font-semibold mb-1">{e.degree}</div>
                    <div className="text-base font-semibold text-text-light mb-1.5">{e.field}</div>
                    <div className="text-[13px] text-text-dim">{e.school}</div>
                    <div className="text-xs text-text-dark mt-1">{e.year}</div>
                  </div>
                ))}
              </div>

              <h3 className="sub-heading mt-8">Idiomas</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                {LANGUAGES.map((l, i) => (
                  <div key={i} className="lang-card">
                    <div className="text-sm font-semibold text-text-nav mb-1">{l.lang}</div>
                    <div className="text-[11px] text-text-dim mb-2">{l.level}</div>
                    <div className="lang-bar-track">
                      <div className="lang-bar-fill" style={{ width: `${l.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
