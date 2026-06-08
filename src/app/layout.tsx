import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { WhatsAppFab } from "@/components/ui";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0e2d" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('firmino-theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "firmino.dev - Engenharia de Software, Mobile & Generative AI",
    template: "%s · firmino.dev",
  },
  description:
    "Empresa de engenharia de software especializada em Angular, React, React Native, Next.js, Node.js e aplicações com Generative AI & LLM. 15+ anos entregando soluções escaláveis para empresas líderes.",
  keywords: [
    "Engenharia de Software",
    "Aplicações Web",
    "Empresa de Software",
    "React",
    "Angular",
    "React Native",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Generative AI",
    "LLM Applications",
    "AI-Driven Development",
    "Micro-frontends",
    "São Paulo",
    "empresa desenvolvimento software",
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
    title: "firmino.dev — Engenharia de Software, Mobile & Generative AI",
    description:
      "Desenvolvemos soluções digitais que transformam negócios. Angular, React, React Native, Next.js, Node.js e Generative AI & LLM Applications.",
    url: SITE_URL,
    siteName: "firmino.dev",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "firmino.dev — Engenharia de Software, Mobile & Generative AI",
    description:
      "Desenvolvemos soluções digitais que transformam negócios. Angular, React, React Native, Next.js, Node.js e Generative AI & LLM Applications.",
  },
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "firmino.dev",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description:
    "Empresa de engenharia de software especializada em Angular, React, React Native, Next.js, Node.js e Generative AI & LLM Applications.",
  slogan: "Construímos software. Reforçamos times.",
  foundingDate: "2009",
  knowsLanguage: ["pt-BR", "en"],
  founder: { "@type": "Person", name: "João Firmino" },
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
  sameAs: ["https://linkedin.com/in/firminoweb", "https://github.com/firminoweb"],
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
      </head>
      <body suppressHydrationWarning className="bg-bg text-text-main min-h-screen font-sans overflow-x-hidden">
        {children}
        <WhatsAppFab />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga-init" strategy="lazyOnload">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: true });`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
