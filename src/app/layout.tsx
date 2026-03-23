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
  title: "firmino.dev — João Henrique Firmino | Senior Full-Stack Developer",
  description:
    "15+ anos criando aplicações web e mobile escaláveis. Especialista em Angular, React, Next.js, Node.js e AI-Driven Development com LLMOps e Generative AI.",
  keywords: [
    "Front-End",
    "Back-End",
    "Full-Stack Developer",
    "React",
    "Angular",
    "Next.js",
    "Node.js",
    "TypeScript",
    "AI-Driven Development",
    "LLMOps",
    "Micro-frontends",
    "São Paulo",
  ],
  authors: [{ name: "João Henrique Firmino" }],
  openGraph: {
    title: "firmino.dev — Senior Full-Stack Developer & Architect",
    description: "Soluções digitais que impulsionam negócios. 15+ anos de experiência em desenvolvimento web e mobile.",
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
