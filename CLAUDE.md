# CLAUDE.md · firmino.dev

## ⚠️ Regras de trabalho (obrigatórias)

### 1. Toda feature ou fix nova começa na `main` atualizada

Sempre que for pedida uma feature nova, um fix ou qualquer mudança nova:

```bash
git switch main
git pull origin main          # puxa as últimas atualizações, se houver
git switch -c <tipo>/<nome>   # ex.: feat/origem-dos-leads, fix/form-mobile
```

- Se houver alterações não commitadas na branch atual, **pare e pergunte** antes de trocar de branch. Nunca descarte, faça stash nem mova trabalho sem autorização.
- Nomes de branch: `feat/...`, `fix/...`, `chore/...`, `content/...` em kebab-case (PT-BR ok).

### 2. Git: só o João faz `add`, `commit` e `push`

- **NUNCA** rodar `git add`, `git commit`, `git push` (nem `--amend`, `stash`, `reset`, `rebase`, `merge`). Isso é exclusivo do João.
- Criar branch (regra 1) e comandos de leitura (`status`, `diff`, `log`, `fetch`) estão liberados.
- Ao finalizar uma feature ou fix, **sempre** entregar uma sugestão de mensagem de commit no padrão do repositório (Conventional Commits, descrição em PT-BR):

  ```
  feat: registra origem da visita nos leads do formulário

  - captura referrer e UTMs na página de entrada (first/last touch)
  - envia a origem no e-mail do lead
  - atualiza política de privacidade
  ```

  Se a mudança tiver partes independentes, sugerir commits separados indicando os arquivos de cada um.

### 3. Tudo que for novo precisa ser registrado aqui

Ao adicionar um **módulo, lib, integração, variável de ambiente, script, rota ou tecnologia nova**, atualize a seção correspondente deste arquivo (Stack, Integrações, Mapa do projeto, Variáveis de ambiente ou Comandos) **na mesma branch**. Remoções também: se algo deixou de existir, tire daqui.

### 4. Antes de dar como pronto

```bash
npx tsc --noEmit -p .   # typecheck
yarn lint
yarn build              # build de produção
```

Informe o resultado real. Se algo não foi testado (ex.: envio real pelo Resend), diga isso.

---

## O que é o projeto

Site institucional da **firmino.dev** (J. H. FIRMINO & CIA LTDA, CNPJ 43.699.300/0001-13), empresa de desenvolvimento de software sob medida em São Paulo, atendendo todo o Brasil. O site é de **empresa, não portfólio pessoal**: o objetivo é gerar leads B2B (formulário e WhatsApp).

- **Público principal:** empresas digitalizando (do autônomo/pequeno negócio à grande operação).
- **Público secundário:** agências que precisam de reforço técnico (white label).
- **Serviços:** sites e sistemas web, apps mobile, manutenção, automações com IA, squad, reforço para agência, arquitetura/performance, tech leadership.
- Produção: https://firmino.dev (deploy na Vercel a partir da `main`).

## Stack

| Área | Tecnologia |
|---|---|
| Framework | **Next.js 16** (App Router, React Server Components, Turbopack) |
| UI | **React 19**, TypeScript (strict), `clsx` |
| Estilo | **Tailwind CSS v4** (tokens em `@theme` no `globals.css`, sem `tailwind.config`), `@tailwindcss/typography` |
| Conteúdo | MDX em `content/` via `next-mdx-remote` + `gray-matter` + `reading-time`, código com `rehype-pretty-code` + `shiki` |
| Validação | `zod` v4 (API de contato) |
| Imagens OG/sociais | `next/og` (`ImageResponse`) |
| PDF do currículo | `pdfkit` (script `build:cv`) |
| Qualidade | ESLint 9 (`eslint-config-next`), Lighthouse CI (`@lhci/cli`, performance mínima 0.9) |
| Gerenciador | **yarn** (nunca npm para instalar dependências) |

Instaladas mas **sem uso no código hoje**: `@next/third-parties` e `STRAPI_URL` (só em `next.config.ts`, para imagens remotas). Não assuma que existe CMS.

## Integrações

| Integração | Onde | Observações |
|---|---|---|
| **Google Analytics 4** | `src/app/layout.tsx`, `src/lib/analytics.ts` | Stub síncrono do `gtag` no `<head>` + `gtag.js` em `lazyOnload`. Use sempre `trackEvent()`; ele não faz nada sem GA (dev/bloqueado). |
| **Resend** (e-mail) | `src/app/api/contact/route.ts` | Envia o lead para `CONTACT_TO_EMAIL`. Sem `RESEND_API_KEY` só loga no console (dev). |
| **WhatsApp** (wa.me) | `whatsappLink()` em `src/data/portfolio.ts`, `WhatsAppButton`, `WhatsAppFab` | Link com mensagem pré-preenchida; clique dispara `generate_lead`. |
| **Vercel** | hospedagem, `@vercel/speed-insights` no layout | |
| **Busca por IA e agentes** | `src/lib/markdown.ts`, `src/app/llms.txt/`, `src/app/md/[[...path]]/`, `src/app/robots.txt/`, `next.config.ts` | Ver seção "IA e agentes" abaixo. |
| **Atribuição de leads** | `src/lib/attribution.ts` | Script inline no `<head>` guarda a origem da visita (host do referrer + página de entrada com UTMs) em `sessionStorage` (`firmino-touch`) e `localStorage` (`firmino-first-touch`, 90 dias). O formulário envia e a API escreve "Origem do contato" no e-mail. |

### Convenção de eventos GA

- `generate_lead` com `method: "form" | "whatsapp"` e `source` (qual botão). É o evento de conversão (evento-chave no GA).
- `cta_click` para CTAs que não são lead (via `TrackedLink` / `TrackedExternalLink`).
- Não crie nomes de evento novos sem necessidade; reutilize esses com parâmetros.

## Mapa do projeto

```
content/
  blog/*.mdx            Posts (frontmatter: title, description, date, updated?, tags, author, cover)
  servicos/*.mdx        Página de detalhe de cada serviço (slug = SERVICES[].slug; frontmatter updated? opcional)
docs/superpowers/       Specs e planos de features (brainstorming/writing-plans)
public/                 Imagens, fontes, PDF do CV, assets sociais exportados
scripts/
  build-cv.ts           Gera o PDF do CV a partir de src/data/curriculo.ts
  export-social.mjs     Exporta PNGs de /social/* para public/social (precisa do app rodando)
  optimize-logos.mjs    Normaliza logos de clientes (96x96 WebP)
src/
  app/                  Rotas (App Router)
    page.tsx            Home (seções em components/home)
    servicos/, servicos/[slug]/   Lista e detalhe (MDX de content/servicos)
    projetos/, projetos/[slug]/   Cases (dados em data/portfolio.ts)
    blog/, blog/[slug]/           Blog MDX
    como-trabalhamos/, sobre/, contato/, stack/, joao/, politica-de-privacidade/
    api/contact/route.ts          POST do formulário (zod + honeypot + tempo mínimo + rate limit + Resend)
    social/avatar|banner/         Geração de imagens para redes sociais
    llms.txt/route.ts             Resumo do site em Markdown para IAs (gerado dos dados)
    md/[[...path]]/route.ts       Versão Markdown das páginas (alvo dos rewrites por Accept)
    robots.txt/route.ts           robots.txt com Content-Signal (route handler, não robots.ts)
    opengraph-image, twitter-image, icon, apple-icon, sitemap.ts
    layout.tsx          Fontes, tema, GA, atribuição, JSON-LD Organization/WebSite, WhatsAppFab
    globals.css         Tokens Tailwind v4, tema claro (padrão) e escuro (data-theme="dark")
  components/
    home/ layout/ blog/ projects/ forms/ ui/   (cada pasta exporta via index.ts)
  data/                 Fonte da verdade do conteúdo estruturado
    portfolio.ts        NAV, SERVICES, PROJECTS (cases), STACK, CONTACT, COMPANY, whatsappLink()
    empresa.ts          Time, processo, modelos de contratação, garantias, HERO_TRUST, KNOWS_ABOUT, FAQ_ITEMS
    curriculo.ts        Dados da página /joao e do PDF do CV
  lib/
    analytics.ts        trackEvent()
    attribution.ts      Origem dos leads (script inline + classificação de canal)
    markdown.ts         llmsTxt(), pageMarkdown(), markdownPaths(): Markdown para IAs
    api.ts              jsonResponse / errorResponse (padrão { success, data | error })
    blog.ts, servicos.ts, mdx-options.ts   Leitura e renderização de MDX
    seo.ts              SITE_URL, ORG_ID, OG images, breadcrumbJsonLd(), itemListJsonLd()
  hooks/                useInView, useScrolled
  types/index.ts        Tipos compartilhados (Service, Project, etc.)
```

Alias de import: `@/*` → `src/*`.

## IA e agentes

- **`/llms.txt`**: resumo do site (empresa, especialidades, garantias, serviços, cases, FAQ, artigos), gerado por `llmsTxt()`.
- **Markdown por negociação de conteúdo**: requisição com `Accept: text/markdown` em `/`, `/como-trabalhamos`, `/servicos[/slug]`, `/projetos[/slug]` e `/blog[/slug]` é reescrita (`beforeFiles` em `next.config.ts`, sem middleware) para `/md/...`, que devolve Markdown com `Vary: Accept` e `Link rel="canonical"` para a página HTML. Página nova com conteúdo relevante: adicionar em `pageMarkdown()`, `markdownPaths()` **e** em `MD_PAGES` no `next.config.ts` (os três precisam bater).
- **Link headers (RFC 8288)**: todas as páginas apontam para `/llms.txt` e `/sitemap.xml`; as que têm Markdown também têm `rel="alternate"; type="text/markdown"`.
- **robots.txt**: `Content-Signal: search=yes, ai-input=yes, ai-train=yes` (decisão do João em 2026-09-25: liberar tudo). O `MetadataRoute.Robots` não suporta essa diretiva, por isso é route handler.
- **JSON-LD**: Organization com `knowsAbout` (`KNOWS_ABOUT`) e `hasOfferCatalog`; `ItemList` em `/servicos` e `/projetos`; `Service.provider` aponta para `ORG_ID`.
- **Não implementado de propósito**: OAuth/OIDC, API Catalog, MCP Server Card, auth.md, Agent Skills, WebMCP, ARD e DNS-AID. O site não expõe API nem ferramentas para agentes; só faz sentido se isso mudar.
- Teste: `curl -H "Accept: text/markdown" localhost:3000/servicos` e https://isitagentready.com (Cloudflare).

## Convenções de código

- Server Components por padrão; `"use client"` só onde há estado/eventos.
- Conteúdo e dados ficam em `src/data/` e `content/`, não espalhados em componentes.
- Cases: `draft: true` esconde; `kind: "cliente" | "carreira"`.
- Ao revisar de verdade um post ou serviço, preencha `updated: AAAA-MM-DD` no frontmatter. O sitemap só usa datas reais (nunca a hora do build); páginas sem data ficam sem `lastmod`.
- Títulos com quebra de linha: use `{" "}<br />`. Sem o espaço, robôs e IAs leem as palavras grudadas.
- Contato: e-mail e telefone exibidos via `ObfuscatedContact` (fora do HTML estático). O e-mail só aparece em texto puro no JSON-LD.
- Tema: claro é o padrão, escuro é opt-in pelo toggle (não segue o SO).
- Storage do navegador (`localStorage`/`sessionStorage`) sempre em `try/catch`. Qualquer dado novo guardado no navegador exige atualizar a Política de Privacidade.

## Performance

- `experimental.inlineCss` elimina CSS bloqueante; mantenha.
- Turbopack ignora `browserslist`; o JS legado reportado pelo Lighthouse vem do `react-dom` e não tem correção do nosso lado.
- **Não** adiar/remover GA nem trocar dado de analytics por pontos de Lighthouse. Variação de nota em lab é normal.
- Scripts que precisam rodar na entrada da página: inline no `<head>`, pequenos e síncronos (ver `THEME_INIT_SCRIPT` e `ATTRIBUTION_INIT_SCRIPT`).

## Copy e conteúdo (PT-BR)

- Português do Brasil com concordância correta. **Nunca usar travessão (— ou –)** em textos do site.
- Linguagem de vendas para PME, sem jargão técnico (nada de "MVP", "deploy" etc. para o cliente). SEO tem prioridade sobre posicionamento em labels.
- Serviços devem abranger do autônomo à grande operação; nada de "pra quem NÃO é" com tom elitista.
- Títulos de case = resultado de negócio (faturamento, tempo, custo, conversão, estabilidade); o resumo reforça o mesmo tema.
- Blog é só texto: não renderizar imagem de capa na listagem nem no topo do post.
- E-mails: `falecom@firmino.dev` é o da empresa (usar no site). `joao@` é pessoal. Nunca exibir Gmail.
- Depoimentos são reais.
- Ao mudar copy, mostrar opções antes de editar.

## Comandos

```bash
yarn dev              # desenvolvimento (http://localhost:3000)
yarn build            # build de produção
yarn start            # servir o build
yarn lint             # ESLint
yarn build:cv         # regenera public/cv-joao-firmino-full-stack.pdf
yarn export:social    # exporta imagens sociais (com yarn dev rodando)
yarn optimize:logos   # normaliza logos de clientes
yarn audit:lh         # Lighthouse CI (após yarn build)
```

## Variáveis de ambiente

Ver `.env.example`. Nunca commitar valores reais nele.

| Variável | Uso |
|---|---|
| `RESEND_API_KEY` | Envio do formulário (sem ela, só log) |
| `CONTACT_TO_EMAIL` | Destino dos leads (padrão `falecom@firmino.dev`) |
| `CONTACT_FROM_EMAIL` | Remetente (domínio verificado na Resend) |
| `NEXT_PUBLIC_GA_ID` | Measurement ID do GA4 (`G-...`) |
| `NEXT_PUBLIC_SITE_URL` | URL canônica (padrão `https://firmino.dev`) |
| `STRAPI_URL` | Opcional, libera imagens remotas de `/uploads/**` (sem uso atual) |
| `SOCIAL_BASE_URL` | Opcional, base do `export:social` |
