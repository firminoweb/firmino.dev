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
yarn test               # testes da área do cliente
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
| Validação | `zod` v4 (API de contato, ferramentas MCP) |
| Banco (área do cliente) | **Neon** Postgres + **Drizzle ORM** (`drizzle-orm/neon-http`); migrações `drizzle-kit` em `drizzle/`. Em dev sem `DATABASE_URL`: **PGlite** em `.pglite/` |
| Testes | **Vitest** + PGlite em memória (`yarn test`, arquivos `src/**/*.test.ts`) |
| MCP | `mcp-handler` 2.x + `@modelcontextprotocol/server` 2.x (servidor em `/mcp`, sem sessão, sem Redis) |
| Imagens OG/sociais | `next/og` (`ImageResponse`) |
| PDF do currículo | `pdfkit` (script `build:cv`) |
| Qualidade | ESLint 9 (`eslint-config-next`), Lighthouse CI (`@lhci/cli`, performance mínima 0.9) |
| Gerenciador | **yarn** (nunca npm para instalar dependências) |

Instaladas mas **sem uso no código hoje**: `@next/third-parties` e `STRAPI_URL` (só em `next.config.ts`, para imagens remotas). Não assuma que existe CMS.

## Integrações

| Integração | Onde | Observações |
|---|---|---|
| **Google Analytics 4** | `src/app/layout.tsx`, `src/lib/analytics.ts` | Stub síncrono do `gtag` no `<head>` + `gtag.js` em `lazyOnload`. Use sempre `trackEvent()`; ele não faz nada sem GA (dev/bloqueado). |
| **Resend** (e-mail) | `src/app/api/contact/route.ts` | Envia o lead para `CONTACT_TO_EMAIL`. Sem `RESEND_API_KEY` só loga no console (dev). O e-mail mostra o canal (`channel`: form, webmcp ou api). |
| **IndexNow** (Bing e outros) | `scripts/indexnow.mjs`, `public/41ad4af2a450aca654dd4c9c55d18607.txt`, `.github/workflows/indexnow.yml` | Após cada deploy de produção da Vercel (evento `deployment_status`), avisa os buscadores das páginas principais + as com `lastmod` dos últimos 3 dias. A chave é pública por definição. |
| **WhatsApp** (wa.me) | `whatsappLink()` em `src/data/portfolio.ts`, `WhatsAppButton`, `WhatsAppFab` | Link com mensagem pré-preenchida; clique dispara `generate_lead`. |
| **Vercel** | hospedagem, `@vercel/speed-insights` no layout | |
| **Busca por IA e agentes** | `src/lib/markdown.ts`, `src/app/llms.txt/`, `src/app/md/[[...path]]/`, `src/app/robots.txt/`, `next.config.ts` | Ver seção "IA e agentes" abaixo. |
| **Área do cliente** | `src/app/cliente/`, `src/lib/portal/`, `src/db/` | Portal logado (cliente e admin). Ver seção "Área do cliente". |
| **Atribuição de leads** | `src/lib/attribution.ts` | Script inline no `<head>` guarda a origem da visita (host do referrer + página de entrada com UTMs) em `sessionStorage` (`firmino-touch`) e `localStorage` (`firmino-first-touch`, 90 dias). O formulário envia e a API escreve "Origem do contato" no e-mail. |

### Convenção de eventos GA

- `generate_lead` com `method: "form" | "whatsapp" | "webmcp"` e `source` (qual botão). É o evento de conversão (evento-chave no GA). Leads via MCP não passam pelo navegador e não geram evento no GA; aparecem só no e-mail ("Enviado por: Assistente de IA via conector MCP").
- `cta_click` para CTAs que não são lead (via `TrackedLink` / `TrackedExternalLink`).
- Não crie nomes de evento novos sem necessidade; reutilize esses com parâmetros.

## Mapa do projeto

```
content/
  agent-skills/*.md     Skills para agentes (frontmatter name = nome do arquivo, description)
  solucoes/*.mdx        Páginas por segmento (/solucoes/<slug>; ver "Soluções por segmento")
  blog/*.mdx            Posts (frontmatter: title, description, date, updated?, tags, author, cover)
  servicos/*.mdx        Página de detalhe de cada serviço (slug = SERVICES[].slug; frontmatter updated? opcional)
docs/superpowers/       Specs e planos de features (brainstorming/writing-plans)
public/                 Imagens, fontes, PDF do CV, assets sociais exportados
scripts/
  indexnow.mjs          Envia URLs ao IndexNow (roda no GitHub Actions após deploy)
  build-cv.ts           Gera o PDF do CV a partir de src/data/curriculo.ts
  export-social.mjs     Exporta PNGs de /social/* para public/social (precisa do app rodando)
  optimize-logos.mjs    Normaliza logos de clientes (96x96 WebP)
src/
  app/                  Rotas (App Router)
    page.tsx            Home (seções em components/home)
    servicos/, servicos/[slug]/   Lista e detalhe (MDX de content/servicos)
    solucoes/, solucoes/[slug]/   Soluções por segmento (MDX de content/solucoes)
    projetos/, projetos/[slug]/   Cases (dados em data/portfolio.ts)
    blog/, blog/[slug]/           Blog MDX
    como-trabalhamos/, sobre/, contato/, stack/, joao/, politica-de-privacidade/
    api/contact/route.ts          POST do formulário e da API pública (zod + honeypot + tempo mínimo + rate limit + Resend)
    api/health/route.ts           Status da API (dinâmico)
    openapi.json/, docs/api/      OpenAPI e documentação (Markdown) da API pública
    .well-known/api-catalog/      Catálogo de APIs (RFC 9727)
    .well-known/agent-skills/     index.json + <name>/SKILL.md (Agent Skills Discovery v0.2.0)
    .well-known/mcp/server-card.json/   MCP Server Card (SEP-1649)
    .well-known/ai-catalog.json/, ard.json/   Catálogo ARD (mesmo conteúdo nos dois caminhos)
    mcp/route.ts                  Servidor MCP (Streamable HTTP) com as 4 ferramentas
    social/avatar|banner/         Geração de imagens para redes sociais
    cliente/                      Área logada (noindex, Disallow): entrar, projetos, chamados, documentos, admin/
    area-do-cliente/, area-do-cliente/demo/   Página pública de venda e demo (estáticas)
    llms.txt/route.ts             Resumo do site em Markdown para IAs (gerado dos dados)
    md/[[...path]]/route.ts       Versão Markdown das páginas (alvo dos rewrites por Accept)
    robots.txt/route.ts           robots.txt com Content-Signal (route handler, não robots.ts)
    opengraph-image, twitter-image, icon, apple-icon, sitemap.ts
    layout.tsx          Fontes, tema, GA, atribuição, JSON-LD Organization/WebSite, WhatsAppFab
    globals.css         Tokens Tailwind v4, tema claro (padrão) e escuro (data-theme="dark")
  components/
    home/ layout/ blog/ projects/ forms/ ui/   (cada pasta exporta via index.ts)
    projects/CaseCard.tsx   Card de case reutilizado na home e nas soluções
    portal/                 ProjectDetailView (portal e demo), StatusBadge, form, SubmitButton, format
    home/Faq.tsx            Aceita `items`/`title` (padrão = FAQ da home) e gera o FAQPage
  data/                 Fonte da verdade do conteúdo estruturado
    portfolio.ts        NAV, SERVICES, PROJECTS (cases), STACK, CONTACT, COMPANY, whatsappLink()
    empresa.ts          Time, processo, modelos de contratação, garantias, HERO_TRUST, KNOWS_ABOUT, FAQ_ITEMS
    curriculo.ts        Dados da página /joao e do PDF do CV
  lib/
    analytics.ts        trackEvent()
    attribution.ts      Origem dos leads (script inline + classificação de canal)
    markdown.ts         llmsTxt(), pageMarkdown(), markdownPaths(): Markdown para IAs
    contact.ts          ContactSchema (zod) do POST /api/contact. Só servidor.
    contact-service.ts  submitContact(): validação, antispam, rate limit e e-mail. Usado por /api/contact e /mcp.
    agent-tools.ts      Nome, título e descrição das ferramentas + readablePath(). Sem zod (vai pro cliente).
    mcp.ts              MCP_SERVER (nome, versão, endpoint, descrição)
    ai-catalog.ts       mcpServerCard() e aiCatalog() (ARD)
    portal/             Área do cliente: auth (link mágico), access (leitura com isolamento), admin (ações), session (cookies), notify (e-mails), types, tokens
    contact-options.ts  PROJECT_TYPES, MIN_FILL_TIME_MS, LEAD_CHANNELS. Sem zod: pode ir pro cliente.
    api-docs.ts         openApiSpec() (gerado do ContactSchema) e apiDocsMd()
    webmcp.ts           Ferramentas WebMCP (carregado sob demanda por components/ui/WebMcpTools)
    agent-skills.ts     Leitura das skills de content/agent-skills + digest sha256
    api.ts              jsonResponse / errorResponse (padrão { success, data | error })
    blog.ts, servicos.ts, solucoes.ts, mdx-options.ts   Leitura e renderização de MDX
    seo.ts              SITE_URL, ORG_ID, OG images, breadcrumbJsonLd(), itemListJsonLd()
  db/                   schema.ts (Drizzle), index.ts (getDb: Neon ou PGlite), pglite.ts
  hooks/                useInView, useScrolled
  types/index.ts        Tipos compartilhados (Service, Project, etc.)
```

Alias de import: `@/*` → `src/*`.

## Soluções por segmento

- Arquivo `content/solucoes/<slug>.mdx`, com o slug igual ao termo que o cliente busca (ex.: `sistema-para-advocacia`). O frontmatter tem `segment`, `title`, `headline` (o H1 vira `title: headline`), `description`, `icon`, `tags`, `cases`, `prova` (`setor` padrão | `capacidade`), `servicos`, `whatsapp` (mensagem pré-preenchida), `faq` (lista de `q`/`a`) e `updated?`. O corpo MDX traz as dores e o que construímos.
- **Regra: todo segmento tem case de cliente real em `cases`.** Se apontar para algo que não é case de cliente publicado (inclusive case de carreira), o build falha.
  - `prova: setor`: o case é do próprio segmento. A página diz "Quem já construiu isso com a gente", e o case ganha o botão "Soluções para <segmento>".
  - `prova: capacidade` (liberado pelo João em 2026-09-25): os cases são de outros setores, mas provam as peças que o segmento usa (ex.: Velana prova a cobrança automática de academias). A página diz "Já está funcionando em produção... nestes projetos de outros setores", e o case **não** ganha botão. **O texto nunca pode sugerir experiência no setor** (nada de "atendemos várias clínicas").
  - Cada página precisa de dores, soluções e FAQ realmente específicos do setor. Páginas quase iguais com o nome trocado são *doorway pages* e o Google pune. Faça no máximo 3 ou 4 por leva.
- **YAML do frontmatter:** texto sem aspas não pode ter "dois-pontos + espaço" (`gestão: matrícula`), senão o build quebra em `/md`. Reescreva a frase ou use aspas.
- Uma página nova entra sozinha em sitemap, `llms.txt`, Markdown (`/md/solucoes/...`), `/solucoes` (ItemList), JSON-LD `Service` com `audience` e FAQPage. As páginas dos cases citados ganham o botão "Soluções para <segmento>".
- GA: os botões usam `source`/`location` = `solucao-<slug>` (e `solucao-<slug>-final` no bloco final), para comparar os segmentos no `generate_lead` e no `cta_click`.
- No ar, prova por setor: advocacia (StartPrev), agências de viagem (Viaza/GoMilhas) e cobrança automática por Pix (Velana, Celcoin).
- No ar, prova por capacidade: clínicas e consultórios, academias e estúdios, escolas e cursos. As três linkam para a página de cobrança por Pix.
- **Cobrança por Pix é para pequeno negócio e autônomo, não "software para fintech"** (decisão do João em 2026-09-25). Ofertas simples: mensalidade automática, "agendou, pagou", venda no WhatsApp com Pix e painel financeiro. A firmino.dev não cria meio de pagamento: integra provedores regulados pelo Banco Central (Asaas, Mercado Pago, Efí...), e o dinheiro nunca passa por nós. Sem preço publicado (estimativa na conversa).
- `segment` aparece no meio de frases via `segmentInSentence()` (só a 1ª letra minúscula). Escreva-o com a capitalização de título ("Cobrança por Pix").
- Candidatos futuros: óticas (prova de setor, OpticusPRO); por capacidade: salões e estética, delivery e restaurantes, condomínios e associações. Valide a busca no Keyword Research do Bing Webmaster antes.

## Área do cliente

Spec: `docs/superpowers/specs/2026-09-25-area-do-cliente-design.md`. Objetivo: **vender mais** (transparência como diferencial); a demo pública mostra o portal ao prospect.

- **Rotas:** `/cliente/entrar` → e-mail → link (15 min, uso único) → `/cliente/entrar/confirmar` com botão **Entrar** (POST; o GET não consome o token porque scanners de e-mail abrem links sozinhos) → sessão de 30 dias no cookie `firmino_session` (`httpOnly`, `path=/cliente`). Cliente vê `/cliente/projetos/[id]` (cronograma, entregas, chamados, documentos e faturas). Admin em `/cliente/admin`.
- **Admin** = `role: admin` no banco **e** e-mail em `ADMIN_EMAILS` (o usuário admin é criado no primeiro login). Tirar o e-mail da variável tira o acesso.
- **Dados manuais:** o João atualiza tudo pelo admin. Não há integração com GitHub (descartada: [[feedback-simples-primeiro]] na memória).
- **Isolamento:** toda leitura do cliente passa por `lib/portal/access.ts`, que filtra pelo `client_id` da sessão; item de outra empresa responde 404. Toda ação de admin passa por `assertAdmin` (lib) e `requireAdmin` (página/Action). **Coberto por testes**; não crie leitura de `projects`, `tickets` ou `documents` fora desses módulos.
- **Arquivos:** PDF/PNG/JPG até 4 MB, guardados no Neon (`document_files`, `bytea`), baixados só por `/cliente/documentos/[id]` com `Cache-Control: private, no-store`. `serverActions.bodySizeLimit = 4.5mb` no `next.config.ts`.
- **E-mails** (`lib/portal/notify.ts`, Resend): link de acesso; novo chamado ou mensagem → equipe (`CONTACT_TO_EMAIL`); resposta, entrega nova e documento novo → pessoas ativas do cliente (checkbox "Avisar o cliente"). Sem `RESEND_API_KEY`, vai para o log (dev).
- **Performance:** a sessão só é lida dentro de `/cliente`; nada de middleware global. `/area-do-cliente` e a demo são estáticas.
- **Banco:** schema em `src/db/schema.ts`. Mudou o schema? `yarn db:generate` (gera SQL em `drizzle/`, que vai para o git) e `yarn db:migrate` (aplica no Neon usando a `DATABASE_URL` do `.env.local`). Produção usa o banco `firminodev` do projeto **reserveia** no Neon.
- **Rodar local sem credenciais:** sem `DATABASE_URL` o dev usa PGlite; para `yarn start` local use `PORTAL_PGLITE=1`. Links de acesso aparecem no terminal.
- **Demo:** `src/data/portal-demo.ts` usa o mesmo tipo `ProjectDetail` e o mesmo componente `ProjectDetailView` (`demo`), então muda junto com o portal.

## IA e agentes

- **`/llms.txt`**: resumo do site (empresa, especialidades, garantias, serviços, cases, FAQ, artigos), gerado por `llmsTxt()`.
- **Markdown por negociação de conteúdo**: requisição com `Accept: text/markdown` em `/`, `/como-trabalhamos`, `/servicos[/slug]`, `/solucoes[/slug]`, `/projetos[/slug]` e `/blog[/slug]` é reescrita (`beforeFiles` em `next.config.ts`, sem middleware) para `/md/...`, que devolve Markdown com `Vary: Accept` e `Link rel="canonical"` para a página HTML. Página nova com conteúdo relevante: adicionar em `pageMarkdown()`, `markdownPaths()` **e** em `MD_PAGES` no `next.config.ts` (os três precisam bater).
- **Link headers (RFC 8288)**: todas as páginas apontam para `/llms.txt` e `/sitemap.xml`; as que têm Markdown também têm `rel="alternate"; type="text/markdown"`.
- **robots.txt**: `Content-Signal: search=yes, ai-input=yes, ai-train=yes` (decisão do João em 2026-09-25: liberar tudo). O `MetadataRoute.Robots` não suporta essa diretiva, por isso é route handler.
- **JSON-LD**: Organization com `knowsAbout` (`KNOWS_ABOUT`) e `hasOfferCatalog`; `ItemList` em `/servicos` e `/projetos`; `Service.provider` aponta para `ORG_ID`.
- **WebMCP**: `<WebMcpTools />` no layout detecta `document.modelContext` (spec atual) ou `navigator.modelContext` (implementações antigas) e só então importa `lib/webmcp.ts`. Ferramentas: `listar_servicos`, `listar_cases`, `ler_pagina` (só caminhos com versão Markdown) e `solicitar_orcamento` (POST /api/contact com `channel: "webmcp"`, dispara `generate_lead` com `method: "webmcp"`). Suporta `registerTool` e, como fallback, `provideContext`.
- **API pública**: só o `POST /api/contact`. Publicada em `/.well-known/api-catalog` (RFC 9727, com `rel="api-catalog"` no Link header global), `/openapi.json` (gerado do `ContactSchema`, sem honeypot/atribuição/canal) e `/docs/api`. Campo novo no contato: atualizar `lib/contact.ts`; o OpenAPI acompanha sozinho, a tabela de `apiDocsMd()` não.
- **Agent Skills**: `/.well-known/agent-skills/index.json` lista as skills de `content/agent-skills/` com digest sha256 calculado no build. Hoje: `conhecer-firmino-dev` e `solicitar-orcamento-firmino-dev`.
- **Zod fora do cliente**: `lib/contact.ts` importa zod; código `"use client"` e `lib/webmcp.ts` importam só de `lib/contact-options.ts`.
- **Servidor MCP** (`/mcp`): as mesmas 4 ferramentas do WebMCP, com descrições compartilhadas via `lib/agent-tools.ts` (mudou uma, mudou nas duas). Leitura via `pageMarkdown()`. `solicitar_orcamento` chama `submitContact()` com `channel: "mcp"` e exige `pessoa_confirmou: true` (fora do navegador não existe clique de "enviar"). O rate limit usa um balde único `"mcp"`, porque o IP que chega é o do assistente (Anthropic, OpenAI), não o da pessoa. Sem login: qualquer um adiciona como conector.
- **Descoberta do MCP**: Server Card em `/.well-known/mcp/server-card.json` e ARD em `/.well-known/ai-catalog.json` (caminho que o isitagentready usa) e `/.well-known/ard.json` (caminho da spec ARD). O ARD lista o servidor MCP, o OpenAPI, as skills e o `llms.txt`, com `representativeQueries` em PT-BR. Os dois catálogos saem com `Access-Control-Allow-Origin: *`.
- **DNS-AID**: `_index._agents` e `_mcp._agents` (ver "Infraestrutura").
- **Teste do MCP**: cliente oficial `@modelcontextprotocol/sdk` (StreamableHTTPClientTransport) contra `localhost:3000/mcp`. Validação externa: `POST https://isitagentready.com/api/scan` com `{"url":"https://firmino.dev"}`.
- **Não implementado de propósito**: OAuth/OIDC, OAuth Protected Resource e auth.md. Pedir orçamento é público por natureza, e exigir login criaria atrito na conversão. Só faz sentido se existir uma área do cliente logada. Também não há `_a2a._agents` (não temos agente A2A).
- Teste: `curl -H "Accept: text/markdown" localhost:3000/servicos`, `curl localhost:3000/.well-known/api-catalog` e https://isitagentready.com (Cloudflare). WebMCP: Chromium com `document.modelContext` simulado via `addInitScript` (Playwright).

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

## Infraestrutura (domínio, DNS e e-mail)

Configurado fora do repositório. Mudou algo no painel? Atualize aqui.

| Item | Onde | Detalhes |
|---|---|---|
| Domínio `firmino.dev` | **Cloudflare Registrar** | Renovação e DS do DNSSEC gerenciados pela própria Cloudflare. |
| DNS | **Cloudflare** (`lakas`/`vita.ns.cloudflare.com`) | Raiz com registros A para a Vercel; `www` é CNAME para a Vercel. |
| Proxy Cloudflare | **Desligado (nuvem cinza) de propósito** | A Vercel já é o CDN. Com o proxy ligado, o bloqueio de robôs de IA e o robots.txt gerenciado da Cloudflare ("AI Crawl Control") podem sobrescrever o nosso `robots.txt` e bloquear ChatGPT/Perplexity. Não ligar sem revisar isso. |
| DNSSEC | **Ativo desde 2026-09-25** | DS `2371 13 2` publicado no `.dev`. **Desative o DNSSEC antes de trocar de provedor DNS ou de nameservers**, senão o domínio para de resolver. |
| Hospedagem | **Vercel** | Deploy automático a partir da `main`. |
| Firewall Vercel (WAF) | Regra de rate limit em `POST /api/contact` por IP | Complementa o limite em memória do código, que vale por instância. No Hobby cabe 1 regra de rate limit. Não inclua `/mcp` (uma conversa faz várias leituras seguidas; o MCP tem o balde próprio no código). |
| E-mail da empresa | **Proton Mail** | MX `mail`/`mailsec.protonmail.ch`, SPF `include:_spf.protonmail.ch`, DKIM `protonmail{,2,3}._domainkey`, DMARC `p=quarantine` (sem `rua`, ou seja, sem relatórios). |
| E-mail transacional | **Resend** | DKIM `resend._domainkey`; subdomínio `send.firmino.dev` (MX + SPF da Amazon SES) para o envio do formulário. |
| Google Search Console | TXT `google-site-verification` | Propriedade de domínio. |
| DNS-AID (`_agents`) | **`_index._agents` publicado desde 2026-09-25** | Registro `HTTPS 1 firmino.dev. alpn="h2" port="443"`, assinado pelo DNSSEC. É a porta de entrada da organização para agentes: aponta para o site, que publica api-catalog, Agent Skills, `llms.txt` e WebMCP. Só `h2`, porque a Vercel não anuncia HTTP/3 neste domínio. `_mcp._agents` aponta para o servidor `/mcp` (mesmo formato). **Não publique `_a2a._agents`** enquanto não existir um agente A2A de verdade. |

Conferir pelo terminal: `dig +short DS firmino.dev`, `dig +short TXT firmino.dev`, `dig +dnssec firmino.dev A @1.1.1.1` (flag `ad` = DNSSEC validando), `dig +dnssec HTTPS _index._agents.firmino.dev @1.1.1.1` (DNS-AID).

## Monitoramento de IA e SEO

| Ferramenta | Situação | Para quê |
|---|---|---|
| GA4, Aquisição de tráfego | Ativo | Canal "AI Assistant" = visitas vindas de ChatGPT, Perplexity etc. `generate_lead` deve estar marcado como evento-chave. |
| isitagentready.com (Cloudflare) | **60/100, nível 4** em 2026-09-25 (era 20 de manhã, 40 depois do Markdown), antes do DNS-AID | Prontidão para agentes. Pendentes de propósito: OAuth/OIDC, OAuth Protected Resource, auth.md (API pública, sem login), MCP Server Card e ARD (sem servidor MCP). |
| Google Search Console | Ativo | Indexação e desempenho (inclui AI Overviews). |
| Bing Webmaster Tools | Ativo desde 2026-09-25 (importado do Search Console) | Índice que alimenta ChatGPT Search e Copilot. Relatório "AI Performance" (beta) mostra citações em IA. IndexNow aparece no menu IndexNow. |

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
yarn indexnow         # avisa o IndexNow (--all = sitemap inteiro; ou passe URLs)
yarn test             # testes (Vitest + PGlite)
yarn db:generate      # gera migração a partir do schema
yarn db:migrate       # aplica migrações no Neon (DATABASE_URL do .env.local)
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
| `DATABASE_URL` | Neon da área do cliente (só servidor; nunca no repositório nem em print) |
| `ADMIN_EMAILS` | E-mails com acesso ao `/cliente/admin`, separados por vírgula |
| `PORTAL_PGLITE` | `1` força PGlite (teste local com `yarn start`) |
| `STRAPI_URL` | Opcional, libera imagens remotas de `/uploads/**` (sem uso atual) |
| `SOCIAL_BASE_URL` | Opcional, base do `export:social` |
