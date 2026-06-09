/**
 * Shared brand tokens + copy for the social-media image generators.
 * Mirrors the site design system (globals.css). Edit here to restyle every
 * social asset at once, then re-run `yarn export:social`.
 */

export const C = {
  // Background ramp (deep navy → indigo)
  bgA: "#090c26",
  bgB: "#0b0e2d",
  bgC: "#141a4a",
  glow1: "rgba(92,124,250,0.22)",
  glow2: "rgba(59,91,219,0.20)",

  // Foreground
  white: "#ffffff",
  accent: "#6d8cff",
  accentDeep: "#5c7cfa",
  muted: "#8e92b0",
  footer: "#737699",
  border: "#1e2145",

  // Avatar ramp
  navy1: "#0b0e2d",
  navy2: "#141a47",
  navy3: "#1d2570",
} as const;

export const COPY = {
  eyebrow: "Engenharia de Software · Web · Mobile · IA",
  hlLead: "Construímos",
  hlAccent: "software",
  hlTail: "que escala",
  subline: "Web · Mobile · Generative AI",
  footerLeft: "15+ anos · Itaú · Boticário · TOTVS · NTT Data",
  footerRight: "firmino.dev",
} as const;

export const bannerBackground =
  `radial-gradient(60% 80% at 80% 12%, ${C.glow1} 0%, transparent 58%),` +
  `radial-gradient(55% 70% at 8% 92%, ${C.glow2} 0%, transparent 55%),` +
  `linear-gradient(125deg, ${C.bgA} 0%, ${C.bgB} 45%, ${C.bgC} 100%)`;

export const avatarBackground =
  `radial-gradient(circle at 50% 36%, rgba(92,124,250,0.34) 0%, transparent 56%),` +
  `linear-gradient(140deg, ${C.navy1} 0%, ${C.navy2} 58%, ${C.navy3} 100%)`;
