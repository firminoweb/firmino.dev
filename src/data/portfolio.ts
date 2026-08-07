import type {
  KeyAchievement,
  Service,
  Project,
  ProjectType,
  Stat,
  Stack,
  ClientBrand,
} from "@/types";

/* ════════════════════════════════════════════
   Portfolio data · firmino.dev
   Empresa de Engenharia de Software
   ════════════════════════════════════════════ */

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Stack", href: "/stack" },
  { label: "Blog", href: "/blog" },
];

export const HERO_TAGS = ["Angular", "React", "React Native", "Next.js", "Node.js", "Generative AI", "LLM Applications", "AI-Driven"];

export const KEY_ACHIEVEMENTS: KeyAchievement[] = [
  { value: "+80%", label: "Venda mobile", desc: "Mais conversão no celular: Eudora e Boticário" },
  { value: "-60%", label: "Site mais rápido", desc: "Tempo de carga nas plataformas do Itaú" },
  { value: "90%", label: "Sistema confiável", desc: "Bugs barrados antes do usuário, no Itaú" },
  { value: "-50%", label: "Tempo pra lançar", desc: "Releases em metade do tempo, no Boticário" },
];

export const SERVICES: Service[] = [
  { slug: "aplicacoes-web-sob-medida", icon: "◆", title: "Aplicações web sob medida pra sua empresa", desc: "Sites, sistemas e plataformas web pra sua empresa, desde site institucional pra pequeno negócio até plataforma completa com painel, sistema interno e integração. Rápido, estável, bonito e fácil de evoluir." },
  { slug: "app-mobile-sob-medida", icon: "◎", title: "App mobile sob medida pra sua empresa", desc: "App iOS e Android pra sua operação, do app simples pra pequena empresa até aplicação completa com integração ao seu sistema. Catálogo, pedido, fidelidade, campo, atendimento: o que fizer sentido pro seu caso. Publicado nas lojas e mantido por nós." },
  { slug: "manutencao-de-sistemas-web-e-aplicativos", icon: "⟳", title: "Manutenção de sistemas web e aplicativos", desc: "Tutela, monitoramento e manutenção mensal do seu site, sistema, SaaS ou app (Android e iOS). A gente vigia, atualiza e corrige antes de virar problema, mesmo que não tenha sido a gente que construiu. Você cuida do negócio; do sistema, cuidamos nós." },
  { slug: "automacoes-com-ia", icon: "⏣", title: "Aplicações e automações com IA", desc: "Chatbot que atende cliente, agente que processa documento, automação que tira tarefa chata do seu time. Conectado ao que você já usa: WhatsApp, planilha, sistema interno, CRM. Sem precisar virar empresa de tecnologia pra colher o resultado." },
  { slug: "squad-empresa-digitalizando", icon: "◈", title: "Squad para empresa digitalizando", desc: "Squad sênior dedicado em sprints. Para empresas tirando a operação do Excel, de uma ferramenta pronta que não atende mais ou de um sistema antigo que parou de evoluir. Você ganha time de produto sem montar time." },
  { slug: "reforco-tecnico-agencia", icon: "⬡", title: "Reforço técnico para agência", desc: "Sênior ou squad alocado no seu PM, no seu Jira, no seu cliente. Sem fricção comercial: você fatura, a gente entrega. Para agências que ganharam projeto maior que a banda do time." },
  { slug: "arquitetura-performance-qualidade", icon: "⬢", title: "Arquitetura, performance & qualidade", desc: "Micro-frontends com Module Federation, Design Systems, Clean Architecture, Lighthouse 90+, cobertura de testes acima de 80% e conformidade WCAG 2.1 AA." },
  { slug: "tech-leadership-code-review", icon: "◇", title: "Tech leadership & code review", desc: "Liderança técnica fracionada, padronização de squad, code review estratégico e definição de roadmap técnico. Para CTOs que precisam de sênior por trás sem contratar full-time." },
];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  corporate: "Corporativo",
  freelance: "Freelance",
  personal: "Pessoal",
  oss: "Open Source",
};

export const PROJECTS: Project[] = [
  {
    slug: "viaza-gomilhas-passagens-milhas",
    title: "Lançar a próxima marca sem refazer nada: Viaza e GoMilhas em um código só",
    client: "Viaza / GoMilhas",
    type: "freelance",
    kind: "cliente",
    segment: "Viagens",
    role: "Engenharia de plataforma · Web & PWA",
    year: "2024 a 2026",
    period: "Em andamento",
    duration: "Em andamento",
    location: "Remoto, Brasil",
    summary:
      "Plataforma whitelabel completa para venda de passagens com milhas: busca, checkout PIX e pós-venda. Viaza e GoMilhas rodam no mesmo repositório, com tema, conteúdo e regras de marca trocando em tempo real. A próxima marca entra adicionando um arquivo de configuração, sem time novo e sem retrabalho.",
    logo: "/images/logos/viaza.webp",
    accent: "#1f7aff",
    context: [
      "A operação roda duas marcas comerciais (Viaza e GoMilhas) atendendo públicos distintos com a mesma stack de busca, motor de tarifas e integração de gateway. O desafio era manter um único código capaz de comutar branding, rotas, conteúdo de CMS e tema em runtime conforme o domínio acessado.",
    ],
    challenge: [
      "Construir uma arquitetura whitelabel real: tema, logos, OG images, splash screens, rotas habilitadas e até copy de CMS variando por marca, sem hardcode espalhado pelo código. Tudo isso em cima de um stack moderno (Next 15 + React 19 + MUI 7) e mantendo PWA, SEO e conformidade com fluxos sensíveis de pagamento e autenticação.",
      "No fluxo de auth coexistem três abordagens (keycloak-js no client, NextAuth e BFF custom com cookie httpOnly), exigindo cuidado redobrado para não quebrar nenhum caminho de usuário em cada deploy.",
    ],
    solution: [
      "Implementamos resolução de marca em duas camadas: server-side via NEXT_PUBLIC_BRAND alimentando getServerBranding(), e client-side via atributo data-brand no <html> + ThemeProvider Emotion. Tudo o que muda entre marcas (logos, cores, assets, rotas desabilitadas) vive em src/styles/branding.ts como fonte única da verdade.",
      "Estruturamos o frontend com App Router, React Query para data fetching, Zustand para estado de sessão/checkout e React Hook Form + Zod para os formulários críticos. A camada api/ separa contratos (interfaces) de implementação concreta (axios + Keycloak), inspirada em Clean Architecture, facilitando testes e troca futura de backend.",
      "Pagamento via PIX integrado com Tuna (com criptografia de campos sensíveis), checkout reativo a status em tempo real via polling, fluxo completo testado em Vitest (unit) e Playwright (E2E). PWA com next-pwa para reengajamento e atribuição customizada para tracking de conversão.",
    ],
    outcome: [
      "Plataforma em produção sob duas marcas, com pipelines independentes de deploy, integração com CMS proprietário (cms.viaza.com.br) e checkout PIX/cartão funcional. Time consegue lançar uma nova marca whitelabel adicionando apenas um objeto de branding e os assets correspondentes, sem tocar em rota, componente ou serviço.",
    ],
    highlights: [
      "Arquitetura whitelabel multi-marca (Viaza + GoMilhas) num único repositório",
      "Tema MUI 7 dinâmico por marca via Emotion + data-brand no <html>",
      "Middleware reescrevendo rotas desabilitadas por marca + UTMs em cookie",
      "Auth Keycloak com 3 fluxos coexistindo (keycloak-js, NextAuth, BFF httpOnly)",
      "Checkout PIX (Tuna) com criptografia de campos e polling de status em tempo real",
      "Camada api/ inspirada em Clean Architecture com DI e interfaces tipadas",
      "PWA com next-pwa, Service Worker e atribuição custom",
      "Testes em Vitest (unit) e Playwright (E2E)",
    ],
    metrics: [
      { value: "2", label: "Marcas em produção" },
      { value: "1", label: "Codebase compartilhado" },
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "MUI 7",
      "Emotion",
      "React Query",
      "Zustand",
      "React Hook Form",
      "Zod",
      "NextAuth",
      "Keycloak",
      "Vitest",
      "Playwright",
    ],
    links: [
      { href: "https://viaza.com.br", label: "Viaza" },
      { href: "https://gomilhas.com.br", label: "GoMilhas" },
    ],
    featured: true,
  },
  {
    slug: "celcoin-mybenk-banking-app",
    title: "MyBenk: banking white-label da Celcoin em 3 frentes (app, backoffice e BaaS)",
    client: "Celcoin",
    type: "freelance",
    kind: "cliente",
    segment: "Fintech",
    role: "Desenvolvimento full-stack · App mobile, painel admin & BaaS",
    year: "2025 a 2026",
    period: "2025 a 2026",
    duration: "Concluído",
    location: "Remoto, Brasil",
    summary:
      "Desenvolvimento e manutenção do MyBenk, plataforma de banking white-label da Celcoin, em três frentes: o app de internet banking para o usuário final (React Native/Expo), o painel backoffice de gestão (React e Next.js) e a integração com o Banking as a Service (BaaS) da Celcoin no backend (NestJS e MongoDB). Pix, contas PF e PJ e cartões operando sob a marca do cliente, que vira o banco do próprio ecossistema.",
    logo: "/images/logos/celcoin.png",
    accent: "#6d28d9",
    context: [
      "A Celcoin é uma das principais empresas de infraestrutura financeira do Brasil. O MyBenk é o produto de banking white-label (Endofinance) que permite uma empresa oferecer conta, cartão e Pix sob a própria marca, virando o banco do seu próprio ecossistema (clientes, fornecedores, parceiros e colaboradores).",
      "A atuação cobriu três frentes integradas do produto: o aplicativo de internet banking para o usuário final, o painel backoffice de gestão e a integração com o Banking as a Service (BaaS) da Celcoin.",
    ],
    challenge: [
      "Entregar um produto financeiro coeso em três frentes (app, painel admin e integração BaaS), com a confiabilidade e a segurança que uma operação bancária exige, mantendo a experiência fluida em iOS e Android e a gestão clara no backoffice.",
      "Sustentar e evoluir as três frentes já em produção, com correções e novas funcionalidades, sem interromper operações sensíveis de movimentação de dinheiro.",
    ],
    solution: [
      "Frente 1, app de internet banking white-label: aplicativo mobile em React Native com Expo cobrindo onboarding e KYC, abertura de conta PF e PJ, Pix (envio, recebimento e chaves), cartões e extrato.",
      "Frente 2, painel backoffice (admin): aplicação web em React e Next.js para gestão da operação, relatórios de evolução do negócio e controle de contas, carteiras e cobranças.",
      "Frente 3, integração BaaS: backend em NestJS com MongoDB orquestrando a API de Banking as a Service da Celcoin, as regras de negócio e a segurança e rastreabilidade das operações financeiras.",
      "Ciclo contínuo de desenvolvimento e manutenção evolutiva das três frentes, com entrega de novas funcionalidades e acompanhamento do produto em produção ao longo de 2025 e 2026.",
    ],
    outcome: [
      "MyBenk em produção nas três frentes (app, backoffice e integração BaaS), com Pix, contas PF e PJ e cartões operando sob a marca do cliente, e manutenção contínua durante toda a participação no projeto (2025 a 2026).",
    ],
    highlights: [
      "Três frentes do produto: app de internet banking, painel backoffice (admin) e integração BaaS",
      "App white-label de internet banking em React Native + Expo",
      "Painel backoffice (admin) em React e Next.js, com relatórios e gestão da operação",
      "Integração com o Banking as a Service (BaaS) da Celcoin no backend NestJS + MongoDB",
      "Operações Pix: envio, recebimento e gestão de chaves",
      "Abertura e gestão de contas digitais PF e PJ, com onboarding e KYC",
      "Emissão e gestão de cartões",
      "Desenvolvimento e manutenção evolutiva das três frentes em produção",
    ],
    metrics: [
      { value: "3", label: "Frentes: app, admin e BaaS" },
      { value: "Pix", label: "Contas e cartões via BaaS" },
    ],
    stack: [
      "React Native",
      "Expo",
      "React",
      "Next.js",
      "TypeScript",
      "NestJS",
      "Node.js",
      "MongoDB",
      "Celcoin BaaS",
      "Pix",
      "REST",
    ],
    links: [
      { href: "https://www.celcoin.com.br/mybenk/", label: "MyBenk" },
      { href: "https://www.celcoin.com.br/cel_banking/banking-as-a-service/", label: "Celcoin BaaS" },
    ],
    featured: true,
  },

  /* ── Clientes novos ───────────────────────────────────────────────────────
     Escritos a partir dos repos locais e dos sites públicos. Os TODO marcam
     o que só o João sabe: resultado de negócio, papel exato e período.
     ──────────────────────────────────────────────────────────────────────── */
  {
    slug: "opticuspro-frontend-medicao-otica",
    title: "Ótica vendendo multifocal a distância: o front-end que entrega a medição em minutos",
    client: "OpticusPRO",
    type: "freelance",
    kind: "cliente",
    segment: "Óptica",
    role: "Desenvolvimento front-end · React & Next.js",
    year: "TODO: período",
    period: "TODO: período",
    duration: "TODO",
    location: "Remoto, Brasil",
    summary:
      "O OpticusPRO calcula DP, DNP e altura de montagem a partir de uma foto, com IA, para a ótica vender lente multifocal pelo Instagram, WhatsApp ou e-commerce, sem o cliente precisar ir à loja. Desenvolvemos todo o front-end do produto em React e Next.js: o envio da foto, o acompanhamento do processamento e a entrega das medidas para a ótica.",
    accent: "#0ea5e9",
    context: [
      "Vender multifocal a distância sempre esbarrou na medição: DP, DNP e altura de montagem exigiam o cliente presente e equipamento na loja. O OpticusPRO resolve isso processando com IA uma foto tirada pelo próprio cliente, o que abre para a ótica um canal de venda que antes não existia.",
      "O produto é vendido por assinatura em faixas mensais conforme o volume de medições, então a interface precisa servir tanto a ótica de uma unidade quanto a rede com fluxo alto.",
    ],
    challenge: [
      "Construir a interface de um produto cujo valor depende de precisão: o usuário precisa entender o que fotografar e como, porque foto ruim significa medida ruim, e a ótica não tem como conferir o resultado sem confiar no sistema.",
      "Sustentar a espera do processamento sem o usuário achar que travou, e apresentar medidas ópticas de forma que o profissional da ótica consiga usar direto no pedido da lente.",
    ],
    solution: [
      "Front-end completo do produto em React e Next.js, cobrindo o fluxo de ponta a ponta: orientação de captura, envio da foto, acompanhamento do processamento e apresentação das medidas.",
      "TODO: detalhar o que mais entrou no seu escopo. Candidatos prováveis: autenticação, painel da ótica, histórico de medições, controle de consumo do plano, área administrativa.",
    ],
    outcome: [
      "TODO: resultado de negócio. O site público do OpticusPRO cita mais de 2.000 lentes multifocais vendidas com o sistema e um cliente relatando 50% de crescimento. Confirmar se dá para usar esses números e se existe algum dado do front-end em si (tempo até a medida, taxa de foto aproveitada, abandono no fluxo).",
    ],
    highlights: [
      "Front-end completo do produto em React e Next.js",
      "Fluxo de captura, envio e processamento de foto para medição óptica",
      "Apresentação de DP, DNP e altura de montagem para uso direto no pedido da lente",
      "Produto vendido por assinatura, com faixas de volume mensal",
    ],
    metrics: [
      { value: "3", label: "Medidas calculadas por foto" },
      { value: "TODO", label: "métrica do front-end" },
    ],
    stack: ["React", "Next.js", "TODO: completar stack"],
    links: [{ href: "https://www.opticuspro.com", label: "opticuspro.com" }],
    featured: true,
    draft: true,
  },
  {
    slug: "startprev-app-acompanhamento-processos",
    title: "Cliente e empresa conectados no app: acompanhamento do plano sem passar pelo atendimento",
    client: "StartPrev",
    type: "freelance",
    kind: "cliente",
    segment: "Jurídico",
    role: "Desenvolvimento mobile · App iOS e Android",
    year: "TODO: período",
    period: "TODO: período",
    duration: "TODO",
    location: "Remoto, Brasil",
    summary:
      "App mobile que liga o cliente diretamente à empresa e agiliza a administração do plano. O cliente vê o status do próprio processo, é avisado quando algo anda e fala pelo chat integrado. A empresa deixa de gastar atendimento com a pergunta repetida de \"como está o meu caso?\" e passa a administrar o plano com menos intermediação.",
    accent: "#16a34a",
    context: [
      "O acompanhamento de processo é o ponto de maior atrito entre a empresa e quem contratou o plano: o cliente quer saber como está o caso, e a única via costumava ser ligar ou mandar mensagem para alguém do time consultar e responder.",
      "Cada consulta dessas consome tempo de uma pessoa que poderia estar tocando o processo, e a demora na resposta gera insegurança em quem contratou. O objetivo do app foi criar a conexão direta entre empresa e cliente e, com isso, agilizar a administração do plano.",
    ],
    challenge: [
      "Entregar acesso a informação sensível de processo em um app público nas lojas, com autenticação simples o bastante para um público que não é técnico e segura o bastante para o tipo de dado envolvido.",
      "Garantir que a atualização chegue ao cliente sem ele precisar abrir o app, que é o que efetivamente corta a ligação para o escritório.",
    ],
    solution: [
      "App em React Native com Expo, publicado para iOS e Android a partir de um código só, com navegação baseada em arquivos via Expo Router.",
      "Autenticação por SMS, que dispensa senha e reduz o abandono no primeiro acesso, com credenciais guardadas em Expo Secure Store.",
      "Notificação push via Firebase Cloud Messaging a cada mudança de status, e chat de suporte integrado para quando a dúvida sai do que a tela responde.",
      "TypeScript em todo o projeto, com tipagem dos contratos de processo e status.",
    ],
    outcome: [
      "TODO: resultado de negócio. Bons candidatos: queda no volume de ligações e mensagens de acompanhamento recebidas pela empresa, tempo de atendimento economizado por semana, ou número de clientes ativos administrando o plano pelo app.",
    ],
    highlights: [
      "App iOS e Android a partir de um código só (React Native + Expo)",
      "Autenticação por SMS, sem senha",
      "Notificação push de mudança de status via Firebase Cloud Messaging",
      "Chat de suporte integrado, ligando cliente e empresa direto",
      "Armazenamento seguro de credenciais com Expo Secure Store",
      "Navegação baseada em arquivos com Expo Router",
    ],
    metrics: [
      { value: "2", label: "Plataformas, um código" },
      { value: "SMS", label: "Login sem senha" },
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Expo Router",
      "Firebase Cloud Messaging",
      "Expo Secure Store",
    ],
    featured: true,
    draft: true,
  },
  {
    slug: "velana-plataforma-pagamentos",
    title: "Nova adquirente entrando sem reescrever a plataforma: o middleware de pagamentos da Velana",
    client: "Velana",
    type: "freelance",
    kind: "cliente",
    segment: "Fintech",
    role: "Engenharia de plataforma · Backend, middleware e dashboard",
    year: "TODO: período",
    period: "TODO: período",
    duration: "TODO",
    location: "Remoto, Brasil",
    summary:
      "Plataforma de pagamentos em quatro serviços (middleware, dashboard, bot e relatórios) construída para que integrar mais uma adquirente seja uma tarefa de configuração, e não um projeto novo. Seis integrações já rodam sob o mesmo contrato interno, além de saque automático e saque fatiado.",
    accent: "#7c3aed",
    context: [
      "Operação de pagamentos que precisa conversar com várias adquirentes ao mesmo tempo. Cada uma tem contrato de API, formato de retorno e regra de conciliação próprios, e a tentação é escrever um caminho separado para cada uma, o que multiplica o custo de manutenção a cada nova parceira.",
      "A operação também depende de saque, que é onde erro custa dinheiro real e imediato.",
    ],
    challenge: [
      "Definir um contrato interno único capaz de absorver adquirentes com comportamentos diferentes, de modo que a próxima integração seja mapeamento e configuração em vez de código novo espalhado.",
      "Operar mudanças em fluxo de dinheiro sem janela de manutenção, com capacidade de ligar e desligar comportamento em produção e de enxergar o que quebrou antes que o suporte descubra.",
    ],
    solution: [
      "Arquitetura em quatro serviços com responsabilidade separada: middleware de integração com as adquirentes, dashboard de operação, bot de automação e serviço dedicado a relatórios.",
      "Middleware em Node.js e Express concentrando o contrato único de integração, com suporte a proxy por adquirente e criptografia dos campos sensíveis.",
      "LaunchDarkly para feature flags, o que permite habilitar uma adquirente ou um comportamento novo de forma gradual e reverter sem deploy, e Highlight para observabilidade do que acontece em produção.",
      "Postgres serverless via Neon como base compartilhada, dashboard em React com Radix UI e geração de relatórios em PDF com pdfkit.",
      "Fluxos de saque automático e saque fatiado documentados e implementados como parte da plataforma.",
    ],
    outcome: [
      "TODO: resultado de negócio. Bons candidatos: tempo para integrar uma nova adquirente antes e depois, volume transacionado, ou queda em incidente de conciliação.",
    ],
    highlights: [
      "Quatro serviços: middleware, dashboard, bot e relatórios",
      "Seis adquirentes integradas sob um contrato interno único",
      "Feature flags com LaunchDarkly para ligar integração sem deploy",
      "Observabilidade em produção com Highlight",
      "Postgres serverless via Neon",
      "Saque automático e saque fatiado",
      "Relatórios em PDF gerados com pdfkit",
      "Criptografia de campos sensíveis no middleware",
    ],
    metrics: [
      { value: "6", label: "Adquirentes integradas" },
      { value: "4", label: "Serviços na plataforma" },
    ],
    stack: [
      "Node.js",
      "Express",
      "TypeScript",
      "React",
      "Radix UI",
      "PostgreSQL (Neon)",
      "LaunchDarkly",
      "Highlight",
      "pdfkit",
    ],
    featured: false,
    draft: true,
  },
  {
    slug: "portal-pmerj-sustentacao-features",
    title: "Sistemas corporativos da PMERJ em um portal só: sustentação e novas features",
    client: "PMERJ",
    type: "freelance",
    kind: "cliente",
    segment: "Governo",
    role: "Sustentação e novas features · Front-end Angular",
    year: "TODO: período",
    period: "TODO: período",
    duration: "TODO",
    location: "Remoto, Brasil",
    summary:
      "O Portal PMERJ reúne num ambiente digital único sistemas corporativos que a corporação desenvolveu ao longo dos anos. Atuamos na sustentação do portal, em Angular, e no desenvolvimento de novas funcionalidades sobre uma base já em produção e em uso operacional.",
    accent: "#334155",
    context: [
      "Segundo a Secretaria de Estado de Polícia Militar, o Portal PMERJ foi criado pela Diretoria de Sistemas de Informação (DSI) da DGTIC para unificar num só ambiente sistemas corporativos que antes viviam separados, começando por Serviço 190, Monitor (dados georreferenciados) e Inteligência, e avançando depois para áreas como gestão de pessoal, planejamento operacional, saúde, educação, publicações e logística.",
      "Um portal com esse alcance cresce por acúmulo: cada área traz um módulo, e a base precisa continuar de pé enquanto recebe função nova.",
    ],
    challenge: [
      "Entrar num sistema Angular grande, já em produção e com uso operacional, e conseguir entregar funcionalidade nova sem regressão em módulo que outra diretoria depende no dia a dia.",
      "Trabalhar dentro das restrições de um sistema de governo: acesso controlado, ambiente fechado e ciclo de homologação próprio.",
    ],
    solution: [
      "Sustentação do front-end Angular do portal: correção, manutenção evolutiva e acompanhamento dos módulos em produção.",
      "Desenvolvimento de novas funcionalidades sobre a base existente, respeitando os padrões de código e a arquitetura que o portal já adotava.",
      "TODO: detalhar quais módulos ou features específicas você tocou, no nível que o contrato permitir divulgar.",
    ],
    outcome: [
      "TODO: resultado de negócio. Candidatos: features entregues no período, redução de chamado ou bug recorrente, tempo de resposta em sustentação.",
    ],
    highlights: [
      "Sustentação de portal Angular em produção, com uso operacional",
      "Desenvolvimento de novas funcionalidades sobre base legada",
      "Ambiente de governo, com acesso controlado e homologação própria",
      "TODO: pontos altos específicos da sua entrega",
    ],
    metrics: [
      { value: "TODO", label: "métrica" },
      { value: "Angular", label: "Front-end do portal" },
    ],
    stack: ["Angular", "TypeScript", "TODO: completar stack"],
    featured: false,
    draft: true,
  },

  {
    slug: "itau-unibanco-plataformas-internas",
    title: "Dois projetos internos do Itaú 60% mais rápidos e mais estáveis em 3 anos",
    client: "Itaú Unibanco",
    type: "corporate",
    kind: "carreira",
    segment: "Banco",
    role: "Desenvolvimento full-stack · Web & Mobile",
    year: "2023 a 2026",
    period: "Mar 2023 a Jan 2026",
    duration: "3 anos",
    location: "São Paulo, Brasil",
    summary: "Dois projetos internos full-stack na área de Quality Products do maior banco privado do país, um Web e um Mobile, com requisitos rigorosos de segurança e acessibilidade. Atuação full-stack (cerca de 60% front-end e 40% back-end): a cobertura de testes subiu de 50% para 90% e o tempo de carregamento inicial caiu 60% com code splitting e lazy loading.",
    logo: "/images/logos/itau.webp",
    context: [
      "O Itaú Unibanco demanda altíssimo padrão de segurança, qualidade e escalabilidade em suas plataformas internas. A atuação foi em dois projetos internos críticos na área de Quality Products, um Web e um Mobile, voltados ao público interno do banco, com requisitos rigorosos de cobertura de testes, acessibilidade e performance.",
    ],
    challenge: [
      "Elevar a maturidade técnica de dois projetos internos full-stack (Web e Mobile) com cobertura de testes baixa e tempo de carregamento elevado, mantendo conformidade com as diretrizes corporativas de segurança e a acessibilidade WCAG 2.1 AA.",
    ],
    solution: [
      "Atuação full-stack nas duas frentes (cerca de 60% front-end e 40% back-end), com front em Angular, React e Next.js e back em NestJS, Node.js e Python sobre MongoDB e PostgreSQL.",
      "Estratégia de testes em camadas (Jest e Testing Library) e otimização de entrega com code splitting, lazy loading e auditorias contínuas de Web Vitals.",
      "Gerenciamento de estado com NgRx no Angular e Context API no React para features complexas, com arquitetura comum focada em segurança, qualidade e escalabilidade, além de integrações de Inteligência Artificial e práticas AI-Driven.",
    ],
    outcome: [
      "Cobertura de testes saltou de 50% para 90% nas áreas sob responsabilidade, com redução de 60% no tempo de carregamento percebido pelos usuários nos dois projetos.",
    ],
    highlights: [
      "Dois projetos internos full-stack de Quality Products (Web e Mobile), 60% front-end e 40% back-end",
      "Cobertura de testes de 50% para 90% com Jest e Testing Library",
      "Tempo de carregamento inicial 60% menor com code splitting e lazy loading",
      "Arquitetura com foco em segurança, qualidade e escalabilidade",
      "Gerenciamento de estado com NgRx e Context API em features complexas",
      "Conformidade de acessibilidade WCAG 2.1 AA",
      "Stack full-stack: Angular, React, Next.js, NestJS, Node.js, MongoDB, PostgreSQL e Python",
      "Integrações de Inteligência Artificial e práticas AI-Driven",
    ],
    metrics: [
      { value: "90%", label: "Cobertura de testes" },
      { value: "-60%", label: "Tempo de carregamento" },
    ],
    stack: ["React", "Next.js", "Angular", "TypeScript", "NestJS", "Node.js", "MongoDB", "PostgreSQL", "Python", "Jest", "NgRx", "AI-Driven"],
    featured: true,
  },
  {
    slug: "totvs-orquestrador-apis",
    title: "Plataforma corporativa da TOTVS 30% mais rápida, com vários times entregando em paralelo",
    client: "TOTVS",
    type: "corporate",
    kind: "carreira",
    segment: "Software",
    role: "Arquitetura de plataforma & Micro-frontends",
    year: "2022 a 2023",
    period: "Jan 2022 a Mar 2023",
    duration: "1 ano e 3 meses",
    location: "São Paulo, Brasil",
    summary: "Plataforma orquestradora unindo vários sistemas internos em uma interface única. Quebramos a aplicação em pedaços que cada time pôde evoluir sem atrapalhar os outros e cobrimos os fluxos críticos com testes automáticos antes de cada subida: resposta 30% mais rápida e zero regressão chegando em produção.",
    logo: "/images/logos/totvs.webp",
    context: [
      "A TOTVS precisava unificar diversas APIs internas em uma plataforma orquestradora com interface coesa e times independentes evoluindo módulos em paralelo.",
    ],
    challenge: [
      "Permitir desenvolvimento desacoplado de múltiplos times sem comprometer consistência visual, performance ou cobertura de testes em fluxos críticos da plataforma.",
    ],
    solution: [
      "Adotamos micro-frontends com Module Federation, isolando deploys e responsabilidades por domínio. Cada módulo passou a ter ciclo de release próprio.",
      "Estruturamos uma suite Cypress cobrindo os principais fluxos ponta-a-ponta, integrada ao pipeline para barrar regressões antes de chegar à produção.",
    ],
    outcome: [
      "Tempo de resposta das APIs caiu 30% após otimizações de cache e estado, e 90% dos fluxos críticos passaram a ser validados automaticamente em E2E.",
    ],
    highlights: [
      "Implementação de micro-frontends para plataforma orquestradora de APIs",
      "Suite de testes E2E com Cypress cobrindo 90% dos fluxos críticos",
      "Gerenciamento de estado complexo com Redux e NgRx",
      "Melhoria de UX/UI com aumento na satisfação dos usuários",
    ],
    metrics: [
      { value: "-30%", label: "Response time APIs" },
      { value: "90%", label: "Fluxos com E2E" },
    ],
    stack: ["Angular", "React", "TypeScript", "Node.js", "Redux", "NgRx", "Cypress"],
    featured: true,
  },
  {
    slug: "boticario-pwa-mobile",
    title: "Eudora e Boticário: +80% de venda mobile e metade do tempo pra lançar",
    client: "O Boticário",
    type: "corporate",
    kind: "carreira",
    segment: "Varejo",
    role: "Liderança técnica · Web & Mobile",
    year: "2020 a 2022",
    period: "Fev 2020 a Jan 2022",
    duration: "2 anos",
    location: "São Paulo",
    summary: "Liderança técnica nos canais digitais de Eudora e Boticário, com foco em mobile. Padronizamos o jeito do time trabalhar e automatizamos o ciclo de publicação: venda mobile cresceu 80%, fuga do site caiu 40% e o time passou a lançar releases em metade do tempo.",
    logo: "/images/logos/oboticario.webp",
    context: [
      "As marcas Eudora e Boticário precisavam acelerar a evolução dos canais digitais com foco em mobile, mantendo a operação de e-commerce em escala nacional.",
    ],
    challenge: [
      "Reduzir o bounce rate e aumentar conversão mobile sem refatorar o ecossistema inteiro, integrando soluções modernas a uma base já em produção.",
    ],
    solution: [
      "Conduzimos a liderança técnica de projetos PWA e mobile, padronizando code review, qualidade automatizada (Jest, Testing Library, Cypress) e arquitetura.",
      "Automatizamos o pipeline com Azure DevOps reduzindo deploy time em 50% e liberando o time para focar em produto.",
    ],
    outcome: [
      "Conversão mobile cresceu 80% e o bounce rate caiu 40%, com pipeline mais rápido e previsível.",
    ],
    highlights: [
      "Liderança técnica em projetos PWA e Mobile nas marcas Eudora e Boticário",
      "Automação CI/CD com Azure DevOps reduzindo deploy time em 50%",
      "Proposição e execução de melhorias arquiteturais e Code Review",
      "Qualidade garantida com Jest, Testing Library e Cypress",
    ],
    metrics: [
      { value: "+80%", label: "Conversão mobile" },
      { value: "-40%", label: "Bounce rate" },
    ],
    stack: ["Angular", "React", "React Native", "GraphQL", "Node.js", "Next.js", "TypeScript"],
    featured: true,
  },
  {
    slug: "ntt-data-design-system",
    title: "30% menos tempo de desenvolvimento em projetos para Santander e Vivo",
    client: "NTT Data (everis)",
    type: "corporate",
    kind: "carreira",
    segment: "Consultoria",
    role: "Engenharia de Design System",
    year: "2018 a 2020",
    period: "Nov 2018 a Fev 2020",
    duration: "1 ano e 4 meses",
    location: "São Paulo",
    summary: "Atendimento simultâneo a Santander Brasil, Santander Argentina e Vivo, com forte exigência de identidade visual própria por cliente. Construímos uma biblioteca de componentes compartilhada entre os times: cada projeto manteve sua marca, mas o ritmo de entrega ficou 30% mais rápido.",
    logo: "/images/logos/nttdata.webp",
    context: [
      "A NTT Data atendia simultaneamente Santander Brasil, Santander Argentina e Vivo Brasil, clientes com fortes exigências de acessibilidade e identidade visual própria.",
    ],
    challenge: [
      "Criar componentes reutilizáveis entre projetos de clientes distintos, com tematização independente, alta cobertura de testes e conformidade WCAG.",
    ],
    solution: [
      "Implantamos um Design System compartilhado com tokens de tema por cliente, máquinas de estado em Redux/NgRx e cobertura de testes acima de 90% no pacote de componentes.",
    ],
    outcome: [
      "Lighthouse 90+ nos projetos entregues e redução de 30% no tempo de desenvolvimento entre os times consumidores do Design System.",
    ],
    highlights: [
      "Projetos entregues para Santander Brasil, Santander Argentina e Vivo Brasil",
      "Design System compartilhado reduzindo tempo de desenvolvimento em 30%",
      "Componentes reutilizáveis com 90% de cobertura de testes",
      "Conformidade WCAG 2.0 e state machines com Redux/NgRx",
    ],
    metrics: [
      { value: "90+", label: "Lighthouse score" },
      { value: "-30%", label: "Tempo de dev" },
    ],
    stack: ["Angular", "React", "React Native", "Node.js", "TypeScript", "Redux/NgRx"],
    featured: true,
  },
];

/**
 * PROJECTS continua sendo um array só de propósito: getProjectBySlug, o
 * generateStaticParams de /projetos/[slug] e o sitemap seguem cobrindo tudo,
 * então as URLs dos cases de carreira continuam vivas e indexadas. Quem separa
 * o que aparece em cada página são os dois seletores abaixo.
 */
export const PUBLISHED_PROJECTS: Project[] = PROJECTS.filter((p) => !p.draft);
export const CLIENT_PROJECTS: Project[] = PUBLISHED_PROJECTS.filter((p) => p.kind === "cliente");
export const CAREER_PROJECTS: Project[] = PUBLISHED_PROJECTS.filter((p) => p.kind === "carreira");

export const STATS: Stat[] = [
  { value: "16+", label: "Anos no mercado", detail: "Desde 2009" },
  { value: "20+", label: "Clientes atendidos", detail: "Startups a Enterprise" },
  { value: "Milhões+", label: "Usuários impactados", detail: "Escala nacional" },
  { value: "50+", label: "Projetos entregues", detail: "Web, Mobile & AI" },
];

export const STACK: Stack = {
  "Web": ["Angular", "React.js", "Next.js", "Node.js", "TypeScript", "JavaScript ES6+", "HTML5", "CSS3"],
  "Mobile": ["React Native", "Ionic", "Capacitor", "PWA"],
  "Backend": ["Node.js", "NestJS", "Python", "GraphQL", "REST APIs", "WebSockets"],
  "Testes": ["Jest", "Cypress", "React Testing Library", "E2E", "Integração"],
  "Estado": ["Redux Toolkit", "NgRx", "Zustand", "Context API", "State Machines"],
  "AI & LLM": ["Generative AI", "LLM Applications", "LLMOps", "Local LLMs", "AI-Driven Development"],
  "Arquitetura": ["Micro-frontends", "Module Federation", "Design Systems", "Clean Architecture", "SOLID"],
  "DevOps": ["Docker", "GitHub Actions", "Azure DevOps", "AWS (S3, CloudFront)", "Vercel", "CI/CD", "Webpack", "Vite"],
  "Acessibilidade": ["WCAG 2.1 AA", "ARIA", "Lighthouse", "Web Vitals", "Responsive Design"],
};

export const STACK_DEFAULT_TAB = "Web";

export const CLIENTS: ClientBrand[] = [
  { name: "Itaú", logo: "/images/logos/itau.webp" },
  { name: "O Boticário", logo: "/images/logos/oboticario.webp" },
  { name: "TOTVS", logo: "/images/logos/totvs.webp" },
  { name: "NTT Data", logo: "/images/logos/nttdata.webp" },
  { name: "Viaza / GoMilhas", logo: "/images/logos/viaza.webp" },
  { name: "Santander", logo: "/images/logos/santander.webp" },
  { name: "Vivo", logo: "/images/logos/vivo.webp" },
  { name: "Walmart", logo: "/images/logos/walmart.webp" },
  { name: "UOL", logo: "/images/logos/uol.webp" },
  { name: "Reclame Aqui", logo: "/images/logos/reclameaqui.webp" },
  { name: "ViajaNet", logo: "/images/logos/viajanet.webp" },
  { name: "Grupo Pão de Açúcar", logo: "/images/logos/gpa.webp" },
];

export const CONTACT = {
  email: "falecom@firmino.dev",
  phone: "(11) 97083-6907",
  /** E.164 digits only (country + area + number) for wa.me links. */
  whatsapp: "5511970836907",
  location: "São Paulo, Brasil",
  linkedin: "https://linkedin.com/company/firminodev",
  github: "https://github.com/firmino-dev",
  twitter: "https://x.com/firminodev",
};

/** Dados legais da empresa, exibidos no rodapé, contato e JSON-LD (idoneidade). */
export const COMPANY = {
  legalName: "J. H. FIRMINO & CIA LTDA",
  cnpj: "43.699.300/0001-13",
};

/** Pre-filled WhatsApp deep link with a tracked-friendly default message. */
export function whatsappLink(
  message = "Olá! Vim pelo site da firmino.dev e quero conversar sobre um projeto.",
): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
