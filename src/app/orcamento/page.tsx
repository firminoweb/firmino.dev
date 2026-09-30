import type { Metadata } from "next";
import { Navbar, Footer, Background } from "@/components/layout";
import { JsonLd, SectionLabel, WhatsAppButton, WhatsAppGlyph } from "@/components/ui";
import { Faq } from "@/components/home";
import { LeadWizard } from "@/components/forms/LeadWizard";
import { FAQ_ITEMS, HERO_TRUST } from "@/data/empresa";
import { breadcrumbJsonLd, OG_IMAGES } from "@/lib/seo";

const TITLE = "Orçamento de site, sistema ou app · firmino.dev";
const DESCRIPTION =
  "Peça um orçamento de site, sistema web, app ou automação com IA em 1 minuto. Três perguntas rápidas e a gente responde em até 24h úteis com um caminho e uma estimativa, sem custo.";

export const metadata: Metadata = {
  title: "Orçamento de site, sistema ou app",
  description: DESCRIPTION,
  alternates: { canonical: "/orcamento" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/orcamento", type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: OG_IMAGES },
};

// As perguntas do FAQ geral que respondem a quem está pedindo orçamento
const ORCAMENTO_FAQ = FAQ_ITEMS.filter((f) =>
  ["Quanto custa um projeto?", "Em quanto tempo fica pronto?", "Vocês trabalham com contrato e nota fiscal?", "Como começa?"].includes(f.q),
);

export default function OrcamentoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Orçamento", path: "/orcamento" },
        ])}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <main>
          <section className="page-hero !min-h-[36vh] !pb-8">
            <div className="content-container w-full max-w-[760px]">
              <SectionLabel>Orçamento</SectionLabel>
              <h1 className="font-serif hero-heading !text-[clamp(34px,4.6vw,52px)] !leading-[1.08] mb-5">
                Orçamento de site, sistema ou app{" "}
                <span className="text-accent-light italic">em 1 minuto</span>
              </h1>
              <p className="text-base text-text-muted leading-[1.8] max-w-[620px] mb-6">
                Responda três perguntas rápidas. A gente responde em até 24h úteis com um caminho e uma estimativa, sem custo e sem compromisso.
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {HERO_TRUST.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-[13px] text-text-subtle font-medium">
                    <span aria-hidden className="text-success">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section-padding !pt-4">
            <div className="content-container max-w-[760px]">
              <div className="gc py-8 px-6 sm:px-10 relative overflow-hidden">
                <div className="case-glow-line" />
                <LeadWizard source="orcamento" />
              </div>
              <p className="text-[13px] text-text-dim text-center mt-5">
                Prefere conversar?{" "}
                <WhatsAppButton
                  source="orcamento"
                  message="Olá! Vim pela página de orçamento da firmino.dev e quero conversar sobre um projeto."
                  className="inline-flex items-center gap-1.5 font-semibold text-accent-light hover:text-accent transition-colors"
                >
                  <WhatsAppGlyph className="w-4 h-4" />
                  Chame no WhatsApp
                </WhatsAppButton>
              </p>
            </div>
          </section>

          <Faq items={ORCAMENTO_FAQ} />
        </main>

        <Footer />
      </div>
    </>
  );
}
