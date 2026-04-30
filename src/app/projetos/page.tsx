import { Navbar, Footer, Background } from "@/components/layout";
import { SectionLabel } from "@/components/ui";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";

export const metadata = {
  title: "Projetos — firmino.dev",
  description:
    "Projetos entregues pela firmino.dev — corporativos, freelance, pessoais e open source.",
};

export default function ProjetosPage() {
  return (
    <>
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero !min-h-[40vh] !pb-10">
          <div className="content-container w-full max-w-[920px]">
            <SectionLabel>Projetos</SectionLabel>
            <h1 className="font-serif hero-heading !text-[clamp(40px,5vw,58px)] !leading-[1.06] mb-5">
              Projetos &<br />
              <span className="text-accent-light italic">cases entregues</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8] max-w-[640px]">
              Uma seleção dos trabalhos que construímos — em grandes empresas, projetos freelance e iniciativas próprias.
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
