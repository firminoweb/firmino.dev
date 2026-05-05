import Image from "next/image";
import { Reveal, ClientWordmark } from "@/components/ui";
import { CLIENTS } from "@/data/portfolio";

export function Clients() {
  return (
    <Reveal>
      <section className="section-padding-sm">
        <div className="content-container">
          <p className="text-center text-xs text-text-dark tracking-[2px] uppercase mb-7 font-medium">
            Empresas que confiam na nossa expertise
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 items-center py-7 border-y border-border-subtle">
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
      </section>
    </Reveal>
  );
}
