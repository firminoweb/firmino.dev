import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer, Background } from "@/components/layout";
import { Button, JsonLd, Reveal, SectionLabel, TrackedLink } from "@/components/ui";
import { breadcrumbJsonLd, OG_IMAGES } from "@/lib/seo";

const TITLE = "Área do cliente · firmino.dev";
const DESCRIPTION =
  "Acompanhe o seu projeto de perto: cronograma, entregas, chamados, documentos e faturas num lugar só, com acesso pelo e-mail e sem senha. Veja a demonstração.";

export const metadata: Metadata = {
  title: "Área do cliente",
  description: DESCRIPTION,
  alternates: { canonical: "/area-do-cliente" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/area-do-cliente", type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: OG_IMAGES },
};

const FEATURES = [
  {
    icon: "◷",
    title: "Cronograma e etapa atual",
    desc: "Em que fase o projeto está, o que já foi concluído e a data prevista de cada entrega. Sem precisar perguntar.",
  },
  {
    icon: "✓",
    title: "Entregas a cada ciclo",
    desc: "O que ficou pronto em cada entrega, com link para ver funcionando. Você acompanha o sistema crescer.",
  },
  {
    icon: "✉",
    title: "Chamados",
    desc: "Pediu um ajuste ou achou um problema? Abre o chamado ali mesmo e acompanha a resposta, sem se perder no WhatsApp.",
  },
  {
    icon: "▤",
    title: "Documentos e faturas",
    desc: "Contrato, proposta, notas fiscais e boletos num lugar só, com o status de cada pagamento.",
  },
];

const HOW = [
  { title: "Acesso pelo e-mail, sem senha", desc: "Você digita o seu e-mail e recebe um link de acesso. Nada de senha para lembrar." },
  { title: "Só a sua empresa vê", desc: "Cada cliente enxerga apenas os próprios projetos e documentos, com os dados tratados conforme a LGPD." },
  { title: "Atualizado a cada entrega", desc: "A equipe registra o andamento, as entregas e os documentos, e você recebe um aviso por e-mail." },
];

export default function AreaDoClientePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Área do cliente", path: "/area-do-cliente" },
        ])}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero !min-h-[44vh] !pb-10">
          <div className="content-container w-full max-w-[920px]">
            <SectionLabel>Área do cliente</SectionLabel>
            <h1 className="font-serif hero-heading !text-[clamp(38px,5vw,56px)] !leading-[1.08] mb-5">
              Você acompanha o seu projeto{" "}<br />
              <span className="text-accent-light italic">sem precisar perguntar</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8] max-w-[640px] mb-7">
              Todo cliente da firmino.dev tem uma área própria para ver o cronograma, as entregas, os chamados e os documentos do projeto. Transparência do primeiro dia à entrega final.
            </p>
            <div className="flex flex-wrap gap-3">
              <TrackedLink
                href="/area-do-cliente/demo"
                event="cta_click"
                eventParams={{ location: "area-do-cliente", label: "demo" }}
                className="btn-primary inline-flex items-center justify-center"
              >
                Ver a demonstração →
              </TrackedLink>
              <Button href="/contato" variant="ghost">Quero conversar</Button>
            </div>
            <p className="text-[13px] text-text-dim mt-4">
              Já é cliente?{" "}
              <Link href="/cliente/entrar" className="text-accent-light hover:text-accent">
                Entrar na área do cliente
              </Link>
            </p>
          </div>
        </section>

        <section className="section-padding !pt-6">
          <div className="content-container max-w-[1080px] grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05} className="h-full">
                <div className="gc p-7 sm:p-9 h-full">
                  <div className="service-icon">{f.icon}</div>
                  <h2 className="text-[19px] font-bold text-text-light mb-2 tracking-tight">{f.title}</h2>
                  <p className="text-[14.5px] text-text-dim leading-[1.75]">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-padding !pt-4">
          <div className="content-container max-w-[920px]">
            <SectionLabel>Como funciona</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
              {HOW.map((h) => (
                <div key={h.title} className="gc p-6">
                  <h3 className="text-[15.5px] font-semibold text-text-light mb-2">{h.title}</h3>
                  <p className="text-[13.5px] text-text-dim leading-[1.7]">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding !pt-4">
          <div className="content-container max-w-[920px]">
            <div className="gc py-10 px-6 sm:py-14 sm:px-12 text-center relative overflow-hidden">
              <div className="glow-line-top-cta" />
              <div className="cta-radial-overlay" />
              <div className="relative">
                <h2 className="font-serif section-heading !text-[clamp(22px,3vw,34px)] !leading-[1.2] mb-4">
                  Veja como seria acompanhar o seu projeto
                </h2>
                <p className="text-[14px] text-text-dim leading-[1.7] max-w-[480px] mx-auto mb-7">
                  A demonstração mostra um projeto fictício, exatamente como o cliente vê.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button href="/area-do-cliente/demo">Abrir a demonstração →</Button>
                  <Button href="/contato" variant="ghost">Falar com a gente</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
