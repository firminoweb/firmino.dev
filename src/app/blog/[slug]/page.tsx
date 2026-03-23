import { Navbar, Footer, Background } from "@/components/layout";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;

  return (
    <>
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero">
          <div className="content-container max-w-[800px] text-center">
            <h1 className="font-serif section-heading mb-6">
              <span className="text-accent-light italic">{slug}</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8]">
              Conteúdo do artigo em breve.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
