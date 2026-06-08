import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Tag,
  SectionLabel,
  WhatsAppButton,
  WhatsAppGlyph,
  TrackedLink,
} from "@/components/ui";
import { HERO_TAGS } from "@/data/portfolio";

const PROOF_LOGOS = [
  { name: "Itaú", logo: "/images/logos/itau.webp" },
  { name: "O Boticário", logo: "/images/logos/oboticario.webp" },
  { name: "TOTVS", logo: "/images/logos/totvs.webp" },
  { name: "NTT Data", logo: "/images/logos/nttdata.webp" },
];

const PROOF_METRICS = [
  { value: "+80%", label: "venda mobile", sub: "Eudora & Boticário" },
  { value: "-60%", label: "tempo de carga", sub: "plataformas Itaú" },
];

export function Hero() {
  return (
    <section id="home" className="section-padding-hero">
      <div className="content-container w-full grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-10 lg:gap-14 items-center">
        {/* Left — transform-only entrance keeps the <h1> a valid LCP candidate */}
        <div className="hero-rise">
          <SectionLabel prominent>Engenharia de software · Web · Mobile · IA</SectionLabel>
          <h1 className="hero-heading">
            <span className="font-serif">Construímos </span>
            <span className="font-serif text-accent-light italic">software</span>
            <span className="font-serif">.</span><br />
            <span className="font-serif">Reforçamos </span>
            <span className="font-serif text-accent-light italic">times</span>
            <span className="font-serif">.</span>
          </h1>
          <p className="text-base text-text-muted leading-[1.75] max-w-[500px] mb-5">
            Aplicações web, apps mobile e automações com IA sob medida pra sua empresa. 15+ anos construindo produto que rende, do pequeno negócio à grande operação.
          </p>
          <div className="flex flex-wrap gap-2 mb-9">
            {HERO_TAGS.map((t) => (
              <Tag key={t} accent>{t}</Tag>
            ))}
          </div>
          <div>
            <div className="flex flex-wrap gap-3.5">
              <TrackedLink href="/contato" event="cta_click" eventParams={{ location: "hero", label: "proposta" }}>
                <Button>Quero uma proposta →</Button>
              </TrackedLink>
              <Link href="/projetos">
                <Button variant="ghost">Ver casos</Button>
              </Link>
            </div>
            <p className="text-[11.5px] text-text-dim mt-3">
              Resposta em 24h · sem compromisso
            </p>
          </div>
        </div>

        {/* Right — proof + direct WhatsApp lead channel */}
        <div className="reveal-immediate flex justify-center" style={{ animationDelay: "0.15s" }}>
          <ProofCard />
        </div>
      </div>
    </section>
  );
}

function ProofCard() {
  return (
    <div className="gc w-full max-w-[360px] p-0 relative overflow-hidden">
      <div className="glow-line-top-hero" />

      <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border-card">
        <div className="flex items-center gap-2.5">
          <div className="hero-card-dot" />
          <span className="text-[13px] text-text-subtle font-medium">firmino.dev</span>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] text-success font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_#22c55e66]" />
          Disponível
        </span>
      </div>

      <div className="px-6 pt-6 pb-7 flex flex-col gap-5">
        <div>
          <span className="text-[10.5px] text-accent-light font-semibold tracking-[2px] uppercase">
            Quem já confia na gente
          </span>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {PROOF_LOGOS.map((c) => (
              <div
                key={c.name}
                title={c.name}
                className="flex items-center justify-center h-9 rounded-lg bg-[#f4f5fa] border border-border-card px-1.5"
              >
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={72}
                  height={24}
                  className="h-4 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {PROOF_METRICS.map((m) => (
            <div key={m.value} className="metric-box !text-left !px-4 !py-3">
              <div className="font-serif text-[24px] font-medium text-brand tracking-tight leading-none">
                {m.value}
              </div>
              <div className="text-[11px] text-accent-light font-semibold mt-1.5">{m.label}</div>
              <div className="text-[10px] text-text-dim mt-0.5">{m.sub}</div>
            </div>
          ))}
        </div>

        <div>
          <WhatsAppButton
            source="hero"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-[10px] bg-[#25D366] text-white font-semibold text-[14px] hover:bg-[#20bd5a] transition-colors"
          >
            <WhatsAppGlyph className="w-[18px] h-[18px]" />
            Falar agora no WhatsApp
          </WhatsAppButton>
          <p className="text-[11px] text-text-dim text-center mt-2.5">
            Resposta em 24h · sem compromisso
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
        <div className="hero-sweep-bar animate-sweep" />
      </div>
    </div>
  );
}
