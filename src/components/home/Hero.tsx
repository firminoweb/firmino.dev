import Link from "next/link";
import { Reveal, Button, Tag, SectionLabel } from "@/components/ui";
import { HERO_TAGS } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="home" className="section-padding-hero">
      <div className="content-container w-full grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-10 lg:gap-14 items-center">
        <Reveal>
          <div>
            <SectionLabel>Senior Fullstack Developer | Front-End & Back-End</SectionLabel>
            <h1 className="hero-heading">
              <span className="font-serif">Desenvolvemos soluções</span><br />
              <span className="font-serif">que transformam </span>
              <span className="font-serif text-accent-light italic">negócios</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.75] max-w-[500px] mb-5">
              Somos especialistas em Angular, React, React Native, Next.js e Node.js com 15+ anos de mercado. Criamos aplicações escaláveis potencializadas por Generative AI & LLM Applications para empresas que exigem excelência.
            </p>
            <div className="flex flex-wrap gap-2 mb-9">
              {HERO_TAGS.map((t) => (
                <Tag key={t} accent>{t}</Tag>
              ))}
            </div>
            <div className="flex flex-wrap gap-3.5">
              <Link href="/contato">
                <Button>Fale com a gente →</Button>
              </Link>
              <Link href="/projetos">
                <Button variant="ghost">Ver projetos</Button>
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="flex justify-center">
            <div className="gc w-full max-w-[340px] p-0 relative overflow-hidden">
              <div className="glow-line-top-hero" />
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border-card">
                <div className="flex items-center gap-2.5">
                  <div className="hero-card-dot" />
                  <span className="text-[13px] text-text-subtle font-medium">firmino.dev</span>
                </div>
                <span className="text-lg text-[#4a4d6e]">↗</span>
              </div>
              <div className="flex flex-col items-center gap-5 px-6 pt-9 pb-10">
                <div className="hero-card-icon animate-float">⟨/⟩</div>
                <div className="text-center">
                  <div className="font-serif text-[30px] text-white font-medium">Full-Stack</div>
                  <div className="font-serif text-[30px] text-accent-light italic">AI-Driven</div>
                </div>
                <p className="text-[12.5px] text-text-dim text-center leading-[1.6] px-2">
                  Angular · React · React Native · Next.js · Node.js<br /> Generative AI · LLM Applications · AI-Driven
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
                <div className="hero-sweep-bar animate-sweep" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
