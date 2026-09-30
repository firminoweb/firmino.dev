import { TrackedLink, WhatsAppButton, WhatsAppGlyph } from "@/components/ui";
import { orcamentoHref } from "@/lib/contact-options";

interface PostCtaProps {
  slug: string;
  title: string;
}

/** Fim do post: quem chegou pela busca ganha um próximo passo. */
export function PostCta({ slug, title }: PostCtaProps) {
  const source = `blog-${slug}`;
  return (
    <aside className="gc py-9 px-6 sm:px-10 mt-14 text-center relative overflow-hidden">
      <div className="glow-line-top-cta" />
      <div className="relative">
        <p className="font-serif text-[clamp(22px,3vw,30px)] text-brand leading-[1.2] mb-3">
          Quer aplicar isso{" "}
          <span className="text-accent-light italic">na sua empresa?</span>
        </p>
        <p className="text-[14px] text-text-dim leading-[1.7] max-w-[480px] mx-auto mb-7">
          Conta como funciona hoje. A gente responde em até 24h úteis com um caminho e uma estimativa, sem custo e sem compromisso.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <TrackedLink
            href={orcamentoHref(source)}
            event="cta_click"
            eventParams={{ location: source, label: "orcamento" }}
            className="btn-primary inline-flex items-center justify-center"
          >
            Pedir orçamento em 1 minuto →
          </TrackedLink>
          <WhatsAppButton
            source={source}
            message={`Olá! Li o artigo "${title}" no site da firmino.dev e quero conversar sobre um projeto.`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] bg-[#15803d] text-white font-semibold text-[14px] hover:bg-[#166534] transition-colors"
          >
            <WhatsAppGlyph className="w-[18px] h-[18px]" />
            Falar no WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </aside>
  );
}
