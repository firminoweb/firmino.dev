import Image from "next/image";
import { Reveal, SectionLabel, Button } from "@/components/ui";
import { TEAM_AREAS } from "@/data/empresa";
import { PERSON } from "@/data/curriculo";

/**
 * Quem faz o projeto: estrutura por área e uma credencial curta do fundador.
 * Substitui os antigos "Quem está por trás" e "Rede de parceiros". Números e
 * logos da carreira do João ficam só na /joao, onde o contexto de emprego é
 * explícito.
 */
export function QuemFaz() {
  return (
    <section className="section-padding">
      <div className="content-container max-w-[1000px]">
        <Reveal>
          <div className="text-center mb-10">
            <SectionLabel center>Quem faz</SectionLabel>
            <h2 className="font-serif section-heading !leading-[1.14]">
              Quem cuida do <span className="text-accent-light italic">seu projeto</span>
            </h2>
            <p className="text-[15px] text-text-dim leading-[1.8] max-w-[560px] mx-auto mt-5">
              Cada projeto recebe as áreas que ele pede, com profissionais e estúdios parceiros
              pelo Brasil. Você não paga por estrutura que o seu caso não precisa.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEAM_AREAS.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.06} className="h-full">
              <div className="gc py-7 px-6 h-full flex flex-col">
                <div className="service-icon">{a.icon}</div>
                <h3 className="text-[16px] font-bold text-text-light mb-2 tracking-tight">
                  {a.title}
                </h3>
                <p className="text-[13.5px] text-text-dim leading-[1.7] flex-1">{a.desc}</p>
                <p className="text-[11.5px] text-accent-light font-semibold mt-4">{a.entersWhen}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="gc mt-4 py-6 px-6 sm:px-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <Image
              src={PERSON.photo}
              alt={`Foto de ${PERSON.name}`}
              width={400}
              height={400}
              className="w-[64px] h-[64px] rounded-full object-cover border border-border-subtle shrink-0"
            />
            <p className="text-[14px] text-text-dim leading-[1.7] flex-1">
              <strong className="text-text-light">
                {PERSON.shortName}, {PERSON.founderTitle.toLowerCase()}.
              </strong>{" "}
              Mais de 16 anos construindo produtos de alta escala no Itaú, no Boticário e na TOTVS
              antes de fundar a empresa.
            </p>
            <Button href="/sobre" variant="ghost" className="shrink-0">
              Conheça a firmino.dev →
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
