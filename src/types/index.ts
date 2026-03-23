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

export interface CaseMetric {
  value: string;
  label: string;
}

export interface Case {
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  metrics: CaseMetric[];
  bullets: string[];
  tags: string[];
}

export interface EarlierRole {
  company: string;
  role: string;
  period: string;
  detail: string;
}

export interface Stat {
  value: string;
  label: string;
  detail: string;
}

export interface Certification {
  name: string;
  issuer: string;
  icon: string;
}

export interface Education {
  degree: string;
  field: string;
  school: string;
  year: string;
}

export interface Language {
  lang: string;
  level: string;
  pct: number;
}

export interface Stack {
  [category: string]: string[];
}

/* ─── CMS types (Strapi-ready) ─── */

export interface CMSArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  tags?: string[];
}

export interface CMSProject {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  liveUrl?: string;
  repoUrl?: string;
}
