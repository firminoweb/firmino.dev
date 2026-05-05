import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://firmino.dev";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
  themeColor: "#0b0e2d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "firmino.dev — Engenharia de Software, Mobile & Generative AI",
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
  founder: { "@type": "Person", name: "João Firmino" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressCountry: "BR",
  },
  sameAs: ["https://linkedin.com/in/firminoweb", "https://github.com/firminoweb"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="bg-bg text-text-main min-h-screen font-sans overflow-x-hidden">
        {children}
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
      </body>
    </html>
  );
}
