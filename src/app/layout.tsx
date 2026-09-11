import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { WhatsAppFab } from "@/components/ui";
import { CONTACT, COMPANY } from "@/data/portfolio";
import { PERSON_ID } from "@/data/curriculo";
import { ORG_ID } from "@/lib/seo";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://firmino.dev";

const dmSans = DM_Sans({
  subsets: ["latin"],
  // Trimmed from 6 → 4 weights (dropped 300/800, previously only the wordmark)
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

// Light é o tema principal; dark é opt-in via toggle (não segue o SO).
// O ThemeToggle reescreve este meta quando o visitante escolhe dark.
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('firmino-theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`;

// Stub síncrono do gtag: precisa existir antes de qualquer clique para que
// trackEvent() enfileire no dataLayer enquanto o gtag.js (lazyOnload) não chega.
const GA_STUB_SCRIPT = GA_ID
  ? `window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:true});`
  : null;

const SITE_TITLE = "Desenvolvimento de sistemas, sites e apps sob medida · firmino.dev";
const SITE_DESCRIPTION =
  "Sites, sistemas, apps e automações com IA sob medida, do pequeno negócio à grande operação. Contrato, nota fiscal e código no seu nome. Atendimento em todo o Brasil.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · firmino.dev",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "desenvolvimento de sistemas sob medida",
    "empresa de desenvolvimento de software",
    "desenvolvimento de aplicativos",
    "criação de sites",
    "sistema sob medida",
    "aplicativo para empresa",
    "manutenção de sistemas",
    "automação com IA",
    "reforço técnico para agência",
    "São Paulo",
  ],
  authors: [{ name: "firmino.dev", url: SITE_URL }],
  creator: "firmino.dev",
  publisher: "firmino.dev",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "firmino.dev",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@firminodev",
    creator: "@firminodev",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "firmino.dev",
  legalName: COMPANY.legalName,
  taxID: COMPANY.cnpj,
  url: SITE_URL,
  // /apple-icon (180×180) — o Google exige logo ≥112px; /icon tem só 32px e /icon.png não existe
  logo: `${SITE_URL}/apple-icon`,
  description:
    "Empresa de desenvolvimento de software sob medida: sites, sistemas web, apps iOS e Android, automações com IA e manutenção, para empresas e agências de todo o Brasil.",
  slogan: "Construímos software. Reforçamos times.",
  // 2024: quando a empresa começou a atender cliente. Os 16+ anos são
  // do fundador e vivem no Person da /joao, não aqui.
  foundingDate: "2024",
  knowsLanguage: ["pt-BR", "en"],
  // @id aponta para o Person da /joao — sem isso o Google cria uma segunda
  // entidade "João Firmino" solta, desconectada do perfil.
  founder: {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "João Firmino",
    url: `${SITE_URL}/joao`,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  areaServed: { "@type": "Country", name: "Brasil" },
  telephone: "+5511970836907",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: "+5511970836907",
    areaServed: "BR",
    availableLanguage: ["Portuguese", "English"],
    url: `${SITE_URL}/contato`,
  },
  sameAs: [CONTACT.linkedin, CONTACT.github, CONTACT.twitter],
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "firmino.dev",
  alternateName: "firmino.dev · Desenvolvimento de software sob medida",
  url: SITE_URL,
  inLanguage: "pt-BR",
  publisher: { "@id": ORG_ID },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {GA_STUB_SCRIPT && (
          <script dangerouslySetInnerHTML={{ __html: GA_STUB_SCRIPT }} />
        )}
      </head>
      <body suppressHydrationWarning className="bg-bg text-text-main min-h-screen font-sans overflow-x-hidden">
        {children}
        <WhatsAppFab />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
        {GA_ID && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
