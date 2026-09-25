import { Reveal, SectionLabel, JsonLd } from "@/components/ui";
import { FAQ_ITEMS } from "@/data/empresa";

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function Faq() {
  return (
    <section className="section-padding">
      <JsonLd data={FAQ_JSON_LD} />
      <div className="content-container max-w-[820px]">
        <Reveal>
          <div className="text-center mb-12">
            <SectionLabel center>Perguntas frequentes</SectionLabel>
            <h2 className="font-serif section-heading">
              Antes de <span className="text-accent-light italic">conversar</span>
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <details className="faq-item gc px-6 py-1 sm:px-7">
                <summary className="flex items-center justify-between gap-4 py-5 text-left">
                  <span className="text-[15.5px] sm:text-[16.5px] font-semibold text-text-light tracking-tight">
                    {item.q}
                  </span>
                  <span className="faq-chevron text-accent-light text-[18px] shrink-0 transition-transform duration-300" aria-hidden>
                    ⌄
                  </span>
                </summary>
                <p className="text-[14px] text-text-dim leading-[1.75] pb-5 pr-6 max-w-[680px]">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
