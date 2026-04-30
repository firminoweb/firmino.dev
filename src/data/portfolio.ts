import type {
  KeyAchievement,
  Service,
  Project,
  ProjectType,
  EarlierRole,
  Stat,
  Stack,
} from "@/types";

/* ════════════════════════════════════════════
   Portfolio data — firmino.dev
   Empresa de Desenvolvimento de Software
   ════════════════════════════════════════════ */

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Stack", href: "/stack" },
  { label: "Contato", href: "/contato" },
];

export const HERO_TAGS = ["Angular", "React", "React Native", "Next.js", "Node.js", "Generative AI", "LLM Applications", "AI-Driven"];

export const KEY_ACHIEVEMENTS: KeyAchievement[] = [
  { value: "-60%", label: "Deploy time", desc: "Migração para micro-frontends" },
  { value: "+35%", label: "Conversão mobile", desc: "Arquitetura PWA" },
  { value: "90%", label: "Cobertura testes", desc: "Jest, Cypress, Testing Library" },
  { value: "-40%", label: "Tempo de carga", desc: "Code splitting & lazy loading" },
];

export const SERVICES: Service[] = [
  { icon: "◈", title: "Desenvolvimento Full-Stack", desc: "Construímos aplicações completas com Angular, React, Next.js no frontend e Node.js no backend — do protótipo ao deploy em produção." },
  { icon: "⬡", title: "Arquitetura & Micro-frontends", desc: "Projetamos plataformas corporativas escaláveis com Module Federation, Design Systems, Clean Architecture e princípios SOLID." },
  { icon: "◎", title: "Mobile & PWA", desc: "Desenvolvemos apps com React Native e Progressive Web Apps de alta performance para alcançar milhões de usuários em qualquer dispositivo." },
  { icon: "⬢", title: "Performance & Qualidade", desc: "Auditoria Lighthouse, Web Vitals, testes automatizados (Jest, Cypress, E2E) e conformidade WCAG 2.1 AA / ARIA em cada entrega." },
  { icon: "◇", title: "Consultoria & Mentoria Técnica", desc: "Oferecemos liderança técnica, code review, definição de padrões e capacitação de times para elevar a maturidade da sua operação de engenharia." },
  { icon: "⏣", title: "Generative AI & LLM Applications", desc: "Integramos LLMOps, modelos locais e ferramentas de IA Generativa ao ciclo de desenvolvimento para criar aplicações inteligentes e acelerar resultados." },
];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  corporate: "Corporativo",
  freelance: "Freelance",
  personal: "Pessoal",
  oss: "Open Source",
};

export const PROJECTS: Project[] = [
  {
    slug: "itau-unibanco-plataformas-internas",
    title: "Plataformas internas Full-Stack",
    client: "Itaú Unibanco",
    type: "corporate",
    role: "Desenvolvimento Full-Stack",
    year: "2023 – 2026",
    period: "Mar 2023 – Jan 2026",
    duration: "2 anos e 11 meses",
    location: "São Paulo, Brasil",
    summary: "Dois projetos internos Full-Stack com foco em frontend, qualidade e segurança para o maior banco privado da América Latina.",
    context: [
      "O Itaú Unibanco demanda altíssimo padrão de segurança, qualidade e escalabilidade em suas plataformas internas. Nossa equipe foi alocada em dois projetos críticos voltados ao público interno do banco, com requisitos rigorosos de cobertura de testes, acessibilidade e performance.",
    ],
    challenge: [
      "Elevar a maturidade técnica de bases legadas com cobertura de testes baixa e tempo de carregamento elevado, mantendo conformidade com diretrizes corporativas de segurança e acessibilidade WCAG 2.1 AA.",
    ],
    solution: [
      "Implementamos uma estratégia de testes em camadas (Jest + Testing Library) e otimizamos a entrega com code splitting, lazy loading e auditorias contínuas de Web Vitals.",
      "Refatoramos o gerenciamento de estado com NgRx no Angular e Context API no React, alinhando os padrões dos dois projetos a uma arquitetura comum focada em segurança e escalabilidade.",
    ],
    outcome: [
      "Cobertura de testes saltou de ~50% para 90% nas áreas sob nossa responsabilidade, com redução de 60% no tempo de carregamento percebido pelos usuários.",
    ],
    highlights: [
      "Entrega de 2 projetos internos Full-Stack com foco em Frontend",
      "Elevação de cobertura de testes com Jest e Testing Library (50% → 90%)",
      "Otimização de performance: code splitting e lazy loading (-60% load time)",
      "Arquitetura focada em segurança, qualidade e escalabilidade",
      "Gerenciamento de estado com NgRx e Context API",
      "Conformidade com acessibilidade WCAG 2.1 AA",
    ],
    metrics: [
      { value: "90%", label: "Cobertura de testes" },
      { value: "-60%", label: "Tempo de carregamento" },
    ],
    stack: ["Angular", "React", "TypeScript", "Node.js", "Jest", "AI-Driven"],
    featured: true,
  },
  {
    slug: "totvs-orquestrador-apis",
    title: "Orquestrador de APIs em micro-frontends",
    client: "TOTVS",
    type: "corporate",
    role: "Arquitetura Frontend & Micro-frontends",
    year: "2022 – 2023",
    period: "Jan 2022 – Mar 2023",
    duration: "1 ano e 3 meses",
    location: "São Paulo, Brasil",
    summary: "Plataforma orquestradora de APIs com arquitetura de micro-frontends e suite E2E cobrindo 90% dos fluxos críticos.",
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
    title: "PWA & Mobile para Eudora e Boticário",
    client: "O Boticário",
    type: "corporate",
    role: "Full-Stack & Mobile (Tech Lead)",
    year: "2020 – 2022",
    period: "Fev 2020 – Jan 2022",
    duration: "2 anos",
    location: "São Paulo",
    summary: "Liderança técnica em PWAs e apps mobile para as marcas Eudora e Boticário, com automação CI/CD e ganhos expressivos de conversão.",
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
      "Liderança técnica em projetos PWA e Mobile — marcas Eudora e Boticário",
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
    title: "Design System multi-cliente",
    client: "NTT Data (everis)",
    type: "corporate",
    role: "Frontend & Design System",
    year: "2018 – 2020",
    period: "Nov 2018 – Fev 2020",
    duration: "1 ano e 4 meses",
    location: "São Paulo",
    summary: "Design System compartilhado entre Santander Brasil, Santander Argentina e Vivo Brasil — 30% menos tempo de desenvolvimento.",
    context: [
      "A NTT Data atendia simultaneamente Santander Brasil, Santander Argentina e Vivo Brasil — clientes com fortes exigências de acessibilidade e identidade visual própria.",
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
  {
    slug: "exemplo-saas-gestao-clinica",
    title: "SaaS de gestão para clínicas de estética",
    client: "Cliente Exemplo",
    type: "freelance",
    role: "Produto Full-Stack & UX",
    year: "2025",
    period: "Jan 2025 – Mai 2025",
    duration: "5 meses",
    location: "Remoto, Brasil",
    summary: "Projeto exemplo (placeholder) — substitua com um trabalho freelance real: agenda inteligente, prontuário digital e dashboards de receita.",
    context: [
      "[Placeholder] Substitua este texto pelo contexto real do projeto: quem é o cliente, qual o segmento, qual problema enfrentava antes do início da parceria.",
    ],
    challenge: [
      "[Placeholder] Descreva o desafio principal: ineficiências do processo, gargalos técnicos ou oportunidades de produto que motivaram o projeto.",
    ],
    solution: [
      "[Placeholder] Conte como atacamos o problema: arquitetura escolhida, estratégia de produto, integrações, estratégias de qualidade e prazos.",
      "[Placeholder] Inclua decisões importantes — por que Next.js, por que serverless, por que tal banco — para mostrar critério técnico.",
    ],
    outcome: [
      "[Placeholder] Resultados mensuráveis: redução de tempo, aumento de receita, NPS, retenção, depoimento do cliente.",
    ],
    highlights: [
      "Agenda inteligente com sugestão de horários por aprendizado de uso",
      "Prontuário digital com versionamento e assinatura eletrônica",
      "Dashboards financeiros com previsão de receita assistida por IA",
      "App mobile do cliente final em React Native",
    ],
    metrics: [
      { value: "+45%", label: "Receita mensal" },
      { value: "-70%", label: "Tempo agendamento" },
    ],
    stack: ["Next.js", "React Native", "Node.js", "PostgreSQL", "Prisma", "OpenAI"],
    links: [
      { href: "https://example.com", label: "Site do projeto" },
    ],
  },
];

export const EARLIER_ROLES: EarlierRole[] = [
  { company: "zFlow", role: "Desenvolvimento Frontend", period: "Fev 2017 – Nov 2018", detail: "Web Apps de financiamento e simulação para Banco Itaú. Cobertura de testes 0% → 80%." },
  { company: "Cnova - GPA", role: "Desenvolvimento Frontend", period: "Jul 2016 – Fev 2017", detail: "Apps híbridos: Casas Bahia, Pontofrio e Extra." },
  { company: "Reclame Aqui", role: "Desenvolvimento Frontend", period: "Out 2015 – Jul 2016", detail: "Novo portal da plataforma. MVP mobile com Ionic e Angular." },
  { company: "ViajaNet", role: "Desenvolvimento Frontend", period: "Dez 2014 – Out 2015", detail: "Plataforma de passagens aéreas + serviço Quando Viajar." },
  { company: "Walmart.com", role: "Desenvolvimento Frontend", period: "Jul 2014 – Dez 2014", detail: "Marketplace: gerenciamento de sellers terceiros." },
  { company: "UOL", role: "Desenvolvimento Frontend", period: "Out 2012 – Jul 2014", detail: "TodaOferta + Painel UOL Diveo (Cloud)." },
  { company: "Axis.Idea", role: "Desenvolvimento Frontend", period: "Jan 2012 – Out 2012", detail: "Websites e soluções mobile+desktop." },
  { company: "Tonks Idéias Criativas", role: "Desenvolvimento Frontend", period: "Out 2010 – Jan 2012", detail: "" },
  { company: "Arca Solutions", role: "Desenvolvimento Frontend", period: "Set 2009 – Jul 2010", detail: "" },
];

export const STATS: Stat[] = [
  { value: "15+", label: "Anos no mercado", detail: "Desde 2009" },
  { value: "13+", label: "Clientes atendidos", detail: "Startups a Enterprise" },
  { value: "M+", label: "Usuários impactados", detail: "Escala nacional" },
  { value: "50+", label: "Projetos entregues", detail: "Web, Mobile & AI" },
];

export const STACK: Stack = {
  "Full-Stack": ["Angular (+9 anos)", "React.js (+6 anos)", "Next.js", "Node.js", "TypeScript", "JavaScript ES6+", "HTML5", "CSS3"],
  "Mobile": ["React Native", "Ionic", "Capacitor", "PWA"],
  "Backend": ["Node.js", "NestJS", "Python", "GraphQL", "REST APIs", "WebSockets"],
  "Testes": ["Jest", "Cypress", "React Testing Library", "E2E", "Integração"],
  "Estado": ["Redux Toolkit", "NgRx", "Zustand", "Context API", "State Machines"],
  "AI & LLM": ["Generative AI", "LLM Applications", "LLMOps", "Local LLMs", "AI-Driven Development"],
  "Arquitetura": ["Micro-frontends", "Module Federation", "Design Systems", "Clean Architecture", "SOLID"],
  "DevOps": ["Docker", "GitHub Actions", "Azure DevOps", "AWS (S3, CloudFront)", "Vercel", "CI/CD", "Webpack", "Vite"],
  "Acessibilidade": ["WCAG 2.1 AA", "ARIA", "Lighthouse", "Web Vitals", "Responsive Design"],
};

export const CLIENTS = ["Itaú", "Boticário", "TOTVS", "NTT Data", "Santander", "Walmart", "UOL", "Reclame Aqui", "ViajaNet", "Cnova/GPA"];

export const CONTACT = {
  email: "firminoata@gmail.com",
  phone: "(11) 97083-6907",
  location: "São Paulo, Brasil",
  linkedin: "https://linkedin.com/in/firminoweb",
  github: "https://github.com/firminoweb",
};

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
