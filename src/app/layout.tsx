import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "firmino.dev — Desenvolvimento Full-Stack, Mobile & Generative AI",
  description:
    "Empresa especializada em Angular, React, React Native, Next.js, Node.js e aplicações com Generative AI & LLM. 15+ anos entregando soluções escaláveis para empresas líderes.",
  keywords: [
    "Front-End",
    "Back-End",
    "Full-Stack Developer",
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
  authors: [{ name: "firmino.dev" }],
  openGraph: {
    title: "firmino.dev — Desenvolvimento Full-Stack, Mobile & Generative AI",
    description: "Desenvolvemos soluções digitais que transformam negócios. Angular, React, React Native, Next.js, Node.js e Generative AI & LLM Applications.",
    url: "https://firmino.dev",
    siteName: "firmino.dev",
    locale: "pt_BR",
    type: "website",
  },
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
      </body>
    </html>
  );
}
