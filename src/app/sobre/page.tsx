import { Navbar, Footer, Background } from "@/components/layout";

export const metadata = {
  title: "Sobre — firmino.dev",
  description: "Conheça a firmino.dev, empresa de engenharia de software especializada em web, mobile e Generative AI com 15+ anos de mercado.",
};

export default function AboutPage() {
  return (
    <>
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero">
          <div className="content-container max-w-[800px] text-center">
            <h1 className="font-serif section-heading mb-6">
              Sobre <span className="text-accent-light italic">nós</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8]">
              Página em construção. Em breve, mais detalhes sobre a história da firmino.dev e os times que ajudamos a construir.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
