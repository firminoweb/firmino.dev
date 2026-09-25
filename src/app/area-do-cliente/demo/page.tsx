import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer, Background } from "@/components/layout";
import { JsonLd, TrackedLink } from "@/components/ui";
import { ProjectDetailView } from "@/components/portal/ProjectDetailView";
import { PORTAL_DEMO } from "@/data/portal-demo";
import { breadcrumbJsonLd, OG_IMAGES } from "@/lib/seo";

const TITLE = "Demonstração da área do cliente · firmino.dev";
const DESCRIPTION =
  "Navegue por um projeto fictício e veja como o cliente da firmino.dev acompanha cronograma, entregas, chamados, documentos e faturas.";

export const metadata: Metadata = {
  title: "Demonstração da área do cliente",
  description: DESCRIPTION,
  alternates: { canonical: "/area-do-cliente/demo" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/area-do-cliente/demo", type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: OG_IMAGES },
};

export default function DemoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Área do cliente", path: "/area-do-cliente" },
          { name: "Demonstração", path: "/area-do-cliente/demo" },
        ])}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <div className="content-container max-w-[960px] pt-[110px]">
          <div className="gc px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-accent/40">
            <p className="text-[13.5px] text-text-subtle">
              <strong className="text-accent-light">Demonstração com dados fictícios.</strong> É assim que o cliente vê o próprio projeto.
            </p>
            <TrackedLink
              href="/contato"
              event="cta_click"
              eventParams={{ location: "area-do-cliente-demo", label: "proposta" }}
              className="btn-primary !py-2 !px-4 text-[13px] inline-flex items-center"
            >
              Quero acompanhar meu projeto assim →
            </TrackedLink>
          </div>
        </div>
        <div className="content-container max-w-[960px] py-10">
          <ProjectDetailView detail={PORTAL_DEMO} demo />
          <p className="text-[13px] text-text-dim mt-10">
            <Link href="/area-do-cliente" className="text-accent-light hover:text-accent">
              ← Como funciona a área do cliente
            </Link>
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
}
