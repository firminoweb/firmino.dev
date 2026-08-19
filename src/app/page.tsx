import { Navbar, Footer, Background } from "@/components/layout";
import {
  Hero,
  Services,
  ComoFunciona,
  Cases,
  Founder,
  Parceiros,
  Testimonials,
  Faq,
  AiCta,
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
          <Founder />
          <Parceiros />
          <Testimonials />
          <Faq />
          <AiCta />
        </main>
        <Footer />
      </div>
    </>
  );
}
