import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer, Background } from "@/components/layout";
import { SectionLabel, JsonLd, ObfuscatedContact } from "@/components/ui";
import { CONTACT, COMPANY } from "@/data/portfolio";
import { breadcrumbJsonLd } from "@/lib/seo";

const TITLE = "Política de Privacidade — firmino.dev";
const DESCRIPTION =
  "Como a firmino.dev coleta, usa e protege os seus dados pessoais, em conformidade com a LGPD (Lei nº 13.709/2018).";
const LAST_UPDATE = "10 de junho de 2026";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: DESCRIPTION,
  alternates: { canonical: "/politica-de-privacidade" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/politica-de-privacidade",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function PrivacidadePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Política de Privacidade", path: "/politica-de-privacidade" },
        ])}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero !min-h-[35vh] !pb-10">
          <div className="content-container w-full max-w-[820px]">
            <SectionLabel>Transparência</SectionLabel>
            <h1 className="font-serif hero-heading !text-[clamp(36px,4.5vw,52px)] !leading-[1.08] mb-5">
              Política de <span className="text-accent-light italic">Privacidade</span>
            </h1>
            <p className="text-[14px] text-text-dim leading-[1.75]">
              Última atualização: {LAST_UPDATE}
            </p>
          </div>
        </section>

        <section className="section-padding !pt-4">
          <div className="content-container max-w-[820px]">
            <div className="prose prose-invert prose-firmino max-w-none">
              <p>
                Esta política explica, em linguagem direta, quais dados pessoais coletamos
                quando você usa o site <strong>firmino.dev</strong>, para que usamos, com
                quem são compartilhados e quais são os seus direitos — em conformidade com
                a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).
              </p>

              <h2>1. Quem somos</h2>
              <p>
                O site firmino.dev é operado por <strong>{COMPANY.legalName}</strong>,
                inscrita no CNPJ sob o nº <strong>{COMPANY.cnpj}</strong>, com sede em São
                Paulo, Brasil (“firmino.dev”, “nós”). Somos a controladora dos dados
                pessoais tratados por este site. Para qualquer assunto relacionado a
                privacidade, fale com a gente pelo e-mail{" "}
                <ObfuscatedContact value={CONTACT.email} kind="email" className="font-semibold" />.
              </p>

              <h2>2. Quais dados coletamos</h2>
              <p>
                <strong>Dados que você nos envia.</strong> Ao preencher o formulário de
                contato, você informa nome, e-mail, empresa (opcional), o tipo de projeto
                e a sua mensagem. Ao falar conosco por WhatsApp, telefone ou e-mail, você
                nos fornece os dados de contato correspondentes.
              </p>
              <p>
                <strong>Dados coletados automaticamente.</strong> Usamos o Google
                Analytics para entender como o site é usado (páginas visitadas, origem do
                acesso, tipo de dispositivo, eventos de navegação), por meio de cookies e
                identificadores. Nosso provedor de hospedagem (Vercel) coleta métricas
                técnicas de desempenho e registra temporariamente o endereço IP das
                requisições — que também usamos, de forma transitória, para limitar abuso
                no envio do formulário. A sua preferência de tema (claro/escuro) fica
                guardada apenas no seu navegador e não chega até nós.
              </p>
              <p>
                Não coletamos dados sensíveis e o site não se destina a menores de idade.
              </p>

              <h2>3. Para que usamos os seus dados</h2>
              <ul>
                <li>
                  <strong>Responder ao seu contato</strong> e conduzir a conversa
                  comercial que você iniciou — proposta, orçamento, agenda (base legal:
                  procedimentos preliminares de contrato e legítimo interesse, art. 7º, V
                  e IX da LGPD).
                </li>
                <li>
                  <strong>Medir e melhorar o site</strong> — estatísticas de uso agregadas
                  via Google Analytics (base legal: legítimo interesse).
                </li>
                <li>
                  <strong>Prevenir spam e abuso</strong> no formulário de contato (base
                  legal: legítimo interesse).
                </li>
              </ul>
              <p>
                Não usamos os seus dados para enviar marketing não solicitado e não
                vendemos dados pessoais a terceiros, em nenhuma hipótese.
              </p>

              <h2>4. Com quem compartilhamos</h2>
              <p>
                Compartilhamos dados apenas com os fornecedores que operam o site, na
                medida necessária para cada serviço:
              </p>
              <ul>
                <li>
                  <strong>Resend</strong> — entrega por e-mail das mensagens enviadas pelo
                  formulário de contato;
                </li>
                <li>
                  <strong>Vercel</strong> — hospedagem do site e métricas técnicas de
                  desempenho;
                </li>
                <li>
                  <strong>Google (Analytics)</strong> — estatísticas de uso do site;
                </li>
                <li>
                  <strong>Meta (WhatsApp)</strong> — quando você opta por falar conosco
                  pelo WhatsApp, a conversa é processada pela plataforma, sujeita à
                  política de privacidade do WhatsApp.
                </li>
              </ul>
              <p>
                Esses fornecedores podem processar dados em servidores fora do Brasil
                (especialmente nos Estados Unidos). Nesses casos, a transferência
                internacional se apoia nas salvaguardas contratuais e de segurança
                oferecidas por cada fornecedor, conforme os arts. 33 e seguintes da LGPD.
              </p>

              <h2>5. Cookies</h2>
              <p>
                Usamos cookies e identificadores do Google Analytics para medição de
                audiência. Você pode bloquear ou apagar cookies nas configurações do seu
                navegador — o site continua funcionando normalmente sem eles. O
                armazenamento local do navegador guarda apenas a sua preferência de tema,
                sem qualquer dado pessoal.
              </p>

              <h2>6. Por quanto tempo guardamos</h2>
              <p>
                As mensagens do formulário chegam até nós por e-mail e são mantidas pelo
                tempo necessário para conduzir a conversa comercial e cumprir obrigações
                legais. O site não mantém banco de dados próprio com os seus dados de
                contato. Os dados de navegação seguem os prazos de retenção configurados
                no Google Analytics.
              </p>

              <h2>7. Seus direitos</h2>
              <p>
                A LGPD (art. 18) garante a você, entre outros, o direito de confirmar se
                tratamos seus dados, acessá-los, corrigi-los, pedir anonimização ou
                eliminação, solicitar portabilidade, obter informação sobre
                compartilhamentos e revogar consentimento. Para exercer qualquer um desses
                direitos, envie um e-mail para{" "}
                <ObfuscatedContact value={CONTACT.email} kind="email" className="font-semibold" /> —
                respondemos em até 15 dias. Você também pode apresentar reclamação à
                Autoridade Nacional de Proteção de Dados (ANPD).
              </p>

              <h2>8. Segurança</h2>
              <p>
                Adotamos medidas técnicas e organizacionais proporcionais ao tratamento
                realizado: tráfego criptografado (HTTPS), validação e sanitização dos
                dados enviados pelo formulário, proteção anti-spam e acesso restrito às
                mensagens recebidas.
              </p>

              <h2>9. Alterações nesta política</h2>
              <p>
                Podemos atualizar esta política para refletir mudanças no site ou na
                legislação. A versão vigente fica sempre publicada nesta página, com a
                data de atualização no topo.
              </p>

              <h2>10. Contato</h2>
              <p>
                Dúvidas sobre esta política ou sobre o tratamento dos seus dados?{" "}
                <strong>{COMPANY.legalName}</strong> · CNPJ {COMPANY.cnpj} · São Paulo,
                Brasil ·{" "}
                <ObfuscatedContact value={CONTACT.email} kind="email" className="font-semibold" /> ·{" "}
                <ObfuscatedContact value={CONTACT.phone} kind="phone" className="font-semibold" />. Se
                preferir, use a <Link href="/contato">página de contato</Link>.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
