# Site de empresa (firmino.dev) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fazer o firmino.dev ser lido como site de empresa (clientes, processo, garantias) e não como portfólio de desenvolvedor.

**Architecture:** Dados de operação da empresa ficam num arquivo novo (`src/data/empresa.ts`) consumido pela home, pela nova `/como-trabalhamos` e pela `/sobre`. As mudanças restantes são edições de copy, navegação, schema e remoção de blocos de carreira da vitrine. Nenhuma URL muda.

**Tech Stack:** Next.js 16 (App Router, geração estática), React 19, TypeScript, Tailwind v4, yarn.

**Spec:** `docs/superpowers/specs/2026-09-11-site-empresa-design.md`

## Global Constraints

- **Sem commit e sem push.** O João revisa e commita. Onde o fluxo padrão pediria commit, o passo é um checkpoint (`yarn lint` + `git diff --stat`).
- Copy em PT-BR com concordância correta e **nenhum travessão** (U+2014, U+2013).
- Sem jargão (MVP, deploy, stack, squad) em H1/H2 voltados ao comprador.
- Eventos GA: `generate_lead { method, source }` via `WhatsAppButton`; `cta_click { location, label? }` via `TrackedLink`/`TrackedExternalLink`.
- E-mail nunca entra no JSON-LD da `Organization`.
- `PERSON.role`, `PERSON_SUMMARY`, `PERSON.email`, `PERSON.linkedin`, `PERSON.github` não mudam (lidos por `scripts/build-cv.ts`). Não rodar `yarn build:cv`.
- Nenhuma URL existente muda; nenhum redirect.
- yarn, não npm.
- Copy escolhida pelo João: todas as opções **A** do roteiro (registradas nas tarefas abaixo).

## Arquivos

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `src/types/index.ts` | Modificar | Tipos `TeamAreaId`, `TeamArea`, `ProcessStep`, `EngagementModel`, `Guarantee`; doc de `Project.role`; remover `KeyAchievement`, `ClientBrand` |
| `src/data/empresa.ts` | Criar | `TEAM_AREAS`, `PROCESS_STEPS`, `ENGAGEMENT_MODELS`, `GUARANTEES`, `HERO_TRUST` |
| `src/lib/seo.ts` | Modificar | `ORG_ID` |
| `src/data/curriculo.ts` | Modificar | `PERSON.founderTitle` |
| `src/data/portfolio.ts` | Modificar | `NAV_ITEMS`; `role` dos cases de cliente; logo Celcoin; remover `HERO_TAGS`, `FOUNDER_ACHIEVEMENTS`, `CLIENTS`, `PARTNER_AREAS` |
| `src/components/layout/Footer.tsx`, `Navbar.tsx` | Modificar | Links, frase, selo, sem GitHub |
| `src/components/home/Hero.tsx` | Modificar | Prova com clientes reais |
| `src/components/home/Services.tsx`, `ComoFunciona.tsx`, `Cases.tsx`, `Faq.tsx`, `AiCta.tsx` | Modificar | Copy e dados compartilhados |
| `src/components/home/QuemFaz.tsx` | Criar | Seção "Quem faz" |
| `src/components/home/Founder.tsx`, `Parceiros.tsx` | Remover | Substituídos por `QuemFaz` |
| `src/components/home/index.ts`, `src/app/page.tsx` | Modificar | Exports e ordem |
| `src/app/como-trabalhamos/page.tsx` | Criar | Página nova |
| `src/app/sobre/page.tsx`, `src/app/joao/page.tsx` | Modificar | Empresa x fundador |
| `src/components/projects/ProjectsExplorer.tsx`, `src/app/projetos/page.tsx`, `src/app/projetos/[slug]/page.tsx` | Modificar | Cases |
| `src/app/layout.tsx`, `opengraph-image.tsx`, `twitter-image.tsx`, `sitemap.ts` | Modificar | SEO e schema |
| `src/app/servicos/page.tsx`, `src/app/stack/page.tsx`, `src/app/contato/page.tsx` | Modificar | Copy e canais |

Verificação de aceite: script temporário **não versionado** em `$SCRATCH/verify-empresa.mjs` (`$SCRATCH` = diretório de rascunho da sessão).

---

### Task 1: Script de aceite (falha antes da mudança)

**Files:**
- Create: `$SCRATCH/verify-empresa.mjs`

**Interfaces:**
- Consumes: HTML estático em `.next/server/app/<rota>.html` gerado por `yarn build`.
- Produces: `node $SCRATCH/verify-empresa.mjs <raiz>` imprime cada checagem e sai com código 1 se alguma falhar.

- [ ] **Step 1: Escrever o script**

```js
// Aceite do redesenho "site de empresa". Não versionado.
// Uso: node verify-empresa.mjs <raiz-do-projeto>   (depois de `yarn build`)
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? process.cwd();
const appDir = join(root, ".next/server/app");
const read = (route) => {
  const f = join(appDir, `${route}.html`);
  return existsSync(f) ? readFileSync(f, "utf8") : "";
};
const results = [];
const check = (name, fn) => {
  let ok = false;
  try { ok = Boolean(fn()); } catch (e) { ok = false; name += ` (erro: ${e.message})`; }
  results.push({ name, ok });
};

const pages = {
  home: read("index"),
  sobre: read("sobre"),
  joao: read("joao"),
  contato: read("contato"),
  projetos: read("projetos"),
  como: read("como-trabalhamos"),
  servicos: read("servicos"),
};
const noScripts = (h) => h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
const text = (h) => noScripts(h).replace(/<[^>]+>/g, " ");
const ld = (h) => [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
const first = (h, re) => (h.match(re) ?? [""])[0];
const nav = (h) => first(h, /<nav[\s\S]*?<\/nav>/);
const footer = (h) => first(h, /<footer[\s\S]*?<\/footer>/);
const hero = (h) => first(h, /<section id="home"[\s\S]*?<\/section>/);

const CAREER_LOGOS = ["itau", "oboticario", "totvs", "nttdata", "santander", "vivo", "walmart", "uol", "reclameaqui", "viajanet", "gpa"];
const hasCareerLogo = (h) => CAREER_LOGOS.some((n) => new RegExp(`logos(/|%2F)${n}\\.`, "i").test(h));

check("todas as páginas foram geradas", () => Object.values(pages).every((h) => h.length > 0));
check("home sem logo de ex-empregador", () => !hasCareerLogo(pages.home));
check("hero sem tags de framework", () => !/Angular|React Native|LLM Applications|Generative AI/.test(text(hero(pages.home))));
check("hero mostra 'Clientes atendidos'", () => text(hero(pages.home)).includes("Clientes atendidos"));
check("nenhuma página exibe 'Disponível'", () => Object.values(pages).every((h) => !/Dispon[ií]vel/.test(text(h))));
check("nenhuma página linka o PDF do CV", () => Object.values(pages).every((h) => !/cv-joao-firmino/.test(noScripts(h))));
check("menu tem /como-trabalhamos", () => nav(pages.home).includes('href="/como-trabalhamos"'));
check("menu sem Stack e sem Home", () => !nav(pages.home).includes('href="/stack"') && !/>Home</.test(nav(pages.home)));
check("rodapé sem /joao", () => !footer(pages.home).includes('href="/joao"'));
check("home sem bloco do fundador antigo", () => !/Quem está por trás|Marcas em que o fundador/.test(text(pages.home)));
check("home tem 'Quem cuida do'", () => text(pages.home).includes("Quem cuida do"));
check("JSON-LD de todas as páginas é válido", () => Object.values(pages).every((h) => ld(h).length >= 0));
check("Organization tem @id", () => ld(pages.home).some((d) => d["@type"] === "Organization" && String(d["@id"]).endsWith("/#organization")));
check("/sobre tem AboutPage apontando pra Organization", () => ld(pages.sobre).some((d) => d["@type"] === "AboutPage" && String(d.mainEntity?.["@id"]).endsWith("/#organization")));
check("/sobre sem Person duplicado", () => !ld(pages.sobre).some((d) => d["@type"] === "Person"));
check("FAQPage em sincronia com a FAQ visível", () => {
  const faq = ld(pages.home).find((d) => d["@type"] === "FAQPage");
  const visible = (pages.home.match(/class="faq-item/g) ?? []).length;
  return faq && faq.mainEntity.length === visible && faq.mainEntity.some((q) => q.name === "Quem vai trabalhar no meu projeto?");
});
check("contato sem GitHub", () => !/github\.com/.test(noScripts(pages.contato)));
check("contato tem WhatsApp", () => /wa\.me/.test(noScripts(pages.contato)));
check("/joao sem 'Baixar CV' e sem 'posição efetiva'", () => !/Baixar CV|posição efetiva/.test(text(pages.joao)));
check("/joao mostra 'Fundador e responsável técnico'", () => text(pages.joao).includes("Fundador e responsável técnico"));
check("título da home é o aprovado", () => pages.home.includes("<title>Desenvolvimento de sistemas, sites e apps sob medida · firmino.dev</title>"));
check("sem travessão no texto visível", () => Object.values(pages).every((h) => !/[\u2014\u2013]/.test(text(h))));
const sitemapFile = join(appDir, "sitemap.xml.body");
check("sitemap tem /como-trabalhamos", () => existsSync(sitemapFile) && readFileSync(sitemapFile, "utf8").includes("/como-trabalhamos"));

for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}`);
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} ok`);
process.exit(failed ? 1 : 0);
```

- [ ] **Step 2: Rodar contra o build atual e confirmar que falha**

Run: `yarn build && node $SCRATCH/verify-empresa.mjs .`
Expected: FAIL em quase tudo (home com logos de carreira, "Disponível", sem `/como-trabalhamos` etc.). Se `sitemap.xml.body` não existir, localizar o arquivo com `ls .next/server/app | grep -i sitemap` e ajustar `sitemapFile`.

---

### Task 2: Camada de dados

**Files:**
- Modify: `src/types/index.ts`
- Create: `src/data/empresa.ts`
- Modify: `src/lib/seo.ts`
- Modify: `src/data/curriculo.ts:24-37`
- Modify: `src/data/portfolio.ts:20-27` (NAV_ITEMS)

**Interfaces:**
- Produces:
  - `TeamAreaId = "lideranca" | "desenvolvimento" | "design" | "marketing"`
  - `TEAM_AREAS: TeamArea[]` (`id, icon, title, desc, entersWhen`)
  - `PROCESS_STEPS: ProcessStep[]` (`num, title, desc, areas: TeamAreaId[]`)
  - `ENGAGEMENT_MODELS: EngagementModel[]` (`id, title, short, forWhen, billing, services: {slug,label}[]`)
  - `GUARANTEES: Guarantee[]` (`title, desc`)
  - `HERO_TRUST: string[]`
  - `ORG_ID: string` (`${SITE_URL}/#organization`)
  - `PERSON.founderTitle: "Fundador e responsável técnico"`

- [ ] **Step 1: Tipos.** Em `src/types/index.ts`, trocar a linha `role: string;` de `Project` por:

```ts
  /** Cliente: o que a firmino.dev entregou, em linguagem de negócio.
   *  Carreira: o papel do João no projeto. */
  role: string;
```

E acrescentar ao fim do arquivo:

```ts

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
```

- [ ] **Step 2: Criar `src/data/empresa.ts`**

```ts
import type { TeamArea, ProcessStep, EngagementModel, Guarantee } from "@/types";

/* ════════════════════════════════════════════
   Como a empresa opera · firmino.dev
   Fonte da home (Como trabalhamos, Quem faz),
   da /como-trabalhamos e da /sobre.
   Só entra aqui compromisso confirmado pelo
   João: nada de garantia inventada.
   ════════════════════════════════════════════ */

/**
 * Estrutura por área, sem nomes de propósito: fora a liderança técnica, são
 * profissionais e estúdios parceiros acionados por projeto, não quadro fixo.
 */
export const TEAM_AREAS: TeamArea[] = [
  {
    id: "lideranca",
    icon: "◈",
    title: "Liderança técnica",
    desc: "Conduz o projeto do diagnóstico à entrega: define a arquitetura, revisa o que vai pro ar e é o seu ponto de contato.",
    entersWhen: "Do primeiro contato à entrega",
  },
  {
    id: "desenvolvimento",
    icon: "◆",
    title: "Desenvolvimento",
    desc: "Especialistas em sites, sistemas, apps e integrações, acionados conforme o tamanho e a tecnologia do projeto.",
    entersWhen: "Na construção e na evolução",
  },
  {
    id: "design",
    icon: "◎",
    title: "Design de produto",
    desc: "Pesquisa, fluxo e telas pra quando o projeto precisa ser desenhado e validado antes do código.",
    entersWhen: "No plano e no protótipo",
  },
  {
    id: "marketing",
    icon: "⏣",
    title: "Marketing digital",
    desc: "Aquisição, conteúdo e performance pra quando o que foi construído precisa chegar ao cliente final.",
    entersWhen: "Na entrega, quando o projeto pede",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    title: "Conversa e diagnóstico",
    desc: "Você conta o que precisa pelo WhatsApp ou pelo formulário. A gente entende a sua operação, aponta o caminho e devolve uma estimativa de investimento e prazo. Sem custo e sem compromisso.",
    areas: ["lideranca"],
  },
  {
    num: "02",
    title: "Plano combinado",
    desc: "Antes de começar, definimos juntos o escopo, o cronograma e por onde faz mais sentido começar. Você aprova o plano já sabendo onde quer chegar.",
    areas: ["lideranca", "design"],
  },
  {
    num: "03",
    title: "Construção com entregas frequentes",
    desc: "A gente constrói em ciclos curtos, com algo funcionando cedo pra você acompanhar de perto. A cada quinzena você vê o que andou e ajusta a prioridade do que vem.",
    areas: ["lideranca", "desenvolvimento", "design"],
  },
  {
    num: "04",
    title: "Entrega, evolução e suporte",
    desc: "O sistema entra no ar e continua evoluindo junto com a sua operação. O código é seu, fica no seu repositório, e a gente segue dando suporte e melhorando conforme o uso real mostra o que importa.",
    areas: ["lideranca", "desenvolvimento", "marketing"],
  },
];

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: "projeto",
    title: "Projeto sob medida",
    short: "Começo, meio e fim",
    forWhen: "Site, sistema, app ou automação com começo, meio e fim.",
    billing:
      "Investimento definido depois da conversa inicial e do protótipo navegável. Um site institucional sai em 3 a 5 semanas; apps menores, em 6 a 8.",
    services: [
      { slug: "aplicacoes-web-sob-medida", label: "Sites e sistemas web" },
      { slug: "app-mobile-sob-medida", label: "Apps iOS e Android" },
      { slug: "automacoes-com-ia", label: "Automações com IA" },
      { slug: "arquitetura-performance-qualidade", label: "Performance e qualidade" },
    ],
  },
  {
    id: "time-mensal",
    title: "Time dedicado mensal",
    short: "Evolução contínua",
    forWhen:
      "Operação saindo da planilha, de ferramenta pronta ou de sistema antigo, que precisa evoluir sem parar.",
    billing:
      "Mensalidade, com entregas a cada 2 semanas, demonstração no fim de cada ciclo e roadmap revisto conforme o uso real.",
    services: [{ slug: "squad-empresa-digitalizando", label: "Time para empresa digitalizando" }],
  },
  {
    id: "manutencao",
    title: "Plano de manutenção",
    short: "Valor fixo mensal",
    forWhen: "Site, sistema ou app já no ar, mesmo que outra empresa tenha construído.",
    billing:
      "Valor fixo mensal, com nota fiscal todo mês e relatório do que foi feito em linguagem de dono.",
    services: [
      { slug: "manutencao-de-sistemas-web-e-aplicativos", label: "Manutenção de sistemas e apps" },
    ],
  },
  {
    id: "reforco",
    title: "Reforço técnico e liderança",
    short: "No seu time ou agência",
    forWhen:
      "Agência ou time interno que precisa de profissional sênior dentro do próprio processo.",
    billing:
      "Alocação mensal, com white-label e NDA quando o seu cliente exige. Liderança técnica é contratada por horas semanais.",
    services: [
      { slug: "reforco-tecnico-agencia", label: "Reforço técnico para agência" },
      { slug: "tech-leadership-code-review", label: "Liderança técnica" },
    ],
  },
];

export const GUARANTEES: Guarantee[] = [
  {
    title: "Contrato e nota fiscal",
    desc: "Empresa registrada no Brasil, com contrato e nota fiscal em todo projeto, do pequeno negócio à grande operação.",
  },
  {
    title: "Código no seu repositório",
    desc: "Desde o primeiro dia, o código fica no seu nome. Se a parceria acabar, ele continua com você.",
  },
  {
    title: "Um ponto de contato",
    desc: "Você fala com uma pessoa só do nosso lado, do começo ao fim. Menos ruído, decisão mais rápida.",
  },
  {
    title: "Entrega a cada 2 semanas",
    desc: "Em projetos e no time mensal, você vê o que andou numa demonstração a cada 2 semanas e ajusta a prioridade.",
  },
  {
    title: "Documentação pra quem vier depois",
    desc: "O que foi construído fica documentado pro seu time interno ou pra próxima empresa que for evoluir o sistema.",
  },
  {
    title: "Valor fixo nos planos mensais",
    desc: "Nos planos mensais, o valor é fixo e previsível: sem surpresa na fatura e sem orçamento novo a cada chamado.",
  },
  {
    title: "Sem multa por término",
    desc: "Nos modelos mensais, não há multa quando o término é planejado. Você fica porque o trabalho vale a pena.",
  },
  {
    title: "30 dias de garantia",
    desc: "Bug encontrado nos 30 dias depois da entrega é corrigido sem custo.",
  },
  {
    title: "Dados conforme a LGPD",
    desc: "Os dados do seu negócio são tratados conforme a LGPD, com acordo de tratamento de dados quando o projeto pede.",
  },
];

/** Recorte curto das garantias, exibido como linha de confiança no hero. */
export const HERO_TRUST = ["Contrato e nota fiscal", "Código no seu nome", "Resposta em 24h úteis"];
```

- [ ] **Step 3: `ORG_ID`.** Em `src/lib/seo.ts`, logo após `SITE_NAME`:

```ts
/** @id da Organization no grafo schema.org. Layout, /sobre, /joao e cases apontam pra ele. */
export const ORG_ID = `${SITE_URL}/#organization`;
```

- [ ] **Step 4: `founderTitle`.** Em `src/data/curriculo.ts`, dentro de `PERSON`, após `headline`:

```ts
  /** Título exibido no site. O `role` acima é o do CV (scripts/build-cv.ts). */
  founderTitle: "Fundador e responsável técnico",
```

- [ ] **Step 5: Menu.** Em `src/data/portfolio.ts`, substituir `NAV_ITEMS` por:

```ts
export const NAV_ITEMS: NavItem[] = [
  { label: "Serviços", href: "/servicos" },
  { label: "Cases", href: "/projetos" },
  { label: "Como trabalhamos", href: "/como-trabalhamos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
];
```

- [ ] **Step 6: Checkpoint.** Run: `yarn lint && yarn tsc --noEmit`. Expected: sem erros (tudo aditivo).

---

### Task 3: Rodapé e menu mobile

**Files:**
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/layout/Navbar.tsx:219-228` (link GitHub do drawer)

- [ ] **Step 1: Links da empresa.** Substituir `COMPANY_LINKS` por:

```ts
const COMPANY_LINKS: { label: string; href: string }[] = [
  { label: "Sobre", href: "/sobre" },
  { label: "Como trabalhamos", href: "/como-trabalhamos" },
  { label: "Cases", href: "/projetos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
  { label: "Tecnologias", href: "/stack" },
];
```

- [ ] **Step 2: Sem GitHub nas redes do rodapé.** Substituir `SOCIAL_LINKS` por:

```ts
const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "LinkedIn", href: CONTACT.linkedin },
  { label: "X", href: CONTACT.twitter },
];
```

- [ ] **Step 3: Frase de apresentação (opção 6A).** Trocar o texto do `<p>` sob o logo por:

```tsx
                Empresa de desenvolvimento de software sob medida: sites, sistemas, apps e IA para empresas e agências de todo o Brasil.
```

- [ ] **Step 4: Selo do rodapé.** Substituir o bloco `<div className="flex items-center gap-2">…Disponível para novos projetos…</div>` por:

```tsx
            <span className="text-xs text-text-darker">
              Atendimento em todo o Brasil · resposta em até 24h úteis
            </span>
```

- [ ] **Step 5: Drawer sem GitHub.** Em `Navbar.tsx`, remover o `<a href={CONTACT.github} …>GitHub</a>` e o `<span className="text-text-dim/40">·</span>` que o precede.

- [ ] **Step 6: Checkpoint.** Run: `yarn lint`. Expected: sem erros.

---

### Task 4: Hero com prova de clientes reais

**Files:**
- Modify: `src/components/home/Hero.tsx`

**Interfaces:**
- Consumes: `CLIENT_PROJECTS` (`portfolio.ts`), `HERO_TRUST` (`empresa.ts`).

- [ ] **Step 1: Imports e dados.** Substituir o topo do arquivo (imports, `PROOF_LOGOS`, `PROOF_METRICS`) por:

```tsx
import Image from "next/image";
import {
  Button,
  SectionLabel,
  WhatsAppButton,
  WhatsAppGlyph,
  TrackedLink,
} from "@/components/ui";
import { CLIENT_PROJECTS } from "@/data/portfolio";
import { HERO_TRUST } from "@/data/empresa";

// Só clientes da firmino.dev. As marcas da carreira do fundador ficam na /joao.
const PROOF_LOGOS = CLIENT_PROJECTS.filter((p) => p.logo)
  .slice(0, 6)
  .map((p) => ({ name: p.client, logo: p.logo as string }));

const PROOF_METRICS = [
  { value: "4 meses", label: "do início às duas lojas", sub: "StartPrev" },
  { value: "18 meses", label: "de portal no ar", sub: "PMERJ" },
];
```

- [ ] **Step 2: Linha de garantias no lugar das tags.** Substituir o `<div className="flex flex-wrap gap-2 mb-9">{HERO_TAGS.map…}</div>` por:

```tsx
          <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-9">
            {HERO_TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2 text-[13px] text-text-subtle font-medium">
                <span aria-hidden className="text-success">✓</span>
                {t}
              </li>
            ))}
          </ul>
```

- [ ] **Step 3: Botão secundário.** `Ver casos` → `Ver cases`.

- [ ] **Step 4: Selo do card.** Substituir o `<span …>…Disponível</span>` do topo do `ProofCard` por:

```tsx
        <span className="text-[11px] text-text-dim font-semibold">Desde 2024</span>
```

- [ ] **Step 5: Rótulo e grade de logos.** `Quem já confia na gente` → `Clientes atendidos`; `grid grid-cols-4 gap-2 mt-3` → `grid grid-cols-3 gap-2 mt-3`.

- [ ] **Step 6: Checkpoint.** Run: `yarn lint`. Expected: sem erros e sem import não usado (`Tag`, `HERO_TAGS` saíram).

---

### Task 5: Seções da home (Serviços, Como trabalhamos, Cases, FAQ, CTA)

**Files:**
- Modify: `src/components/home/Services.tsx`, `ComoFunciona.tsx`, `Cases.tsx`, `Faq.tsx`, `AiCta.tsx`

**Interfaces:**
- Consumes: `PROCESS_STEPS`, `ENGAGEMENT_MODELS` (`empresa.ts`).

- [ ] **Step 1: Serviços (opção 2A).** Substituir o `<h2>` por:

```tsx
            <h2 className="font-serif section-heading">
              O que fazemos pela <span className="text-accent-light italic">sua empresa</span>
            </h2>
```

- [ ] **Step 2: ComoFunciona com dados compartilhados.** Remover `interface Step` e `const STEPS`; importar `import { PROCESS_STEPS, ENGAGEMENT_MODELS } from "@/data/empresa";`; trocar `STEPS.map` por `PROCESS_STEPS.map`; `SectionLabel` `Como funciona` → `Como trabalhamos`. Entre o grid dos passos e o `<Reveal delay={0.1}>` final, inserir:

```tsx
        <Reveal delay={0.05}>
          <div className="gc mt-10 px-6 py-6 sm:px-8">
            <p className="text-[11px] text-text-darker tracking-[1.5px] uppercase font-medium mb-4">
              Quatro jeitos de contratar
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {ENGAGEMENT_MODELS.map((m) => (
                <div key={m.id} className="metric-box !text-left !px-4 !py-3">
                  <div className="text-[14px] font-bold text-brand tracking-tight">{m.title}</div>
                  <div className="text-[11.5px] text-text-dim mt-0.5">{m.short}</div>
                </div>
              ))}
            </div>
            <TrackedLink
              href="/como-trabalhamos"
              event="cta_click"
              eventParams={{ location: "como_funciona", label: "como_trabalhamos" }}
              className="inline-block mt-5 text-[13px] text-accent-light hover:text-accent transition-colors font-medium"
            >
              Ver como trabalhamos →
            </TrackedLink>
          </div>
        </Reveal>
```

- [ ] **Step 3: Cases da home.** `SectionLabel` `Projetos em destaque` → `Cases`; `Ver todos os projetos →` → `Ver todos os cases →`; remover o bloco `<div className="px-5 sm:px-7 pt-3 pb-6 flex flex-wrap gap-1.5">{p.stack…}</div>`; no bloco de métricas, `pb-4` → `pb-6`.

- [ ] **Step 4: FAQ.** Em `FAQ_ITEMS`, depois de "Já tenho um sistema ou uma agência…", inserir:

```ts
  {
    q: "Quem vai trabalhar no meu projeto?",
    a: "O fundador, João Firmino, conduz a parte técnica e é o seu ponto de contato do começo ao fim. Conforme o projeto pede, entram especialistas parceiros em desenvolvimento, design de produto e marketing digital. Você não paga por estrutura que o seu caso não precisa.",
  },
```

- [ ] **Step 5: CTA final.** `SectionLabel` `Generative AI & LLM Applications` → `Inteligência artificial`.

- [ ] **Step 6: Checkpoint.** Run: `yarn lint`. Expected: sem erros.

---

### Task 6: "Quem faz" no lugar de Founder e Parceiros

**Files:**
- Create: `src/components/home/QuemFaz.tsx`
- Delete: `src/components/home/Founder.tsx`, `src/components/home/Parceiros.tsx`
- Modify: `src/components/home/index.ts`, `src/app/page.tsx`

**Interfaces:**
- Consumes: `TEAM_AREAS`, `PERSON.photo|name|shortName|founderTitle`.
- Produces: `export function QuemFaz()`.

- [ ] **Step 1: Criar `QuemFaz.tsx` (título 3A)**

```tsx
import Image from "next/image";
import { Reveal, SectionLabel, Button } from "@/components/ui";
import { TEAM_AREAS } from "@/data/empresa";
import { PERSON } from "@/data/curriculo";

/**
 * Quem faz o projeto: estrutura por área e uma credencial curta do fundador.
 * Substitui os antigos "Quem está por trás" e "Rede de parceiros". Números e
 * logos da carreira do João ficam só na /joao, onde o contexto de emprego é
 * explícito.
 */
export function QuemFaz() {
  return (
    <section className="section-padding">
      <div className="content-container max-w-[1000px]">
        <Reveal>
          <div className="text-center mb-10">
            <SectionLabel center>Quem faz</SectionLabel>
            <h2 className="font-serif section-heading !leading-[1.14]">
              Quem cuida do <span className="text-accent-light italic">seu projeto</span>
            </h2>
            <p className="text-[15px] text-text-dim leading-[1.8] max-w-[560px] mx-auto mt-5">
              Cada projeto recebe as áreas que ele pede, com profissionais e estúdios parceiros
              pelo Brasil. Você não paga por estrutura que o seu caso não precisa.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEAM_AREAS.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.06} className="h-full">
              <div className="gc py-7 px-6 h-full flex flex-col">
                <div className="service-icon">{a.icon}</div>
                <h3 className="text-[16px] font-bold text-text-light mb-2 tracking-tight">
                  {a.title}
                </h3>
                <p className="text-[13.5px] text-text-dim leading-[1.7] flex-1">{a.desc}</p>
                <p className="text-[11.5px] text-accent-light font-semibold mt-4">{a.entersWhen}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="gc mt-4 py-6 px-6 sm:px-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <Image
              src={PERSON.photo}
              alt={`Foto de ${PERSON.name}`}
              width={400}
              height={400}
              className="w-[64px] h-[64px] rounded-full object-cover border border-border-subtle shrink-0"
            />
            <p className="text-[14px] text-text-dim leading-[1.7] flex-1">
              <strong className="text-text-light">
                {PERSON.shortName}, {PERSON.founderTitle.toLowerCase()}.
              </strong>{" "}
              Mais de 16 anos construindo produtos de alta escala no Itaú, no Boticário e na TOTVS
              antes de fundar a empresa.
            </p>
            <Button href="/sobre" variant="ghost" className="shrink-0">
              Conheça a firmino.dev →
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Exports.** Em `src/components/home/index.ts`, remover as linhas de `Founder` e `Parceiros` e acrescentar `export { QuemFaz } from "./QuemFaz";`.

- [ ] **Step 3: Ordem da home.** Em `src/app/page.tsx`, trocar `Founder, Parceiros` por `QuemFaz` no import e o `<main>` por:

```tsx
        <main>
          <Hero />
          <Services />
          <ComoFunciona />
          <Cases />
          <Testimonials />
          <QuemFaz />
          <Faq />
          <AiCta />
        </main>
```

- [ ] **Step 4: Apagar os componentes antigos.** Run: `rm src/components/home/Founder.tsx src/components/home/Parceiros.tsx` (só no working tree; o índice do git fica com o João).

- [ ] **Step 5: Checkpoint.** Run: `yarn lint && yarn tsc --noEmit`. Expected: sem erros.

---

### Task 7: Página `/como-trabalhamos`

**Files:**
- Create: `src/app/como-trabalhamos/page.tsx`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `ENGAGEMENT_MODELS`, `PROCESS_STEPS`, `TEAM_AREAS`, `GUARANTEES`, `COMPANY`, `breadcrumbJsonLd`.

- [ ] **Step 1: Criar a página (H1 4A)**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer, Background } from "@/components/layout";
import {
  Reveal,
  SectionLabel,
  Tag,
  JsonLd,
  TrackedLink,
  WhatsAppButton,
  WhatsAppGlyph,
} from "@/components/ui";
import { ENGAGEMENT_MODELS, PROCESS_STEPS, TEAM_AREAS, GUARANTEES } from "@/data/empresa";
import { COMPANY } from "@/data/portfolio";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { TeamAreaId } from "@/types";

const TITLE = "Como trabalhamos · firmino.dev";
const DESCRIPTION =
  "Como contratar a firmino.dev: projeto sob medida, time mensal, plano de manutenção ou reforço técnico. Quem participa de cada etapa e o que fica garantido em contrato.";

export const metadata: Metadata = {
  title: "Como trabalhamos",
  description: DESCRIPTION,
  alternates: { canonical: "/como-trabalhamos" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/como-trabalhamos",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const AREA_TITLE = Object.fromEntries(TEAM_AREAS.map((a) => [a.id, a.title])) as Record<
  TeamAreaId,
  string
>;

const HEADING = "font-serif section-heading !text-[clamp(26px,3.4vw,38px)] !leading-[1.18]";

export default function ComoTrabalhamosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Como trabalhamos", path: "/como-trabalhamos" },
        ])}
      />
      <Background />
      <Navbar />
      <div className="relative z-[1]">
        <section className="page-hero !min-h-[46vh] !pb-10">
          <div className="content-container w-full max-w-[1080px]">
            <SectionLabel>Como contratar</SectionLabel>
            <h1 className="font-serif hero-heading !text-[clamp(40px,5vw,58px)] !leading-[1.06] mb-5">
              Sem surpresa,<br />
              <span className="text-accent-light italic">do contrato à entrega</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8] max-w-[640px]">
              Como contratar, quem trabalha no seu projeto e o que fica garantido em contrato. Tudo
              claro antes de começar.
            </p>
          </div>
        </section>

        {/* Modelos de contratação */}
        <section className="section-padding !pt-6">
          <div className="content-container max-w-[1080px]">
            <Reveal>
              <div className="mb-8">
                <SectionLabel>Modelos de contratação</SectionLabel>
                <h2 className={HEADING}>
                  Quatro jeitos de <span className="text-accent-light italic">contratar</span>
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
              {ENGAGEMENT_MODELS.map((m, i) => (
                <Reveal key={m.id} delay={i * 0.05} className="h-full">
                  <div className="gc py-8 px-7 sm:px-9 h-full flex flex-col relative overflow-hidden">
                    <div className="glow-line-top" />
                    <h3 className="text-[20px] font-bold text-text-light tracking-tight mb-4">
                      {m.title}
                    </h3>
                    <dl className="flex flex-col gap-4 mb-6">
                      <div>
                        <dt className="text-[11px] uppercase tracking-[1.5px] font-semibold text-accent-light mb-1">
                          Pra quando
                        </dt>
                        <dd className="text-[14px] text-text-dim leading-[1.7]">{m.forWhen}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] uppercase tracking-[1.5px] font-semibold text-accent-light mb-1">
                          Como é cobrado
                        </dt>
                        <dd className="text-[14px] text-text-dim leading-[1.7]">{m.billing}</dd>
                      </div>
                    </dl>
                    <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2">
                      {m.services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/servicos/${s.slug}`}
                          className="text-[13px] text-accent-light hover:text-accent transition-colors font-medium"
                        >
                          {s.label} →
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Etapas e quem participa */}
        <section className="section-padding !pt-4">
          <div className="content-container max-w-[1080px]">
            <Reveal>
              <div className="mb-8">
                <SectionLabel>Etapas</SectionLabel>
                <h2 className={HEADING}>
                  Quem participa de <span className="text-accent-light italic">cada etapa</span>
                </h2>
                <p className="text-[15px] text-text-dim leading-[1.8] max-w-[640px] mt-4">
                  Você tem um ponto de contato só, do começo ao fim: a liderança técnica. As outras
                  áreas entram quando a etapa pede.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
              {PROCESS_STEPS.map((s, i) => (
                <Reveal key={s.num} delay={i * 0.06} className="h-full">
                  <div className="gc py-8 px-6 h-full flex flex-col relative overflow-hidden">
                    <div className="glow-line-top" />
                    <div className="font-serif text-[30px] font-medium text-accent-light leading-none tracking-tight mb-4">
                      {s.num}
                    </div>
                    <h3 className="text-[16px] font-bold text-text-light mb-2.5 tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-[13.5px] text-text-dim leading-[1.7] flex-1">{s.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-border-card">
                      {s.areas.map((id) => (
                        <Tag key={id}>{AREA_TITLE[id]}</Tag>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <div className="gc mt-4 py-6 px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {TEAM_AREAS.map((a) => (
                  <div key={a.id}>
                    <div className="text-[14px] font-bold text-text-light tracking-tight">
                      {a.title}
                    </div>
                    <p className="text-[13px] text-text-dim leading-[1.65] mt-1">{a.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Garantias */}
        <section className="section-padding !pt-4">
          <div className="content-container max-w-[1080px]">
            <Reveal>
              <div className="mb-8">
                <SectionLabel>Garantias</SectionLabel>
                <h2 className={HEADING}>
                  O que fica <span className="text-accent-light italic">garantido</span>
                </h2>
                <p className="text-[15px] text-text-dim leading-[1.8] max-w-[640px] mt-4">
                  Compromissos que valem pra todo cliente e ficam no contrato. {COMPANY.legalName} ·
                  CNPJ {COMPANY.cnpj}.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GUARANTEES.map((g, i) => (
                <Reveal key={g.title} delay={i * 0.04} className="h-full">
                  <div className="gc py-6 px-6 h-full flex items-start gap-3">
                    <span aria-hidden className="text-success text-[15px] leading-[1.5]">
                      ✓
                    </span>
                    <div>
                      <h3 className="text-[15px] font-bold text-text-light tracking-tight mb-1.5">
                        {g.title}
                      </h3>
                      <p className="text-[13.5px] text-text-dim leading-[1.7]">{g.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding !pt-4">
          <div className="content-container max-w-[920px]">
            <Reveal>
              <div className="gc py-10 px-6 sm:py-14 sm:px-12 text-center relative overflow-hidden">
                <div className="glow-line-top-cta" />
                <div className="cta-radial-overlay" />
                <div className="relative">
                  <h2 className="font-serif section-heading !text-[clamp(22px,3vw,34px)] !leading-[1.2] mb-4">
                    Qual modelo serve pro seu caso?
                  </h2>
                  <p className="text-[14px] text-text-dim leading-[1.7] max-w-[480px] mx-auto mb-7">
                    Conte o que você precisa. Na primeira conversa a gente indica o formato e
                    devolve uma estimativa de investimento e prazo, sem compromisso.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <TrackedLink
                      href="/contato"
                      event="cta_click"
                      eventParams={{ location: "como_trabalhamos", label: "proposta" }}
                      className="btn-primary inline-flex items-center justify-center"
                    >
                      Quero uma proposta →
                    </TrackedLink>
                    <WhatsAppButton
                      source="como_trabalhamos"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] bg-[#15803d] text-white font-semibold text-[14px] hover:bg-[#166534] transition-colors"
                    >
                      <WhatsAppGlyph className="w-[18px] h-[18px]" />
                      Falar no WhatsApp
                    </WhatsAppButton>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Sitemap.** Em `staticRoutes`, depois de `/servicos`, inserir `{ url: \`${SITE_URL}/como-trabalhamos\`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },` e trocar a prioridade de `/joao` de `0.7` para `0.4`.

- [ ] **Step 3: Checkpoint.** Run: `yarn lint && yarn tsc --noEmit`. Expected: sem erros.

---

### Task 8: `/sobre` centrada na empresa

**Files:**
- Modify: `src/app/sobre/page.tsx`

- [ ] **Step 1: Imports.** Trocar os imports de dados/SEO por:

```tsx
import { COMPANY_STATS } from "@/data/portfolio";
import { TEAM_AREAS } from "@/data/empresa";
import { PERSON } from "@/data/curriculo";
import { breadcrumbJsonLd, SITE_URL, ORG_ID } from "@/lib/seo";
```

- [ ] **Step 2: Schema.** `openGraph.type: "profile"` → `"website"`. Substituir `PERSON_JSON_LD` inteiro por:

```tsx
const ABOUT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: TITLE,
  url: `${SITE_URL}/sobre`,
  inLanguage: "pt-BR",
  // A Person vive na /joao; aqui a entidade principal é a empresa.
  mainEntity: { "@id": ORG_ID },
};
```

e no JSX `<JsonLd data={PERSON_JSON_LD} />` → `<JsonLd data={ABOUT_JSON_LD} />`.

- [ ] **Step 3: Princípio.** `title: "AI-Driven com responsabilidade"` → `title: "IA com responsabilidade"`.

- [ ] **Step 4: Card do fundador.** `{PERSON.role} · {PERSON.headline}` → `{PERSON.founderTitle}`; no parágrafo, `Ver a trajetória completa e o currículo.` → `Conheça a trajetória do fundador.`

- [ ] **Step 5: "Rede de parceiros" vira "Quem faz" (título 3A).** Substituir o conteúdo do `<Reveal>` da seção Parceiros por:

```tsx
              <div>
                <SectionLabel>Quem faz</SectionLabel>
                <h2 className="font-serif section-heading !text-[clamp(26px,3.4vw,38px)] !leading-[1.18] mb-5">
                  Quem cuida do <span className="text-accent-light italic">seu projeto</span>
                </h2>
                <p className="text-[15px] text-text-muted leading-[1.85] mb-7 max-w-[640px]">
                  Além do fundador, trabalhamos com profissionais e estúdios parceiros espalhados pelo Brasil. Cada projeto recebe as áreas que ele pede, sem o cliente pagar por estrutura que o caso não precisa.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TEAM_AREAS.map((a, i) => (
                    <Reveal key={a.id} delay={i * 0.06}>
                      <div className="gc py-7 px-6 h-full">
                        <div className="service-icon">{a.icon}</div>
                        <h3 className="text-[16px] font-bold text-text-light mb-2 tracking-tight">
                          {a.title}
                        </h3>
                        <p className="text-[13.5px] text-text-dim leading-[1.7]">{a.desc}</p>
                        <p className="text-[11.5px] text-accent-light font-semibold mt-3">{a.entersWhen}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
```

- [ ] **Step 6: CTA.** `Ver projetos` → `Ver cases`.

- [ ] **Step 7: Checkpoint.** Run: `yarn lint`. Expected: sem erros (`PERSON_ID` e `CONTACT` não são mais importados).

---

### Task 9: `/joao` como perfil de fundador

**Files:**
- Modify: `src/app/joao/page.tsx`

- [ ] **Step 1: Imports.** Na lista de `@/components/ui`, remover `ObfuscatedContact` e acrescentar `TrackedLink`. Em `@/lib/seo`, acrescentar `ORG_ID`.

- [ ] **Step 2: Metadata e schema.** `TITLE` → `"João Firmino · Fundador da firmino.dev"`. No `PROFILE_JSON_LD.mainEntity`: `jobTitle: PERSON.role` → `jobTitle: PERSON.founderTitle`; `worksFor` → `{ "@type": "Organization", "@id": ORG_ID, name: "firmino.dev", url: SITE_URL }`. `email` e `sameAs` ficam.

- [ ] **Step 3: Hero.** `{PERSON.role} · {PERSON.location}` → `{PERSON.founderTitle} · {PERSON.location}`. Substituir o `<div className="flex flex-wrap gap-2.5 mt-6">…</div>` (LinkedIn, GitHub, Baixar CV) **e** o `<ObfuscatedContact …/>` seguinte por:

```tsx
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-6">
                  <TrackedLink
                    href="/contato"
                    event="cta_click"
                    eventParams={{ location: "joao_hero", label: "contato" }}
                    className="btn-primary inline-flex items-center justify-center"
                  >
                    Falar com a firmino.dev →
                  </TrackedLink>
                  <TrackedExternalLink
                    href={PERSON.linkedin}
                    event="cta_click"
                    eventParams={{ location: "joao_hero", label: "linkedin" }}
                    className="text-[13.5px] text-text-dim hover:text-accent-light transition-colors"
                  >
                    LinkedIn ↗
                  </TrackedExternalLink>
                </div>
```

- [ ] **Step 4: Cases de carreira.** No parágrafo da seção, o link `projetos` vira `cases` (texto: `Os cases de clientes da firmino.dev estão em <Link>cases</Link>.`).

- [ ] **Step 5: Bloco "Cases detalhados".** Trocar título, texto e botão por:

```tsx
              <h2 className="font-serif text-[22px] sm:text-[26px] font-medium text-brand tracking-tight mb-3">
                Cases de clientes
              </h2>
              <p className="text-[14px] text-text-dim leading-[1.75] mb-6 max-w-[560px]">
                O que a firmino.dev entregou pra quem a contratou, com contexto, desafio, solução e resultado.
              </p>
              <Button href="/projetos" variant="ghost">
                Ver cases →
              </Button>
```

- [ ] **Step 6: CTA final (sem "posição efetiva").** Substituir o `<div className="relative">…</div>` do CTA por:

```tsx
                <div className="relative">
                  <h2 className="font-serif section-heading !text-[clamp(22px,3vw,34px)] !leading-[1.2] mb-4">
                    Quer esse cuidado <span className="text-accent-light italic">no seu projeto</span>?
                  </h2>
                  <p className="text-[14px] text-text-dim leading-[1.7] max-w-[500px] mx-auto mb-7">
                    Quem fala com você na firmino.dev é quem responde pela parte técnica. Conte o que você precisa.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <TrackedLink
                      href="/contato"
                      event="cta_click"
                      eventParams={{ location: "joao_cta", label: "contato" }}
                      className="btn-primary inline-flex items-center justify-center"
                    >
                      Falar com a firmino.dev →
                    </TrackedLink>
                    <Button href="/como-trabalhamos" variant="ghost">
                      Ver como trabalhamos
                    </Button>
                  </div>
                </div>
```

- [ ] **Step 7: Checkpoint.** Run: `yarn lint`. Expected: sem erros. Se `Link` ficar sem uso, removê-lo do import (ele continua usado na seção de cases de carreira).

---

### Task 10: Cases

**Files:**
- Modify: `src/data/portfolio.ts` (campos `role` dos 6 cases de cliente; `logo` da Celcoin)
- Modify: `src/components/projects/ProjectsExplorer.tsx`
- Modify: `src/app/projetos/page.tsx`
- Modify: `src/app/projetos/[slug]/page.tsx`

- [ ] **Step 1: "O que entregamos".** Em `PROJECTS`, trocar o `role` de cada case `kind: "cliente"`:

| slug | role novo |
|---|---|
| viaza-gomilhas-passagens-milhas | `Plataforma de venda de passagens para duas marcas` |
| celcoin-mybenk-banking-app | `App de banco digital, painel de gestão e integração bancária` |
| opticuspro-frontend-medicao-otica | `Base do produto web: estrutura e componentes` |
| startprev-app-acompanhamento-processos | `App iOS e Android com chat e notificações` |
| velana-plataforma-pagamentos | `Plataforma de pagamentos Pix, painel e saque automático` |
| portal-pmerj-sustentacao-features | `Sustentação do portal e atualização em tempo real` |

E no case Celcoin: `logo: "/images/logos/celcoin.png"` → `logo: "/images/logos/celcoin.webp"`.

- [ ] **Step 2: Cards sem stack.** Em `ProjectsExplorer.tsx`, remover o `<div className="flex flex-wrap gap-1.5">{p.stack.slice(0, 5)…}</div>` e trocar `mb-4` do `<p>` do summary por `mb-0`.

- [ ] **Step 3: `/projetos` (H1 5A).** `TITLE` → `"Cases · firmino.dev"`; `DESCRIPTION` → `"Cases de clientes da firmino.dev: plataforma de pagamentos, apps nas lojas, banking white-label, portal de governo e mais. O contexto, a decisão e o resultado de cada projeto."`; `metadata.title` → `"Cases"`; breadcrumb `Projetos` → `Cases`; `SectionLabel` → `Cases`; H1 e parágrafo:

```tsx
            <h1 className="font-serif hero-heading !text-[clamp(40px,5vw,58px)] !leading-[1.06] mb-5">
              O que entregamos<br />
              <span className="text-accent-light italic">pra quem nos contratou</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.8] max-w-[640px]">
              Fintech, viagens, jurídico, óptica e governo: o contexto, a decisão e o resultado de cada projeto.
            </p>
```

- [ ] **Step 4: Detalhe do case.** Em `[slug]/page.tsx`: breadcrumb `Projetos` → `Cases`; `← Voltar para projetos` → `← Voltar para cases`; no aviso de carreira, o link `projetos` → `cases`; `SectionLabel` `Próximos projetos` → `Outros cases`; no `projectJsonLd.author` de cliente, `{ "@type": "Organization", name: "firmino.dev", url: SITE_URL }` → `{ "@type": "Organization", "@id": ORG_ID, name: "firmino.dev", url: SITE_URL }` (importar `ORG_ID` de `@/lib/seo`).

- [ ] **Step 5: Checkpoint.** Run: `yarn lint`. Expected: sem erros.

---

### Task 11: SEO, schema e imagem de compartilhamento

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx`
- Modify: `src/app/servicos/page.tsx`, `src/app/stack/page.tsx`

- [ ] **Step 1: Metadata do site (título 7A).** Em `layout.tsx`, importar `import { ORG_ID } from "@/lib/seo";` e trocar:

```tsx
const SITE_TITLE = "Desenvolvimento de sistemas, sites e apps sob medida · firmino.dev";
const SITE_DESCRIPTION =
  "Sites, sistemas, apps e automações com IA sob medida, do pequeno negócio à grande operação. Contrato, nota fiscal e código no seu nome. Atendimento em todo o Brasil.";
```

(declarados antes de `metadata`) e, em `metadata`: `title.default: SITE_TITLE`; `description: SITE_DESCRIPTION`; `openGraph.title`/`twitter.title: SITE_TITLE`; `openGraph.description`/`twitter.description: SITE_DESCRIPTION`; `keywords`:

```tsx
  keywords: [
    "desenvolvimento de sistemas sob medida",
    "empresa de desenvolvimento de software",
    "desenvolvimento de aplicativos",
    "criação de sites",
    "sistema sob medida",
    "aplicativo para empresa",
    "manutenção de sistemas",
    "automação com IA",
    "reforço técnico para agência",
    "São Paulo",
  ],
```

- [ ] **Step 2: Organization e WebSite.** Em `ORG_JSON_LD`: acrescentar `"@id": ORG_ID,` logo após `"@type"`; `description` → `"Empresa de desenvolvimento de software sob medida: sites, sistemas web, apps iOS e Android, automações com IA e manutenção, para empresas e agências de todo o Brasil."`. Em `WEBSITE_JSON_LD`: `alternateName` → `"firmino.dev · Desenvolvimento de software sob medida"`; `publisher` → `{ "@id": ORG_ID }`.

- [ ] **Step 3: Imagem OG.** Em `opengraph-image.tsx`: `alt` → `"firmino.dev · Construímos software. Reforçamos times."`; substituir o bloco da headline (o `<div>` com `Desenvolvemos soluções…`) e a linha de frameworks por:

```tsx
          <div
            style={{
              fontSize: 76,
              fontWeight: 500,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: -2.5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Construímos software.</span>
            <span style={{ color: "#5c7cfa", fontStyle: "italic" }}>Reforçamos times.</span>
          </div>
          <div style={{ fontSize: 24, color: "#8e92b0", lineHeight: 1.4, maxWidth: 920 }}>
            Sites, sistemas, apps e automações com IA sob medida
          </div>
```

Em `twitter-image.tsx`: `alt` → `"firmino.dev · Construímos software. Reforçamos times."`.

- [ ] **Step 4: `/servicos`.** `DESCRIPTION` → `"Sites, sistemas, apps, automações com IA e manutenção sob medida para empresas, e reforço técnico para agências. Veja o que fazemos e como contratar."`. Parágrafo do hero e link:

```tsx
            <p className="text-base text-text-muted leading-[1.8] max-w-[640px]">
              Do site institucional à plataforma completa, do app nas lojas à automação com IA. Você contrata por projeto, por time mensal, por plano de manutenção ou como reforço do seu time, sempre com engenharia sênior e uma rede de parceiros em design e marketing digital.
            </p>
            <Link
              href="/como-trabalhamos"
              className="inline-block mt-4 text-[13.5px] text-accent-light hover:text-accent transition-colors font-medium"
            >
              Veja os modelos de contratação →
            </Link>
```

CTA final: `Ver projetos` → `Ver cases`.

- [ ] **Step 5: `/stack`.** `TITLE` → `"Tecnologias · firmino.dev"`; `metadata.title` → `"Tecnologias"`; breadcrumb `Stack` → `Tecnologias`; `SectionLabel` `Nossa Stack` → `Tecnologias`; H1 → `Tecnologias que <span className="text-accent-light italic">usamos</span>`.

- [ ] **Step 6: Checkpoint.** Run: `yarn lint && yarn tsc --noEmit`. Expected: sem erros.

---

### Task 12: Contato com WhatsApp no lugar do GitHub

**Files:**
- Modify: `src/app/contato/page.tsx`

- [ ] **Step 1: Canais públicos.** Remover o objeto GitHub de `PUBLIC_CHANNELS`. Importar `WhatsAppButton` e `WhatsAppGlyph` de `@/components/ui`.

- [ ] **Step 2: Card de WhatsApp.** Como primeiro filho do grid de canais públicos (antes do `PUBLIC_CHANNELS.map`), inserir:

```tsx
              <Reveal>
                <WhatsAppButton
                  source="contato"
                  className="gc case-card p-7 block relative overflow-hidden h-full"
                >
                  <div className="case-glow-line" />
                  <div className="flex items-start gap-4">
                    <div className="service-icon !mb-0">
                      <WhatsAppGlyph className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-[12px] uppercase tracking-[2px] font-semibold text-text-dim mb-2">
                        WhatsApp
                      </h2>
                      <p className="text-[16px] font-bold text-brand tracking-tight mb-1">Falar agora</p>
                      <p className="text-[12.5px] text-text-dark leading-[1.6]">
                        O jeito mais rápido de tirar uma dúvida
                      </p>
                    </div>
                    <span className="case-arrow">↗</span>
                  </div>
                </WhatsAppButton>
              </Reveal>
```

e no `.map` dos canais restantes, `delay={i * 0.06}` → `delay={(i + 1) * 0.06}`.

- [ ] **Step 3: Checkpoint.** Run: `yarn lint`. Expected: sem erros.

---

### Task 13: Limpeza e verificação final

**Files:**
- Modify: `src/data/portfolio.ts`, `src/types/index.ts`

- [ ] **Step 1: Remover dados sem uso.** Em `portfolio.ts`, apagar `HERO_TAGS`, `FOUNDER_ACHIEVEMENTS` (e o comentário acima), `CLIENTS` (e o comentário), `PARTNER_AREAS` (e o comentário); tirar `KeyAchievement` e `ClientBrand` do `import type`. Em `types/index.ts`, apagar `KeyAchievement` e `ClientBrand`.

- [ ] **Step 2: Nenhuma referência sobrando.** Run: `grep -rnE "HERO_TAGS|FOUNDER_ACHIEVEMENTS|PARTNER_AREAS|\bCLIENTS\b|KeyAchievement|ClientBrand|Founder\b|Parceiros" src`. Expected: nenhuma saída.

- [ ] **Step 3: Travessão.** Run: `git diff -U0 | grep -P "^\+.*[\x{2014}\x{2013}]"; grep -rnP "[\x{2014}\x{2013}]" src/data/empresa.ts src/components/home/QuemFaz.tsx src/app/como-trabalhamos docs/superpowers`. Expected: nenhuma saída.

- [ ] **Step 4: Build e aceite.** Run: `yarn lint && yarn build && node $SCRATCH/verify-empresa.mjs .`. Expected: build ok; `N/N ok`.

- [ ] **Step 5: CV intacto.** Run: `git diff src/data/curriculo.ts`. Expected: só a adição de `founderTitle`.

- [ ] **Step 6: Conferência visual.** Com `yarn start` rodando em background (porta 3000), capturar com o Chromium headless do Playwright já instalado:

```bash
SHELL_BIN=~/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell
for r in "" como-trabalhamos sobre joao contato projetos; do
  n=${r:-home}
  $SHELL_BIN --headless --hide-scrollbars --virtual-time-budget=6000 --window-size=1440,6000 --screenshot=$SCRATCH/shot-$n-desktop.png "http://localhost:3000/$r"
  $SHELL_BIN --headless --hide-scrollbars --virtual-time-budget=6000 --window-size=400,9000 --screenshot=$SCRATCH/shot-$n-mobile.png "http://localhost:3000/$r"
done
```

Olhar cada imagem: hero com 6 logos legíveis, faixa de modelos, "Quem faz", página nova sem overflow horizontal em 400px, `/joao` sem botões de CV. Abrir também `http://localhost:3000/opengraph-image` e conferir a headline.

- [ ] **Step 7: Encerrar.** Parar o `yarn start`. Resumo ao João com `git status --short` e `git diff --stat`. Sem commit.
