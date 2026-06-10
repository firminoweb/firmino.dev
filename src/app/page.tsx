import { Navbar, Footer, Background } from "@/components/layout";
import {
  Hero,
  Clients,
  KeyAchievements,
  Services,
  Cases,
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
          <Clients />
          <KeyAchievements />
          <Services />
          <Cases />
          <Testimonials />
          <Faq />
          <AiCta />
        </main>
        <Footer />
      </div>
    </>
  );
}
