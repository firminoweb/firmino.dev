import Link from "next/link";
import { Navbar, Footer, Background } from "@/components/layout";
import { Reveal, SectionLabel, Button } from "@/components/ui";
import { STACK } from "@/data/portfolio";

export const metadata = {
  title: "Stack — firmino.dev",
  description:
    "Tecnologias que usamos para entregar resultado: frontend, mobile, backend, testes, arquitetura, DevOps e Generative AI.",
};

export default function StackPage() {
  const categories = Object.keys(STACK);

  return (
    <>
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero !min-h-[40vh] !pb-10">
          <div className="content-container w-full max-w-[920px]">
            <SectionLabel>Nossa Stack</SectionLabel>
            <h1 className="font-serif hero-heading !text-[clamp(40px,5vw,58px)] !leading-[1.06] mb-5">
              Tecnologias que <span className="text-accent-light italic">dominamos</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8] max-w-[640px]">
              Stack pragmática, escolhida com critério para cada projeto — do frontend ao deploy, com qualidade automatizada e foco em performance.
            </p>
          </div>
        </section>

        <section className="section-padding !pt-6">
          <div className="content-container max-w-[920px] flex flex-col gap-5">
            {categories.map((cat, i) => (
              <Reveal key={cat} delay={i * 0.05}>
                <div className="gc py-7 px-6 sm:py-9 sm:px-9 relative overflow-hidden">
                  <h2 className="text-[15px] uppercase tracking-[2px] font-semibold text-accent-light mb-5">
                    {cat}
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {STACK[cat].map((tech) => (
                      <div
                        key={tech}
                        className="gc stack-pill py-2.5 px-4 sm:py-3 sm:px-5 text-[13px] sm:text-[14px] font-medium text-text-nav tracking-tight"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-padding !pt-4">
          <div className="content-container max-w-[920px]">
            <Reveal>
              <div className="gc py-10 px-6 sm:py-14 sm:px-12 text-center relative overflow-hidden">
                <div className="glow-line-top-cta" />
                <div className="cta-radial-overlay" />
                <div className="relative">
                  <h2 className="font-serif section-heading !text-[clamp(22px,3vw,34px)] !leading-[1.2] mb-4">
                    Não encontrou a tecnologia que precisa?
                  </h2>
                  <p className="text-[14px] text-text-dim leading-[1.7] max-w-[480px] mx-auto mb-7">
                    Trabalhamos com o que faz sentido para o problema. Conta pra gente o seu desafio.
                  </p>
                  <Link href="/contato">
                    <Button>Fale com a gente →</Button>
                  </Link>
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
