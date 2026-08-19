import Image from "next/image";
import Link from "next/link";
import { Reveal, Tag } from "@/components/ui";
import { CLIENT_PROJECTS } from "@/data/portfolio";

/**
 * Vitrine comercial: só projeto de cliente da firmino.dev. O histórico de
 * carreira (Itaú, TOTVS, Boticário, NTT Data e os clientes de 2009 a 2018)
 * vive na /joao, onde o contexto de emprego é explícito.
 *
 * Sem filtro por tipo: com tudo sendo trabalho de cliente, as abas
 * Corporativo/Freelance/Pessoal/OSS não separavam mais nada. O que o card
 * mostra agora é o segmento, que é o que interessa a quem está comprando.
 */
export function ProjectsExplorer() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {CLIENT_PROJECTS.map((p, i) => (
        <Reveal key={p.slug} delay={i * 0.05}>
          <Link
            href={`/projetos/${p.slug}`}
            className="gc case-card p-6 block relative overflow-hidden h-full"
          >
            <div className="case-glow-line" />
            <div className="flex items-start gap-3 mb-3">
              {p.logo && (
                <div className="project-brand">
                  <Image src={p.logo} alt={p.client} width={44} height={44} />
                </div>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <Tag accent className="!text-[10px]">
                    {p.segment}
                  </Tag>
                  {p.year && <span className="text-[11px] text-text-dark">{p.year}</span>}
                </div>
                <h2 className="text-[18px] font-bold text-brand mb-1 tracking-tight">
                  {p.title}
                </h2>
                <p className="text-[13px] text-text-dim">
                  {p.client} · {p.role}
                </p>
              </div>
            </div>
            <p className="text-[13.5px] text-text-subtle leading-[1.65] mb-4">{p.summary}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.slice(0, 5).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
