import type { Metadata } from "next";
import { Navbar, Footer, Background } from "@/components/layout";
import { SectionLabel, JsonLd } from "@/components/ui";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { breadcrumbJsonLd, OG_IMAGES } from "@/lib/seo";

const TITLE = "Cases · firmino.dev";
const DESCRIPTION =
  "Cases de clientes da firmino.dev: plataforma de pagamentos, apps nas lojas, banking white-label, portal de governo e mais. O contexto, a decisão e o resultado de cada projeto.";

export const metadata: Metadata = {
  title: "Cases",
  description: DESCRIPTION,
  alternates: { canonical: "/projetos" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/projetos",
    type: "website",
    images: OG_IMAGES,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: OG_IMAGES },
};

export default function ProjetosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cases", path: "/projetos" },
        ])}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero !min-h-[40vh] !pb-10">
          <div className="content-container w-full max-w-[920px]">
            <SectionLabel>Cases</SectionLabel>
            <h1 className="font-serif hero-heading !text-[clamp(40px,5vw,58px)] !leading-[1.06] mb-5">
              O que entregamos<br />
              <span className="text-accent-light italic">pra quem nos contratou</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8] max-w-[640px]">
              Fintech, viagens, jurídico, óptica e governo: o contexto, a decisão e o resultado de cada projeto.
            </p>
          </div>
        </section>

        <section className="section-padding !pt-2">
          <div className="content-container max-w-[920px]">
            <ProjectsExplorer />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
