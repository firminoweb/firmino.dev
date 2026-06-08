import { Reveal, SectionLabel, Button } from "@/components/ui";
import { SERVICES } from "@/data/portfolio";

const TEASER_COUNT = 4;

export function Services() {
  const teaser = SERVICES.slice(0, TEASER_COUNT);

  return (
    <section className="section-padding">
      <div className="content-container">
        <Reveal>
          <div className="text-center mb-12">
            <SectionLabel center>Serviços</SectionLabel>
            <h2 className="font-serif section-heading">
              Como trabalhamos com <span className="text-accent-light italic">você</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[18px] items-stretch">
          {teaser.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07} className="h-full">
              <div className="gc py-8 px-7 relative overflow-hidden cursor-default h-full">
                <div className="service-icon">{s.icon}</div>
                <h3 className="text-[16.5px] font-bold text-text-light mb-2.5 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-[13.5px] text-text-dim leading-[1.7]">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button href="/servicos" variant="ghost">Ver todos os serviços →</Button>
        </div>
      </div>
    </section>
  );
}
