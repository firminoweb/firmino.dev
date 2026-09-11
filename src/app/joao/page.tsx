import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer, Background } from "@/components/layout";
import {
  Reveal,
  SectionLabel,
  Button,
  Tag,
  JsonLd,
  TrackedLink,
  TrackedExternalLink,
} from "@/components/ui";
import {
  PERSON,
  PERSON_ID,
  PERSON_SUMMARY,
  PERSON_STATS,
  CAREER,
  EARLIER_ROLES,
  SKILL_GROUPS,
  EDUCATION,
  CERTIFICATIONS,
  LANGUAGES,
} from "@/data/curriculo";
import { CAREER_PROJECTS } from "@/data/portfolio";
import { breadcrumbJsonLd, absoluteUrl, SITE_URL, ORG_ID, OG_IMAGES } from "@/lib/seo";

const TITLE = "João Firmino · Fundador da firmino.dev";
const DESCRIPTION =
  "João Henrique Firmino, fundador da firmino.dev. 16+ anos de engenharia de software em Itaú, O Boticário, TOTVS, NTT Data, Walmart e UOL. React, Angular, Next.js, Node.js, React Native e IA aplicada.";

export const metadata: Metadata = {
  title: "João Firmino",
  description: DESCRIPTION,
  alternates: { canonical: "/joao" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/joao",
    type: "profile",
    images: OG_IMAGES,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: OG_IMAGES },
};

const PROFILE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON.name,
    alternateName: PERSON.shortName,
    url: `${SITE_URL}/joao`,
    image: absoluteUrl(PERSON.photo),
    jobTitle: PERSON.founderTitle,
    description: DESCRIPTION,
    // E-mail em claro só aqui, para o Google. O HTML visível não exibe o
    // e-mail pessoal: o contato comercial passa pelo /contato.
    email: PERSON.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    worksFor: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "firmino.dev",
      url: SITE_URL,
    },
    alumniOf: EDUCATION.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.school,
    })),
    knowsAbout: [
      "React",
      "Angular",
      "Next.js",
      "Node.js",
      "React Native",
      "TypeScript",
      "NestJS",
      "Micro-frontends",
      "Module Federation",
      "Design Systems",
      "Clean Architecture",
      "Generative AI",
      "LLM Applications",
      "AI-Driven Development",
    ],
    knowsLanguage: LANGUAGES.map((l) => l.name),
    sameAs: [PERSON.linkedin, PERSON.github],
  },
};

export default function JoaoPage() {
  return (
    <>
      <JsonLd data={PROFILE_JSON_LD} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "João Firmino", path: "/joao" },
        ])}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        {/* Hero */}
        <section className="page-hero !min-h-[52vh] !pb-8">
          <div className="content-container w-full max-w-[920px]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-7 sm:gap-9">
              <Image
                src={PERSON.photo}
                alt={`Foto de ${PERSON.name}`}
                width={400}
                height={400}
                priority
                className="w-[124px] h-[124px] sm:w-[164px] sm:h-[164px] rounded-full object-cover border border-border-subtle shrink-0"
              />
              <div className="min-w-0">
                <SectionLabel>{PERSON.headline}</SectionLabel>
                <h1 className="font-serif hero-heading !text-[clamp(34px,4.6vw,52px)] !leading-[1.06] !mb-3">
                  João Henrique <span className="text-accent-light italic">Firmino</span>
                </h1>
                <p className="text-[15px] text-text-muted leading-[1.7]">
                  {PERSON.founderTitle} · {PERSON.location}
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-6">
                  <TrackedLink
                    href="/contato"
                    event="cta_click"
                    eventParams={{ location: "joao_hero", label: "contato" }}
                    className="btn-primary inline-flex items-center justify-center"
                  >
                    Falar com a firmino.dev →
                  </TrackedLink>
                  <TrackedExternalLink
                    href={PERSON.linkedin}
                    event="cta_click"
                    eventParams={{ location: "joao_hero", label: "linkedin" }}
                    className="text-[13.5px] text-text-dim hover:text-accent-light transition-colors"
                  >
                    LinkedIn ↗
                  </TrackedExternalLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resumo */}
        <section className="section-padding-sm">
          <div className="content-container max-w-[920px]">
            <Reveal>
              <div className="gc py-8 px-6 sm:py-10 sm:px-9 flex flex-col gap-4">
                {PERSON_SUMMARY.map((p, i) => (
                  <p key={i} className="text-[15px] text-text-muted leading-[1.85]">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Números */}
        <section className="section-padding-sm !pt-2">
          <div className="content-container max-w-[920px]">
            <Reveal>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PERSON_STATS.map((s) => (
                  <div key={s.label} className="metric-box !text-left !px-5 !py-4">
                    <div className="font-serif text-[26px] sm:text-[30px] font-medium text-brand tracking-tight">
                      {s.value}
                    </div>
                    <div className="text-[11px] text-text-dim mt-0.5">{s.label}</div>
                    <div className="text-[10.5px] text-text-darker mt-0.5">{s.detail}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <div className="content-container max-w-[920px] flex flex-col gap-14 section-padding !pt-10">
          {/* Experiência */}
          <Reveal>
            <div>
              <SectionLabel>Experiência</SectionLabel>
              <h2 className="font-serif section-heading !text-[clamp(26px,3.4vw,38px)] !leading-[1.18] mb-7">
                Onde eu <span className="text-accent-light italic">construí</span>
              </h2>
              <div className="flex flex-col gap-4">
                {CAREER.map((job, i) => (
                  <Reveal key={`${job.company}-${job.period}`} delay={i * 0.05}>
                    <article className="gc py-6 px-6 sm:py-7 sm:px-8">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 mb-1">
                        <h3 className="text-[17px] font-bold text-brand tracking-tight">
                          {job.role}
                        </h3>
                        {job.current && <Tag accent>Atual</Tag>}
                      </div>
                      <p className="text-[13.5px] text-accent-light font-medium mb-1">
                        {job.company}
                      </p>
                      <p className="text-[12.5px] text-text-darker mb-4">
                        {job.period}
                        {job.location ? ` · ${job.location}` : ""}
                      </p>
                      <ul className="flex flex-col gap-2 mb-4">
                        {job.highlights.map((h, j) => (
                          <li
                            key={j}
                            className="text-[13.5px] text-text-dim leading-[1.7] pl-4 relative before:content-['▪'] before:absolute before:left-0 before:text-accent-light before:text-[10px] before:top-[3px]"
                          >
                            {h}
                          </li>
                        ))}
                      </ul>
                      {job.stack && (
                        <div className="flex flex-wrap gap-1.5">
                          {job.stack.map((t) => (
                            <Tag key={t}>{t}</Tag>
                          ))}
                        </div>
                      )}
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Cases de carreira */}
          <Reveal>
            <div>
              <SectionLabel>Cases de carreira</SectionLabel>
              <h2 className="font-serif section-heading !text-[clamp(26px,3.4vw,38px)] !leading-[1.18] mb-4">
                Projetos que eu <span className="text-accent-light italic">liderei</span>
              </h2>
              <p className="text-[14px] text-text-dim leading-[1.75] mb-7 max-w-[620px]">
                Trabalho feito como funcionário dessas empresas, com contexto, desafio,
                solução e resultado. Os cases de clientes da firmino.dev estão em{" "}
                <Link href="/projetos" className="underline underline-offset-2 hover:text-accent-light transition-colors">
                  cases
                </Link>
                .
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CAREER_PROJECTS.map((p, i) => (
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
                          <h3 className="text-[16px] font-bold text-brand mb-1 tracking-tight leading-[1.35]">
                            {p.title}
                          </h3>
                          <p className="text-[12.5px] text-text-dim">
                            {p.client} · {p.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.stack.slice(0, 5).map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Experiências anteriores */}
          <Reveal>
            <div>
              <SectionLabel>Antes disso</SectionLabel>
              <h2 className="font-serif section-heading !text-[clamp(26px,3.4vw,38px)] !leading-[1.18] mb-7">
                De 2009 até <span className="text-accent-light italic">aqui</span>
              </h2>
              <div className="flex flex-col gap-3">
                {EARLIER_ROLES.map((r, i) => (
                  <Reveal key={`${r.company}-${r.period}`} delay={i * 0.04}>
                    <div className="gc py-5 px-6 grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-2 sm:gap-6">
                      <div className="pt-[2px]">
                        <div className="text-[14px] font-bold text-text-light tracking-tight">
                          {r.company}
                        </div>
                        <div className="text-[11.5px] text-text-darker mt-0.5">{r.period}</div>
                      </div>
                      <div>
                        <div className="text-[13.5px] text-accent-light font-medium mb-1">
                          {r.role}
                        </div>
                        <p className="text-[13px] text-text-dim leading-[1.7]">{r.detail}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Habilidades */}
          <Reveal>
            <div>
              <SectionLabel>Habilidades técnicas</SectionLabel>
              <h2 className="font-serif section-heading !text-[clamp(26px,3.4vw,38px)] !leading-[1.18] mb-7">
                O que eu <span className="text-accent-light italic">domino</span>
              </h2>
              <div className="flex flex-col gap-4">
                {SKILL_GROUPS.map((g, i) => (
                  <Reveal key={g.title} delay={i * 0.04}>
                    <div className="gc py-6 px-6 sm:px-8">
                      <h3 className="text-[13px] uppercase tracking-[2px] font-semibold text-accent-light mb-4">
                        {g.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {g.items.map((item) => (
                          <span
                            key={item}
                            className="gc stack-pill py-2 px-3.5 text-[12.5px] font-medium text-text-nav tracking-tight"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Formação, certificações e idiomas */}
          <Reveal>
            <div>
              <SectionLabel>Formação</SectionLabel>
              <h2 className="font-serif section-heading !text-[clamp(26px,3.4vw,38px)] !leading-[1.18] mb-7">
                Base e <span className="text-accent-light italic">idiomas</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="gc py-6 px-6 sm:px-8">
                  <h3 className="text-[13px] uppercase tracking-[2px] font-semibold text-accent-light mb-4">
                    Acadêmica
                  </h3>
                  <div className="flex flex-col gap-4">
                    {EDUCATION.map((e) => (
                      <div key={e.degree}>
                        <div className="text-[14px] font-bold text-text-light tracking-tight leading-[1.4]">
                          {e.degree}
                        </div>
                        <div className="text-[13px] text-text-dim mt-1">{e.school}</div>
                        <div className="text-[11.5px] text-text-darker mt-0.5">
                          {e.location ? `${e.location} · ` : ""}
                          {e.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="gc py-6 px-6 sm:px-8">
                  <h3 className="text-[13px] uppercase tracking-[2px] font-semibold text-accent-light mb-4">
                    Certificações
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {CERTIFICATIONS.map((c) => (
                      <li
                        key={c}
                        className="text-[13.5px] text-text-dim leading-[1.65] pl-4 relative before:content-['▪'] before:absolute before:left-0 before:text-accent-light before:text-[10px] before:top-[3px]"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="gc py-6 px-6 sm:px-8 md:col-span-2">
                  <h3 className="text-[13px] uppercase tracking-[2px] font-semibold text-accent-light mb-4">
                    Idiomas
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-8">
                    {LANGUAGES.map((l) => (
                      <div key={l.name}>
                        <span className="text-[14px] font-bold text-text-light">{l.name}</span>
                        <span className="text-[13px] text-text-dim"> · {l.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Projetos */}
          <Reveal>
            <div className="gc py-8 px-6 sm:py-10 sm:px-9">
              <h2 className="font-serif text-[22px] sm:text-[26px] font-medium text-brand tracking-tight mb-3">
                Cases de clientes
              </h2>
              <p className="text-[14px] text-text-dim leading-[1.75] mb-6 max-w-[560px]">
                O que a firmino.dev entregou pra quem a contratou, com contexto, desafio, solução e resultado.
              </p>
              <Button href="/projetos" variant="ghost">
                Ver cases →
              </Button>
            </div>
          </Reveal>
        </div>

        {/* CTA */}
        <section className="section-padding !pt-0">
          <div className="content-container max-w-[920px]">
            <Reveal>
              <div className="gc py-10 px-6 sm:py-14 sm:px-12 text-center relative overflow-hidden">
                <div className="glow-line-top-cta" />
                <div className="cta-radial-overlay" />
                <div className="relative">
                  <h2 className="font-serif section-heading !text-[clamp(22px,3vw,34px)] !leading-[1.2] mb-4">
                    Quer esse cuidado <span className="text-accent-light italic">no seu projeto</span>?
                  </h2>
                  <p className="text-[14px] text-text-dim leading-[1.7] max-w-[500px] mx-auto mb-7">
                    Quem fala com você na firmino.dev é quem responde pela parte técnica. Conte o que você precisa.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <TrackedLink
                      href="/contato"
                      event="cta_click"
                      eventParams={{ location: "joao_cta", label: "contato" }}
                      className="btn-primary inline-flex items-center justify-center"
                    >
                      Falar com a firmino.dev →
                    </TrackedLink>
                    <Button href="/como-trabalhamos" variant="ghost">
                      Ver como trabalhamos
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
