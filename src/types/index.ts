/* ════════════════════════════════════════════
   Type definitions — firmino.dev
   ════════════════════════════════════════════ */

export interface KeyAchievement {
  value: string;
  label: string;
  desc: string;
}

export interface Service {
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

