/* ════════════════════════════════════════════
   Type definitions · firmino.dev
   ════════════════════════════════════════════ */

export interface Service {
  slug: string;
  icon: string;
  title: string;
  desc: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectLink {
  href: string;
  label: string;
}

/**
 * Dono da relação. "cliente" é contrato da firmino.dev e pode aparecer como
 * vitrine comercial; "carreira" é trabalho feito como funcionário e só aparece
 * na /joao, onde o contexto de emprego é explícito.
 */
export type ProjectKind = "cliente" | "carreira";

export interface Project {
  slug: string;
  title: string;
  client: string;
  kind: ProjectKind;
  /** Setor do cliente, exibido no card ("Fintech", "Óptica", "Governo"). */
  segment: string;
  /** Cliente: o que a firmino.dev entregou, em linguagem de negócio.
   *  Carreira: o papel do João no projeto. */
  role: string;
  /** Ano do projeto. Ausente nos cases de cliente: a firmino.dev não data
   *  trabalho de cliente. Presente nos de carreira, onde é currículo. */
  year?: string;
  period?: string;
  duration: string;
  location: string;
  summary: string;
  context: string[];
  challenge: string[];
  solution: string[];
  outcome: string[];
  highlights: string[];
  metrics: ProjectMetric[];
  stack: string[];
  links?: ProjectLink[];
  featured?: boolean;
  /** Rascunho: fica no repo mas não vai para listagem, sitemap nem rota. */
  draft?: boolean;
  logo?: string;
  cover?: string;
  /** Hex color used to seed the gradient cover when `cover` is absent. */
  accent?: string;
}

export interface Stat {
  value: string;
  label: string;
  detail: string;
}

export interface Stack {
  [category: string]: string[];
}

/* ── Currículo (/joao) ─────────────────────── */

export interface CareerRole {
  company: string;
  role: string;
  period: string;
  /** Marca a posição atual — usado no schema e no selo "atual". */
  current?: boolean;
  location?: string;
  highlights: string[];
  stack?: string[];
}

export interface EarlierRole {
  company: string;
  role: string;
  period: string;
  detail: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  location?: string;
}

export interface Language {
  name: string;
  level: string;
}

/* ── Empresa (home, /como-trabalhamos, /sobre) ── */

export type TeamAreaId = "lideranca" | "desenvolvimento" | "design" | "marketing";

export interface TeamArea {
  id: TeamAreaId;
  icon: string;
  title: string;
  desc: string;
  /** Em que momento do projeto a área entra. */
  entersWhen: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  /** Áreas que participam da etapa, na ordem de protagonismo. */
  areas: TeamAreaId[];
}

export interface EngagementModel {
  id: string;
  title: string;
  /** Resumo de 2 a 4 palavras, usado na faixa da home. */
  short: string;
  forWhen: string;
  billing: string;
  services: { slug: string; label: string }[];
}

export interface Guarantee {
  title: string;
  desc: string;
}

