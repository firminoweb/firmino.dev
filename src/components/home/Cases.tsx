"use client";

import { useState } from "react";
import clsx from "clsx";
import { Reveal, Button, Tag, SectionLabel } from "@/components/ui";
import { CASES, EARLIER_ROLES, STATS } from "@/data/portfolio";

export function Cases() {
  const [expandedCase, setExpandedCase] = useState<number | null>(null);
  const [showAllRoles, setShowAllRoles] = useState(false);

  return (
    <section id="cases" className="section-padding">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 items-start">
          <Reveal>
            <div className="lg:sticky lg:top-[120px]">
              <SectionLabel>Cases & Experiência</SectionLabel>
              <h2 className="font-serif section-heading !leading-[1.12] mb-5">
                Resultados reais em<br />
                <span className="text-accent-light italic">empresas líderes</span>
              </h2>
              <p className="text-[15px] text-text-dim leading-[1.75] mb-4 max-w-[380px]">
                Da otimização de performance à liderança técnica de equipes full-stack, cada projeto gera impacto mensurável.
              </p>

              <div className="grid grid-cols-2 gap-2.5 mb-7">
                {STATS.map((s, i) => (
                  <div key={i} className="stat-box">
                    <div className="font-serif text-2xl text-white">{s.value}</div>
                    <div className="text-[11px] text-text-dim">{s.label}</div>
                  </div>
                ))}
              </div>

              <Button variant="ghost" onClick={() => setShowAllRoles(!showAllRoles)}>
                {showAllRoles ? "Ocultar anteriores ↑" : "Ver histórico completo →"}
              </Button>
            </div>
          </Reveal>

          <div className="flex flex-col gap-[18px]">
            {CASES.map((c, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  className="gc case-card p-0 cursor-pointer relative overflow-hidden"
                  onClick={() => setExpandedCase(expandedCase === i ? null : i)}
                >
                  <div className="case-glow-line" />
                  <div className="px-5 sm:px-7 pt-6">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="text-[17px] sm:text-[19px] font-bold text-white mb-1 tracking-tight">{c.company}</h4>
                        <p className="text-[13px] text-text-dim">{c.role}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Tag className="!text-[10.5px] !text-text-dim hidden sm:inline-block">{c.duration}</Tag>
                        <span className="case-arrow">↗</span>
                      </div>
                    </div>
                    <p className="text-[11.5px] text-text-dark mb-3">{c.period} · {c.location}</p>
                  </div>

                  <div className="px-5 sm:px-7 pb-4 flex flex-wrap gap-3">
                    {c.metrics.map((m, j) => (
                      <div key={j} className="metric-box flex-1 min-w-[100px]">
                        <div className="font-serif text-[22px] sm:text-[26px] font-medium text-white tracking-tight">{m.value}</div>
                        <div className="text-[11px] text-text-dim mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div
                    className={clsx(
                      "overflow-hidden transition-all duration-500 ease-[cubic-bezier(.25,.46,.45,.94)]",
                      expandedCase === i ? "max-h-[300px]" : "max-h-0",
                    )}
                  >
                    <div className="px-5 sm:px-7 pb-2 flex flex-col gap-1.5">
                      {c.bullets.map((b, j) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <div className="w-1 h-1 rounded-full bg-accent shrink-0 mt-[7px]" />
                          <span className="text-[13px] text-text-subtle leading-[1.5]">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-5 sm:px-7 pt-3 pb-6 flex flex-wrap gap-1.5">
                    {c.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                  </div>
                </div>
              </Reveal>
            ))}

            <div
              className={clsx(
                "overflow-hidden transition-all duration-600 ease-[cubic-bezier(.25,.46,.45,.94)] flex flex-col gap-2.5",
                showAllRoles ? "max-h-[1200px]" : "max-h-0",
              )}
            >
              <div className="pt-4 pb-2">
                <span className="text-xs text-text-dark tracking-[1.5px] uppercase font-medium">
                  Posições anteriores (2009–2018)
                </span>
              </div>
              {EARLIER_ROLES.map((r, i) => (
                <div key={i} className="earlier-role-card">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-0.5">
                    <span className="text-sm font-semibold text-text-nav">{r.company}</span>
                    <span className="text-[11px] text-text-dark">{r.period}</span>
                  </div>
                  <div className="text-xs text-text-dim">{r.role}</div>
                  {r.detail && <div className="text-xs text-text-dark mt-1">{r.detail}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
