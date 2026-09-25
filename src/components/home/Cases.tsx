import { Reveal, Button, SectionLabel } from "@/components/ui";
import { CaseCard } from "@/components/projects/CaseCard";
import { CLIENT_PROJECTS, COMPANY_STATS } from "@/data/portfolio";

const TEASER_COUNT = 3;

export function Cases() {
  const teaser = CLIENT_PROJECTS.filter((p) => p.featured).slice(0, TEASER_COUNT);

  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 items-start">
          <Reveal>
            <div className="lg:sticky lg:top-[120px]">
              <SectionLabel>Cases</SectionLabel>
              <h2 className="font-serif section-heading !leading-[1.12] mb-5">
                Trabalhos que entregam{" "}<br />
                <span className="text-accent-light italic">resultado</span>
              </h2>
              <p className="text-[15px] text-text-dim leading-[1.75] mb-6 max-w-[380px]">
                De plataforma de pagamentos a app mobile e produto com IA: o que construímos para quem nos contratou.
              </p>

              <div className="grid grid-cols-2 gap-2.5 mb-7">
                {COMPANY_STATS.map((s, i) => (
                  <div key={i} className="stat-box">
                    <div className="font-serif text-2xl text-brand">{s.value}</div>
                    <div className="text-[11px] text-text-dim">{s.label}</div>
                  </div>
                ))}
              </div>

              <Button href="/projetos" variant="ghost">Ver todos os cases →</Button>
            </div>
          </Reveal>

          <div className="flex flex-col gap-[18px]">
            {teaser.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <CaseCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
