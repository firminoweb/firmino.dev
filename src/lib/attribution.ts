/* ════════════════════════════════════════════
   Lead attribution · firmino.dev
   Records where a visit came from (external
   referrer host + landing URL with its UTMs) so
   the contact form can send it along with the
   lead. Only the referrer HOST is kept, never
   the full URL, and nothing identifies the
   visitor.
   ════════════════════════════════════════════ */

/** One landing: l = path + query, r = external referrer host, t = epoch ms. */
export interface Touch {
  l: string;
  r: string;
  t: number;
}

export interface Attribution {
  /** First landing of this browser session (tab). */
  session?: Touch;
  /** First landing ever on this browser, kept for 90 days. */
  first?: Touch;
}

const SESSION_KEY = "firmino-touch";
const FIRST_KEY = "firmino-first-touch";
const FIRST_TTL_MS = 90 * 24 * 60 * 60 * 1000;

// Inline no <head>, síncrono e sem bundle: roda só em carregamento completo
// (a navegação client-side do Next não reexecuta), ou seja, exatamente na
// página de entrada, antes que a URL perca os UTMs.
export const ATTRIBUTION_INIT_SCRIPT = `(function(){try{var h='';try{h=document.referrer?new URL(document.referrer).hostname:'';}catch(e){}var n=function(x){return x.replace(/^www\\./,'');};if(h&&n(h)===n(location.hostname))h='';var s=JSON.stringify({l:(location.pathname+location.search).slice(0,300),r:h,t:Date.now()});if(!sessionStorage.getItem('${SESSION_KEY}'))sessionStorage.setItem('${SESSION_KEY}',s);var f=localStorage.getItem('${FIRST_KEY}');if(!f||Date.now()-JSON.parse(f).t>${FIRST_TTL_MS})localStorage.setItem('${FIRST_KEY}',s);}catch(e){}})();`;

function readTouch(storage: () => Storage, key: string): Touch | undefined {
  try {
    const raw = storage().getItem(key);
    return raw ? (JSON.parse(raw) as Touch) : undefined;
  } catch {
    return undefined;
  }
}

/** Client-only. Missing or blocked storage just yields an empty object. */
export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  return {
    session: readTouch(() => window.sessionStorage, SESSION_KEY),
    first: readTouch(() => window.localStorage, FIRST_KEY),
  };
}

/* ── Classificação (usada no servidor, ao montar o e-mail) ── */

const AI_HOSTS = [
  "chatgpt.com",
  "openai.com",
  "perplexity.ai",
  "gemini.google.com",
  "bard.google.com",
  "copilot.microsoft.com",
  "claude.ai",
  "deepseek.com",
  "meta.ai",
  "grok.com",
  "mistral.ai",
  "you.com",
  "poe.com",
];

const SEARCH_HOSTS = [
  "google.",
  "bing.com",
  "duckduckgo.com",
  "yahoo.",
  "ecosia.org",
  "search.brave.com",
  "yandex.",
];

const SOCIAL_HOSTS = [
  "facebook.com",
  "instagram.com",
  "linkedin.com",
  "lnkd.in",
  "t.co",
  "x.com",
  "twitter.com",
  "youtube.com",
  "tiktok.com",
  "threads.net",
  "reddit.com",
  "pinterest.",
  "whatsapp.com",
];

/** Matches "chatgpt.com" and its subdomains; "google." matches any Google TLD. */
function hostIn(host: string, list: string[]): boolean {
  return list.some((d) =>
    d.endsWith(".")
      ? host.startsWith(d) || host.includes(`.${d}`)
      : host === d || host.endsWith(`.${d}`),
  );
}

/** Human-readable channel for a touch, e.g. "Busca orgânica (google.com)". */
export function describeTouch(touch: Touch): string {
  const params = new URL(touch.l, "https://firmino.dev").searchParams;
  const utmSource = params.get("utm_source")?.toLowerCase();
  const host = touch.r.toLowerCase().replace(/^www\./, "");

  if (params.has("gclid") || params.has("gbraid") || params.has("wbraid")) {
    return "Anúncio Google Ads";
  }
  if (utmSource) {
    if (hostIn(utmSource, AI_HOSTS)) return `IA (${utmSource})`;
    const utm = [utmSource, params.get("utm_medium"), params.get("utm_campaign")]
      .filter(Boolean)
      .join(" / ");
    return `Link marcado (${utm})`;
  }
  if (params.has("fbclid")) return `Rede social (${host || "Facebook/Instagram"})`;
  if (!host) return "Direto (WhatsApp, app, favoritos ou endereço digitado)";
  if (hostIn(host, AI_HOSTS)) return `IA (${host})`;
  if (hostIn(host, SEARCH_HOSTS)) return `Busca orgânica (${host})`;
  if (hostIn(host, SOCIAL_HOSTS)) return `Rede social (${host})`;
  return `Outro site (${host})`;
}

/** Landing path without the query string, for display. */
export function landingPath(touch: Touch): string {
  return touch.l.split("?")[0] || "/";
}
