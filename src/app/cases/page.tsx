import { Navbar, Footer, Background } from "@/components/layout";

export const metadata = {
  title: "Cases — firmino.dev",
  description: "Cases de sucesso em empresas como Itaú, Boticário, TOTVS e NTT Data.",
};

export default function CasesPage() {
  return (
    <>
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero">
          <div className="content-container max-w-[800px] text-center">
            <h1 className="font-serif section-heading mb-6">
              Cases & <span className="text-accent-light italic">Experiência</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8]">
              Página em construção. Em breve, detalhes completos de cada case.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
