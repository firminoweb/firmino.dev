import { Navbar, Footer, Background } from "@/components/layout";

export const metadata = {
  title: "Contato — firmino.dev",
  description: "Entre em contato com João Henrique Firmino para discutir projetos e oportunidades.",
};

export default function ContactPage() {
  return (
    <>
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section id="contato" className="page-hero">
          <div className="content-container max-w-[800px] text-center">
            <h1 className="font-serif section-heading mb-6">
              <span className="text-accent-light italic">Contato</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8]">
              Página de contato em construção. Em breve, formulário integrado.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
