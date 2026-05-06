import Image from "next/image";
import Link from "next/link";
import { Reveal, Button, Tag, SectionLabel } from "@/components/ui";
import { PROJECTS, PROJECT_TYPE_LABELS, STATS } from "@/data/portfolio";

const TEASER_COUNT = 3;

export function Cases() {
  const teaser = PROJECTS.filter((p) => p.featured).slice(0, TEASER_COUNT);

  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 items-start">
          <Reveal>
            <div className="lg:sticky lg:top-[120px]">
              <SectionLabel>Projetos em destaque</SectionLabel>
              <h2 className="font-serif section-heading !leading-[1.12] mb-5">
                Trabalhos que entregam<br />
                <span className="text-accent-light italic">resultado</span>
              </h2>
              <p className="text-[15px] text-text-dim leading-[1.75] mb-6 max-w-[380px]">
                De plataformas corporativas a apps mobile e produtos com IA Generativa — uma seleção dos projetos que construímos.
              </p>

              <div className="grid grid-cols-2 gap-2.5 mb-7">
                {STATS.map((s, i) => (
                  <div key={i} className="stat-box">
                    <div className="font-serif text-2xl text-white">{s.value}</div>
                    <div className="text-[11px] text-text-dim">{s.label}</div>
                  </div>
                ))}
              </div>

              <Link href="/projetos">
                <Button variant="ghost">Ver todos os projetos →</Button>
              </Link>
            </div>
          </Reveal>

          <div className="flex flex-col gap-[18px]">
            {teaser.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link
                  href={`/projetos/${p.slug}`}
                  className="gc case-card p-0 cursor-pointer relative overflow-hidden block"
                >
                  <div className="case-glow-line" />
                  <div className="px-5 sm:px-7 pt-6">
                    <div className="flex justify-between items-start mb-1 gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        {p.logo && (
                          <div className="project-brand">
                            <Image src={p.logo} alt={p.client} width={44} height={44} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Tag accent className="!text-[10px]">
                              {PROJECT_TYPE_LABELS[p.type]}
                            </Tag>
                            <span className="text-[11px] text-text-muted">{p.year}</span>
                          </div>
                          <h4 className="text-[17px] sm:text-[19px] font-bold text-white mb-1 tracking-tight">
                            {p.title}
                          </h4>
                          <p className="text-[13px] text-text-dim">
                            {p.client} · {p.role}
                          </p>
                        </div>
                      </div>
                      <span className="case-arrow shrink-0">↗</span>
                    </div>
                    <p className="text-[13px] text-text-subtle leading-[1.6] mt-2 mb-3">
                      {p.summary}
                    </p>
                  </div>

                  <div className="px-5 sm:px-7 pb-4 flex flex-wrap gap-3">
                    {p.metrics.map((m, j) => (
                      <div key={j} className="metric-box flex-1 min-w-[100px]">
                        <div className="font-serif text-[22px] sm:text-[26px] font-medium text-white tracking-tight">
                          {m.value}
                        </div>
                        <div className="text-[11px] text-text-dim mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="px-5 sm:px-7 pt-3 pb-6 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 5).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
