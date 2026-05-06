import type { Metadata } from "next";
import { Navbar, Footer, Background } from "@/components/layout";
import { JsonLd } from "@/components/ui";
import { breadcrumbJsonLd } from "@/lib/seo";

const TITLE = "Blog — firmino.dev";
const DESCRIPTION =
  "Artigos sobre desenvolvimento web, AI-Driven Development, micro-frontends e mais.";

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/blog",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
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
