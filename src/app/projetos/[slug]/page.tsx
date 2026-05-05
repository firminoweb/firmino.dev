import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar, Footer, Background } from "@/components/layout";
import { Tag, SectionLabel, Button } from "@/components/ui";
import { ProjectCover } from "@/components/projects/ProjectCover";
import {
  PROJECTS,
  PROJECT_TYPE_LABELS,
  getProjectBySlug,
} from "@/data/portfolio";

interface CaseDetailProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: CaseDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Projeto não encontrado — firmino.dev" };
  }

  return {
    title: `${project.title} — ${project.client} · firmino.dev`,
    description: project.summary,
  };
}

export default async function CaseDetailPage({ params }: CaseDetailProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const related = PROJECTS.filter(
    (p) => p.slug !== project.slug && (p.type === project.type || p.featured),
  ).slice(0, 2);

  return (
    <>
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <article>
          {/* Hero */}
          <section className="page-hero !min-h-[58vh] !pb-12">
            <div className="content-container w-full max-w-[920px]">
              <Link
                href="/projetos"
                className="text-[12.5px] text-text-dim hover:text-text-nav transition-colors mb-8 inline-block"
              >
                ← Voltar para projetos
              </Link>

              <div className="flex flex-wrap items-center gap-2 mb-5">
                <Tag accent>{PROJECT_TYPE_LABELS[project.type]}</Tag>
                <span className="text-[12px] text-text-dim">{project.year}</span>
                <span className="text-text-darker">·</span>
                <span className="text-[12px] text-text-dim">{project.location}</span>
              </div>

              <div className="flex items-center gap-4 mb-3">
                {project.logo && (
                  <div className="project-brand !w-[64px] !h-[64px]">
                    <Image src={project.logo} alt={project.client} width={64} height={64} />
                  </div>
                )}
                <SectionLabel>{project.client}</SectionLabel>
              </div>
              <h1 className="font-serif hero-heading !text-[clamp(34px,4.6vw,54px)] !leading-[1.08] mb-6">
                {project.title}
              </h1>
              <p className="text-base text-text-muted leading-[1.75] max-w-[680px] mb-8">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap gap-3.5 mt-8">
                  {project.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost">{l.label} ↗</Button>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Cover */}
          <section className="section-padding-sm !pt-0">
            <div className="content-container max-w-[920px]">
              <ProjectCover project={project} />
            </div>
          </section>

          {/* Metrics */}
          {project.metrics.length > 0 && (
            <section className="section-padding-sm">
              <div className="content-container max-w-[920px]">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="metric-box !text-left !px-5 !py-4">
                      <div className="font-serif text-[26px] sm:text-[30px] font-medium text-white tracking-tight">
                        {m.value}
                      </div>
                      <div className="text-[11px] text-text-dim mt-0.5">{m.label}</div>
                    </div>
                  ))}
                  <div className="metric-box !text-left !px-5 !py-4">
                    <div className="font-serif text-[26px] sm:text-[30px] font-medium text-white tracking-tight">
                      {project.duration}
                    </div>
                    <div className="text-[11px] text-text-dim mt-0.5">Duração</div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Narrative */}
          <section className="section-padding !pt-10">
            <div className="content-container max-w-[920px] flex flex-col gap-12">
              <NarrativeBlock label="Contexto" title="O cenário do cliente" paragraphs={project.context} />
              <NarrativeBlock label="Desafio" title="O problema a resolver" paragraphs={project.challenge} />
              <NarrativeBlock label="Solução" title="Como atacamos" paragraphs={project.solution} />
              <NarrativeBlock label="Resultado" title="O impacto entregue" paragraphs={project.outcome} />

              {project.highlights.length > 0 && (
                <div>
                  <SectionLabel>Entregas</SectionLabel>
                  <h2 className="font-serif section-heading !text-[clamp(24px,3.2vw,34px)] !leading-[1.18] mb-6">
                    O que foi <span className="text-accent-light italic">construído</span>
                  </h2>
                  <ul className="flex flex-col gap-2.5">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-[9px]" />
                        <span className="text-[14.5px] text-text-subtle leading-[1.65]">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Related */}
          {related.length > 0 && (
            <section className="section-padding !pt-4">
              <div className="content-container max-w-[920px]">
                <SectionLabel>Próximos projetos</SectionLabel>
                <h2 className="font-serif section-heading !text-[clamp(24px,3.2vw,34px)] !leading-[1.18] mb-6">
                  Continue <span className="text-accent-light italic">explorando</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/projetos/${r.slug}`}
                      className="gc case-card p-6 block relative overflow-hidden"
                    >
                      <div className="case-glow-line" />
                      <div className="flex items-center gap-2 mb-3">
                        <Tag accent className="!text-[10px]">
                          {PROJECT_TYPE_LABELS[r.type]}
                        </Tag>
                        <span className="text-[11px] text-text-dark">{r.year}</span>
                      </div>
                      <h3 className="text-[16px] font-bold text-white mb-1 tracking-tight">
                        {r.title}
                      </h3>
                      <p className="text-[12.5px] text-text-dim mb-3">{r.client}</p>
                      <p className="text-[13px] text-text-subtle leading-[1.6]">{r.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="section-padding !pt-4">
            <div className="content-container max-w-[920px]">
              <div className="gc py-10 px-6 sm:py-14 sm:px-12 text-center relative overflow-hidden">
                <div className="glow-line-top-cta" />
                <div className="cta-radial-overlay" />
                <div className="relative">
                  <h2 className="font-serif section-heading !text-[clamp(22px,3vw,34px)] !leading-[1.2] mb-4">
                    Tem um projeto parecido em mente?
                  </h2>
                  <p className="text-[14px] text-text-dim leading-[1.7] max-w-[480px] mx-auto mb-7">
                    Conte para gente o que você está construindo. Respondemos em até 24h úteis.
                  </p>
                  <Link href="/contato">
                    <Button>Fale com a gente →</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </article>

        <Footer />
      </div>
    </>
  );
}

function NarrativeBlock({
  label,
  title,
  paragraphs,
}: {
  label: string;
  title: string;
  paragraphs: string[];
}) {
  if (!paragraphs || paragraphs.length === 0) return null;
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <h2 className="font-serif section-heading !text-[clamp(24px,3.2vw,34px)] !leading-[1.18] mb-5">
        {title}
      </h2>
      <div className="flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[15px] text-text-muted leading-[1.8]">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
