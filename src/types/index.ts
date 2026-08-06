/* ════════════════════════════════════════════
   Type definitions — firmino.dev
   ════════════════════════════════════════════ */

export interface KeyAchievement {
  value: string;
  label: string;
  desc: string;
}

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

export type ProjectType = "corporate" | "freelance" | "personal" | "oss";

export interface Project {
  slug: string;
  title: string;
  client: string;
  type: ProjectType;
  role: string;
  year: string;
  period: string;
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
  logo?: string;
  cover?: string;
  /** Hex color used to seed the gradient cover when `cover` is absent. */
  accent?: string;
}

export interface ClientBrand {
  name: string;
  logo?: string;
}

export interface PastClient {
  company: string;
  period: string;
  detail: string;
  logo?: string;
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

