import { Navbar, Footer, Background } from "@/components/layout";

export const metadata = {
  title: "Blog — firmino.dev",
  description: "Artigos sobre desenvolvimento web, AI-Driven Development, micro-frontends e mais.",
};

export default function BlogPage() {
  return (
    <>
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero">
          <div className="content-container max-w-[800px] text-center">
            <h1 className="font-serif section-heading mb-6">
              <span className="text-accent-light italic">Blog</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8]">
              Em breve, artigos sobre desenvolvimento, arquitetura e AI.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
