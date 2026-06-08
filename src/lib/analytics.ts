/* ════════════════════════════════════════════
   Conversion tracking — firmino.dev
   Thin wrapper over GA4 (gtag). No-ops when GA
   isn't loaded (dev, blocked, or NEXT_PUBLIC_GA_ID
   absent), so call sites never need to guard.
   ════════════════════════════════════════════ */

export type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: EventParams) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params?: EventParams): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}
