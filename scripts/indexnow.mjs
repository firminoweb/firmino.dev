// Avisa Bing (e os demais buscadores do IndexNow: Yandex, Seznam, Naver...)
// que páginas do site mudaram. O Bing alimenta o ChatGPT Search e o Copilot,
// então isso acelera a chegada das mudanças nessas IAs.
//
//   yarn indexnow                 # páginas principais + as com lastmod recente
//   yarn indexnow --all           # todo o sitemap (primeiro envio)
//   yarn indexnow <url> [<url>]   # URLs específicas
//
// Roda sozinho após cada deploy de produção (.github/workflows/indexnow.yml).
// A chave é pública por definição: o arquivo public/<chave>.txt prova ao
// buscador que o envio vem do dono do domínio.

const KEY = "41ad4af2a450aca654dd4c9c55d18607";
const SITE = process.env.SITE_URL || "https://firmino.dev";
const RECENT_DAYS = 3;
// Mudam a cada deploy relevante e não têm lastmod no sitemap
const CORE_PATHS = ["/", "/servicos", "/projetos", "/como-trabalhamos", "/blog", "/llms.txt"];

async function sitemapEntries() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
    loc: block.match(/<loc>([^<]+)<\/loc>/)?.[1],
    lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
  }));
}

async function pickUrls(args) {
  const explicit = args.filter((a) => a.startsWith("http"));
  if (explicit.length) return explicit;

  const entries = await sitemapEntries();
  if (args.includes("--all")) return entries.map((e) => e.loc);

  const cutoff = Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000;
  const recent = entries.filter((e) => e.lastmod && Date.parse(e.lastmod) >= cutoff).map((e) => e.loc);
  return [...new Set([...CORE_PATHS.map((p) => `${SITE}${p}`), ...recent])];
}

const urlList = await pickUrls(process.argv.slice(2));
const { host } = new URL(SITE);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});

console.log(`IndexNow: HTTP ${res.status} para ${urlList.length} URL(s)`);
for (const u of urlList) console.log(`  ${u}`);
// 200 = ok, 202 = aceito (chave ainda em validação). Qualquer outro é erro.
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
