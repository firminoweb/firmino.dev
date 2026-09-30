import { Navbar, Footer, Background } from "@/components/layout";
import {
  Hero,
  Services,
  ComoFunciona,
  Cases,
  Testimonials,
  QuemFaz,
  Faq,
  AiCta,
  PedidoGuiado,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <main>
          <Hero />
          <Services />
          <ComoFunciona />
          <Cases />
          <Testimonials />
          <QuemFaz />
          <Faq />
          <PedidoGuiado />
          <AiCta />
        </main>
        <Footer />
      </div>
    </>
  );
}
