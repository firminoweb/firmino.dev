# firmino.dev: de portfólio para site de empresa

- **Data:** 2026-09-11
- **Status:** design aprovado pelo João, aguardando revisão desta spec
- **Abordagem escolhida:** B (limpeza dos vazamentos de portfólio + estrutura de empresa), visual atual mantido

## Contexto e problema

O site já fala na voz "nós", exibe razão social e CNPJ, tem schema `Organization`, `/projetos` só com clientes da empresa e serviços em linguagem de dono. Ainda assim, vários pontos fazem ele ser lido como portfólio de um desenvolvedor:

1. O hero mostra Itaú, Boticário, TOTVS e NTT sob "Quem já confia na gente", com métricas (+80%, -60%) que são da carreira do João como funcionário, não de clientes da firmino.dev. Contradiz a separação empresa x carreira que o resto do site respeita.
2. Tags de framework no hero e "Stack" no menu principal.
3. Seção inteira da home dedicada ao fundador (foto, 4 métricas de carreira, 12 logos de ex-empregadores).
4. `/joao` funciona como currículo (Baixar CV, LinkedIn/GitHub pessoais, e-mail pessoal), linkada no rodapé em "Empresa" e com prioridade de sitemap maior que `/sobre`.
5. Linguagem de freelancer: "Disponível" (hero) e "Disponível para novos projetos" (rodapé).
6. Cases descrevem "papel" (formato de CV) e destacam stack.
7. Metadata e OG técnicos; a imagem de compartilhamento ainda diz "que transformam negócios".
8. GitHub como canal de contato.

Além disso, falta ao site responder o que um comprador pergunta antes de assinar: como se contrata, quem faz o quê e o que fica garantido.

## Objetivo e critérios de sucesso

O visitante sai com a leitura "empresa de software com clientes, processo e garantias", e não "desenvolvedor com portfólio".

Critérios verificáveis:

- Nenhum logo ou métrica de ex-empregador aparece fora de `/joao` e das páginas de case de carreira.
- Nenhum link do site aponta para o PDF do CV.
- Nenhum nome de framework em H1/H2 das páginas comerciais nem no hero.
- Menu sem "Home" e "Stack"; `/como-trabalhamos` existe, está no menu e no sitemap.
- A home não tem seção dedicada ao fundador; ele aparece como credencial de uma linha.
- `yarn lint` e `yarn build` passam; zero travessões (U+2014 e U+2013) nos arquivos alterados.
- JSON-LD válido: `Organization` com `@id`, `AboutPage` na `/sobre` referenciando esse `@id`, `FAQPage` em sincronia com a FAQ visível.

## Decisões tomadas com o João

| Tema | Decisão |
|---|---|
| Presença pessoal | **Fundador, não candidato.** `/joao` vira perfil de fundador: bio, trajetória, cases de carreira, habilidades e formação ficam; saem "Baixar CV", CTAs de LinkedIn/GitHub pessoais e e-mail pessoal. O PDF segue no ar em URL direta, fora do índice. |
| Marca | Mantém **firmino.dev**. Rediscutir marca é outro projeto. |
| Time | **Estrutura por área, sem nomes.** Áreas concretas e em que fase cada uma entra; nenhum parceiro nomeado. |
| Abordagem | **B.** Limpeza + página "Como trabalhamos" + menu, home e `/sobre` reorganizados. Sem identidade visual nova. |
| Garantias extras | Entram: **sem multa por término planejado** (modelos mensais), **garantia de correção de 30 dias** após a entrega, **dados conforme a LGPD** (com acordo de tratamento quando necessário). **NDA** continua restrito ao serviço de agência. |

## Fora de escopo

- Nome da marca, logo, paleta, tipografia.
- Banners de LinkedIn/X (`src/app/social/*`).
- O PDF do CV e o script `scripts/build-cv.ts` (não podem mudar de comportamento).
- Renomear `src/data/portfolio.ts` ou o campo `role` do tipo `Project`.
- URLs existentes: nenhuma muda, nenhum redirect.
- Os CVs versionados na raiz do repo (`CV_Joao_Firmino_2026_Full.pdf`, `Profile.pdf`): apenas sinalizados ao João.

## Design

### 1. Estrutura e navegação

- **Menu:** Serviços · Cases · Como trabalhamos · Sobre · Blog · [Fale conosco].
  - "Home" sai (o logo leva à home).
  - "Projetos" vira rótulo **"Cases"**; URL `/projetos` mantida.
  - "Stack" sai do menu; `/stack` continua existindo, título "Tecnologias que usamos", linkada só no rodapé como "Tecnologias".
- **Rota nova:** `/como-trabalhamos`.
- **Rodapé:**
  - Coluna "Empresa": Sobre · Como trabalhamos · Cases · Blog · Contato · Tecnologias. Sai "João Firmino".
  - "Disponível para novos projetos" vira "Atendimento em todo o Brasil · resposta em até 24h úteis".
  - Frase de apresentação reescrita sem jargão (opções no roteiro de copy).
- **Menu mobile:** o bloco "Conecte-se" perde o GitHub.
- **Sitemap:** `/como-trabalhamos` com prioridade 0.8; `/joao` cai de 0.7 para 0.4.
- **`/joao`** só é linkada a partir de `/sobre` (e da página de case de carreira, que já aponta para ela).

### 2. Home

Nova ordem: Hero → Serviços → Como trabalhamos → Cases → Depoimentos → Quem faz → FAQ → CTA final.

- **Hero**
  - H1 "Construímos software. Reforçamos times." mantido.
  - `HERO_TAGS` sai. No lugar, linha com 3 garantias: *Contrato e nota fiscal · Código no seu nome · Resposta em 24h úteis*.
  - Botão secundário "Ver casos" vira "Ver cases".
  - Card de prova:
    - rótulo "Quem já confia na gente" vira **"Clientes atendidos"**;
    - logos derivados de `CLIENT_PROJECTS` (os que têm `logo`, até 6, na ordem de `PROJECTS`), em grade 3×2: hoje Viaza, Celcoin, OpticusPRO, StartPrev, Velana, PMERJ;
    - 2 métricas de clientes reais no lugar das de carreira (candidatas: "4 meses do início às duas lojas", StartPrev; "18 meses de portal no ar", PMERJ; escolha final no roteiro de copy);
    - selo "● Disponível" vira **"Desde 2024"**;
    - botão de WhatsApp mantido (`source="hero"`).
- **Serviços:** título "Como trabalhamos com você" muda para não colidir com a seção nova (opções no roteiro).
- **Como trabalhamos:** os 4 passos continuam, lidos de `PROCESS_STEPS`. Abaixo, faixa com os 4 modelos de contratação (de `ENGAGEMENT_MODELS`) e link "Ver como trabalhamos →". Linha da agência e CTAs atuais mantidos.
- **Cases:**
  - rótulo "Projetos em destaque" vira "Cases"; "Ver todos os projetos" vira "Ver todos os cases";
  - tags de stack saem do card;
  - `COMPANY_STATS` mantido.
- **Depoimentos:** sem mudança (são reais; não questionar).
- **Quem faz** (novo, substitui `Founder` e `Parceiros`):
  - as 4 áreas de `TEAM_AREAS`, cada uma com "quando entra";
  - credencial do fundador em uma linha com foto pequena: fundador e responsável técnico, 16+ anos em produtos de alta escala no Itaú, no Boticário e na TOTVS antes de fundar a empresa;
  - link para `/sobre`;
  - sem métricas de carreira e sem logos de ex-empregadores.
- **FAQ:** nova pergunta "Quem vai trabalhar no meu projeto?" (áreas + fundador como ponto de contato). `FAQ_JSON_LD` continua derivado de `FAQ_ITEMS`, então fica em sincronia.
- **CTA final (`AiCta`):** rótulo "Generative AI & LLM Applications" vira "Inteligência artificial".

### 3. Página `/como-trabalhamos`

Responde: como contrato, quem faz o quê, o que fica garantido.

1. **Hero:** SectionLabel, H1 e subtítulo (opções no roteiro).
2. **Modelos de contratação** (`ENGAGEMENT_MODELS`, 4 cards; cada um: pra quando serve, como é cobrado, links para os serviços):

   | Modelo | Pra quando | Cobrança | Serviços ligados |
   |---|---|---|---|
   | Projeto sob medida | Site, sistema, app ou automação com começo, meio e fim | Investimento definido após conversa e protótipo navegável. Prazos já publicados: site institucional 3 a 5 semanas; apps menores 6 a 8 semanas | aplicacoes-web-sob-medida, app-mobile-sob-medida, automacoes-com-ia, arquitetura-performance-qualidade |
   | Time dedicado mensal | Operação saindo da planilha ou de sistema antigo; evolução contínua | Mensal; ciclos de 2 semanas com demonstração; roadmap revisto | squad-empresa-digitalizando |
   | Plano de manutenção | Sistema ou app no ar, mesmo que feito por outro fornecedor | Valor fixo mensal, nota fiscal todo mês, relatório em linguagem de dono | manutencao-de-sistemas-web-e-aplicativos |
   | Reforço técnico e liderança | Agência ou time interno que precisa de sênior | Alocação mensal; white-label; NDA quando o cliente final exige. Liderança técnica por horas semanais | reforco-tecnico-agencia, tech-leadership-code-review |

3. **Etapas e quem participa** (`PROCESS_STEPS` com `areas`):
   - Conversa e diagnóstico: liderança técnica.
   - Plano combinado: liderança técnica + design de produto (quando há tela nova/protótipo).
   - Construção: liderança técnica + desenvolvimento, com design acompanhando.
   - Entrega e evolução: desenvolvimento + manutenção; marketing digital quando o produto precisa chegar ao cliente final.
   - Destaque: um ponto de contato só, do começo ao fim.
4. **Garantias** (`GUARANTEES`), só compromissos confirmados:
   1. Contrato e nota fiscal em todo projeto (empresa registrada, CNPJ).
   2. Código no seu repositório desde o primeiro dia; fica com você se a parceria acabar.
   3. Um ponto de contato só do nosso lado.
   4. Entrega a cada 2 semanas com demonstração, em projetos e no time mensal.
   5. Documentação para quem vier depois.
   6. Valor fixo nos planos mensais.
   7. Sem multa por término planejado nos modelos mensais.
   8. Correção de bugs sem custo por 30 dias após a entrega.
   9. Dados tratados conforme a LGPD, com acordo de tratamento de dados quando necessário.
5. **CTA:** "Quero uma proposta" (`TrackedLink`, `cta_click` com `location: "como_trabalhamos"`) e `WhatsAppButton` (`source="como_trabalhamos"`, que dispara `generate_lead`).

Metadata própria, `breadcrumbJsonLd` (Home → Como trabalhamos).

### 4. `/sobre`

- Remove o `PERSON_JSON_LD` (duplicava o `Person` da `/joao`). Entra `AboutPage` com `mainEntity: { "@id": ORG_ID }`.
- `openGraph.type`: `profile` vira `website`.
- "Rede de parceiros" vira "Quem faz", lendo `TEAM_AREAS`.
- Card do fundador mantido; texto final "Ver a trajetória completa e o currículo" vira "Conheça a trajetória do fundador".
- Princípio "AI-Driven com responsabilidade" vira "IA com responsabilidade".
- CTA "Ver projetos" vira "Ver cases".

### 5. `/joao`

- `src/data/curriculo.ts` ganha `PERSON.founderTitle = "Fundador e responsável técnico"`. **`PERSON.role`, `PERSON_SUMMARY`, `PERSON.email`, `PERSON.linkedin` e `PERSON.github` não mudam** (são lidos por `scripts/build-cv.ts`).
- Hero:
  - saem os botões LinkedIn, GitHub e "Baixar CV (PDF)" e o `ObfuscatedContact` com o e-mail pessoal;
  - ficam um link de texto discreto para o LinkedIn pessoal (`PERSON.linkedin`) e o CTA "Falar com a firmino.dev →" (`/contato`, `cta_click` com `location: "joao_hero"`);
  - a linha sob o nome exibe `founderTitle`.
- Metadata: título "João Firmino · Fundador da firmino.dev"; `jobTitle` do schema passa a `founderTitle`. `email` e `sameAs` do `Person` no JSON-LD permanecem (entidade para o Google).
- Seções Experiência, Cases de carreira, Antes disso, Habilidades técnicas e Formação mantidas.
- Novo bloco de CTA da empresa no final da página.
- `public/cv-joao-firmino-full-stack.pdf` permanece; `robots.ts` já o bloqueia.

### 6. Cases

- Nos 6 cases `kind: "cliente"`, o texto de `role` é reescrito como **o que entregamos**, em linguagem de negócio (ex.: "Plataforma de pagamentos Pix, painel e automação de saque"). Cases de carreira não mudam.
- Comentário do tipo `Project.role` documenta os dois sentidos (cliente: entrega; carreira: papel).
- `ProjectsExplorer` e `Cases` da home: tags de stack saem do card. A página de detalhe mantém a stack.
- `/projetos`: breadcrumb "Projetos" vira "Cases"; H1 e descrição revistos no roteiro. Detalhe: "← Voltar para projetos" vira "← Voltar para cases".
- Logo da Celcoin em `PROJECTS` passa de `celcoin.png` para `celcoin.webp` (arquivo já existe).

### 7. SEO, schema e compartilhamento

- `src/lib/seo.ts` exporta `ORG_ID = \`${SITE_URL}/#organization\``.
- `layout.tsx`:
  - `ORG_JSON_LD` ganha `"@id": ORG_ID` e descrição voltada a quem compra;
  - `WEBSITE_JSON_LD.publisher` passa a referenciar `{ "@id": ORG_ID }`;
  - `metadata.title.default`, `description`, `keywords`, `openGraph` e `twitter` reescritos para quem compra, sem lista de frameworks e sem "transformam negócios" (opções no roteiro).
- `opengraph-image.tsx`: headline passa a ser o H1 do site; `alt` de `opengraph-image.tsx` e `twitter-image.tsx` atualizados.
- `/servicos`: description e parágrafo do hero alinhados aos 4 modelos, com link para `/como-trabalhamos`; sai "Squad sênior plug-and-play".
- `/stack`: título "Tecnologias que usamos", SectionLabel "Tecnologias".

### 8. Contato

- Card do GitHub sai; entra card de WhatsApp (`WhatsAppButton`, `source="contato"`). Canais públicos: WhatsApp, LinkedIn (empresa), X.
- E-mail e telefone continuam ofuscados. Nenhum e-mail entra no JSON-LD da `Organization`.

## Unidades e arquivos

| Unidade | Responsabilidade | Consumidores |
|---|---|---|
| `src/data/empresa.ts` (novo) | `PROCESS_STEPS`, `ENGAGEMENT_MODELS`, `TEAM_AREAS`, `GUARANTEES` | Home (`ComoFunciona`, `QuemFaz`), `/como-trabalhamos`, `/sobre` |
| `src/types/index.ts` | Tipos `ProcessStep`, `EngagementModel`, `TeamArea`, `Guarantee` | `empresa.ts` |
| `src/components/home/QuemFaz.tsx` (novo) | Seção "Quem faz" da home | `app/page.tsx` |
| `src/app/como-trabalhamos/page.tsx` (novo) | Página nova | rota |
| `src/data/portfolio.ts` | `NAV_ITEMS` novo; remove `HERO_TAGS`, `FOUNDER_ACHIEVEMENTS`, `CLIENTS`, `PARTNER_AREAS`; `role` dos cases de cliente; logo Celcoin | vários |

Removidos: `src/components/home/Founder.tsx`, `src/components/home/Parceiros.tsx` (e exports em `index.ts`).

Alterados: `Hero.tsx`, `Services.tsx`, `ComoFunciona.tsx`, `Cases.tsx`, `Faq.tsx`, `AiCta.tsx`, `app/page.tsx`, `Navbar.tsx`, `Footer.tsx`, `ProjectsExplorer.tsx`, `app/layout.tsx`, `lib/seo.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `app/sobre/page.tsx`, `app/joao/page.tsx`, `data/curriculo.ts`, `app/projetos/page.tsx`, `app/projetos/[slug]/page.tsx`, `app/servicos/page.tsx`, `app/stack/page.tsx`, `app/contato/page.tsx`.

## Processo de copy

Antes de qualquer código, um **roteiro de copy** único com todos os textos novos ou alterados. Headlines, títulos de seção, taglines e metadata vêm com 2 ou 3 opções; o João escolhe e só então a implementação começa. Regras de copy do projeto valem integralmente:

- linguagem de vendas para PME, sem jargão (MVP, deploy, stack, squad) em H1/H2;
- SEO acima de posicionamento em labels e metadata;
- abranger do autônomo à grande operação, sem tom elitista;
- títulos de case = outcome de negócio;
- PT-BR com concordância correta e **nenhum travessão**.

## Verificação

1. `yarn lint` e `yarn build` sem erros (type-check + geração estática, incluindo `/como-trabalhamos` e sitemap).
2. `grep -rnP "[\x{2014}\x{2013}]"` nos arquivos alterados: zero.
3. Buscas de regressão: nenhum `cv-joao-firmino` em `src/` fora de `curriculo.ts` e `robots.ts`; nenhum "Disponível" em hero e rodapé; nenhum `/joao` no `Footer`; nenhum logo de ex-empregador em `components/home`.
4. JSON-LD do HTML gerado (home, `/sobre`, `/como-trabalhamos`, `/joao`) extraído e validado com `JSON.parse`; checar `@id` da `Organization` e a referência do `AboutPage`.
5. Conferência visual (dev server) de home, `/como-trabalhamos`, `/sobre`, `/joao`, `/contato` e `/projetos` em desktop e ~400px.
6. CV intacto: `git diff src/data/curriculo.ts` mostra apenas a adição de `founderTitle`. O `yarn build:cv` **não** é executado, para não regerar o PDF versionado.

## Restrições

- **Sem commit e sem push.** Tudo fica no working tree para o João revisar e commitar (inclusive esta spec).
- Eventos GA seguem a convenção: `generate_lead { method, source }` e `cta_click { location }`.
- yarn, não npm.
