import Image from "next/image";
import Link from "next/link";
import { Reveal, SectionLabel, Button, ClientWordmark } from "@/components/ui";
import { FOUNDER_ACHIEVEMENTS, CLIENTS } from "@/data/portfolio";
import { PERSON } from "@/data/curriculo";

/**
 * Lastro da empresa, não entrega da empresa.
 *
 * Os números e as marcas aqui são de carreira do João, obtidos como
 * funcionário antes da firmino.dev existir. Ficam todos dentro deste bloco,
 * sob o rótulo de quem está por trás, justamente para não serem lidos como
 * resultado da companhia, que opera desde 2024.
 */
export function Founder() {
  return (
    <section className="section-padding">
      <div className="content-container max-w-[1000px]">
        <Reveal>
          <div className="text-center mb-10">
            <SectionLabel center>Quem está por trás</SectionLabel>
            <h2 className="font-serif section-heading !leading-[1.14]">
              A empresa é nova.<br />
              A <span className="text-accent-light italic">bagagem</span>, nem tanto.
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="gc py-9 px-6 sm:py-11 sm:px-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 mb-9">
              <Image
                src={PERSON.photo}
                alt={`Foto de ${PERSON.name}`}
                width={400}
                height={400}
                className="w-[104px] h-[104px] rounded-full object-cover border border-border-subtle shrink-0"
              />
              <div className="min-w-0">
                <h3 className="text-[19px] font-bold text-brand tracking-tight mb-1">
                  {PERSON.name}
                </h3>
                <p className="text-[13px] text-accent-light font-medium mb-3">
                  {PERSON.role} · {PERSON.headline}
                </p>
                <p className="text-[14px] text-text-dim leading-[1.75]">
                  Antes de fundar a firmino.dev, 16+ anos construindo produto de alta escala
                  dentro de Itaú, O Boticário, TOTVS, NTT Data, Walmart e UOL, como
                  desenvolvedor sênior e Tech Lead. É essa bagagem que sustenta o método que
                  aplicamos hoje nos projetos de cliente.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[11px] text-text-darker tracking-[1.5px] uppercase font-medium mb-4">
                Resultados obtidos na carreira do fundador
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {FOUNDER_ACHIEVEMENTS.map((a) => (
                  <div key={a.label} className="metric-box !text-left !px-5 !py-4">
                    <div className="font-serif text-[26px] sm:text-[30px] font-medium text-brand tracking-tight">
                      {a.value}
                    </div>
                    <div className="text-[11px] text-accent-light font-semibold mt-0.5">
                      {a.label}
                    </div>
                    <div className="text-[10.5px] text-text-darker mt-0.5 leading-[1.5]">
                      {a.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[11px] text-text-darker tracking-[1.5px] uppercase font-medium mb-4">
                Marcas em que o fundador trabalhou
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                {CLIENTS.map((c) => (
                  <div key={c.name} className="client-logo-chip" title={c.name}>
                    {c.logo ? (
                      <Image
                        src={c.logo}
                        alt={c.name}
                        width={120}
                        height={40}
                        className="client-logo-img"
                      />
                    ) : (
                      <ClientWordmark name={c.name} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Link href="/joao">
              <Button variant="ghost">Ver o perfil completo de João Firmino →</Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
