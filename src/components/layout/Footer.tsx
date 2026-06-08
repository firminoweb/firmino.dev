import Link from "next/link";
import { Reveal, ObfuscatedContact } from "@/components/ui";
import { CONTACT } from "@/data/portfolio";

const COMPANY_LINKS: { label: string; href: string }[] = [
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
  { label: "Projetos", href: "/projetos" },
  { label: "Contato", href: "/contato" },
];

const SERVICE_LINKS: { label: string; href: string }[] = [
  { label: "Aplicações web sob medida", href: "/servicos/aplicacoes-web-sob-medida" },
  { label: "App mobile sob medida", href: "/servicos/app-mobile-sob-medida" },
  { label: "Automações com IA", href: "/servicos/automacoes-com-ia" },
  { label: "Squad para empresa", href: "/servicos/squad-empresa-digitalizando" },
  { label: "Reforço técnico para agência", href: "/servicos/reforco-tecnico-agencia" },
  { label: "Arquitetura & performance", href: "/servicos/arquitetura-performance-qualidade" },
];

export function Footer() {
  return (
    <footer className="section-padding !pb-10 border-t border-border-subtle">
      <div className="content-container">
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-10 lg:gap-12 mb-14">
            <div>
              <Link href="/" className="flex items-center gap-[3px] mb-4">
                <span className="text-xl font-bold text-brand">firmino</span>
                <span className="text-xl font-normal text-accent-light">.dev</span>
              </Link>
              <p className="text-[13.5px] text-text-dark leading-[1.75] max-w-[260px]">
                Empresa de engenharia de software especializada em plataformas web, apps mobile e aplicações inteligentes com Generative AI & LLM para empresas que exigem excelência técnica.
              </p>
            </div>

            <div>
              <h4 className="sub-heading">Empresa</h4>
              {COMPANY_LINKS.map((l) => (
                <Link key={l.label} href={l.href} className="footer-link">
                  {l.label}
                </Link>
              ))}
            </div>

            <div>
              <h4 className="sub-heading">Serviços</h4>
              {SERVICE_LINKS.map((l, i) => (
                <Link key={`${l.label}-${i}`} href={l.href} className="footer-link">
                  {l.label}
                </Link>
              ))}
            </div>

            <div>
              <h4 className="sub-heading">Contato</h4>
              <ObfuscatedContact
                value={CONTACT.email}
                kind="email"
                prefix="✉ "
                className="footer-link"
              />
              <ObfuscatedContact
                value={CONTACT.phone}
                kind="phone"
                prefix="☎ "
                className="footer-link"
              />
              <p className="text-[13.5px] text-text-dark mb-[22px]">📍 {CONTACT.location}</p>
              <div className="flex gap-2.5">
                {(["LinkedIn", "GitHub"] as const).map((s) => (
                  <a
                    key={s}
                    href={s === "LinkedIn" ? CONTACT.linkedin : CONTACT.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-border-subtle">
            <span className="text-[12.5px] text-text-darker text-center sm:text-left">© 2026 firmino.dev — J. H. Firmino & CIA LTDA. Todos os direitos reservados.</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_#22C55E44]" />
              <span className="text-xs text-text-darker">Disponível para novos projetos</span>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
