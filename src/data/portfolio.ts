import type {
  KeyAchievement,
  Service,
  Case,
  EarlierRole,
  Stat,
  Certification,
  Education,
  Language,
  Stack,
} from "@/types";

/* ════════════════════════════════════════════
   Portfolio data — firmino.dev
   Sources: LinkedIn Profile + CV Full 2026
   ════════════════════════════════════════════ */

export const NAV_ITEMS = ["Home", "Serviços", "Cases", "Stack", "Certificações", "Contato"];

export const HERO_TAGS = ["Back-End", "Front-End", "Aplicativos (Apps)", "LLMOps", "Local LLMs", "Generative AI", "Micro-frontends", "AI-Driven"];

export const KEY_ACHIEVEMENTS: KeyAchievement[] = [
  { value: "-60%", label: "Deploy time", desc: "Migração para micro-frontends" },
  { value: "+35%", label: "Conversão mobile", desc: "Arquitetura PWA" },
  { value: "90%", label: "Cobertura testes", desc: "Jest, Cypress, Testing Library" },
  { value: "-40%", label: "Tempo de carga", desc: "Code splitting & lazy loading" },
];

export const SERVICES: Service[] = [
  { icon: "◈", title: "Desenvolvimento Full-Stack", desc: "Aplicações completas com Angular, React, Next.js no frontend e Node.js, Python no backend — do protótipo ao deploy em produção." },
  { icon: "⬡", title: "Arquitetura Micro-frontends", desc: "Module Federation, Design Systems e decomposição para plataformas corporativas escaláveis com Clean Architecture e SOLID." },
  { icon: "◎", title: "Mobile & PWA", desc: "Apps nativos com React Native e Ionic/Capacitor. Progressive Web Apps de alta performance servindo milhões de usuários." },
  { icon: "⬢", title: "Performance & Qualidade", desc: "Auditoria Lighthouse, Web Vitals, testes automatizados (Jest, Cypress, E2E) e conformidade WCAG 2.1 AA / ARIA." },
  { icon: "◇", title: "Tech Lead & Mentoria", desc: "Liderança técnica, code review, definição de padrões, processos ágeis (Scrum/Kanban) e capacitação de times — devs mentorados hoje são sêniors." },
  { icon: "⏣", title: "AI-Driven Development", desc: "LLMOps, Local LLMs e Generative AI Tools integrados ao ciclo de desenvolvimento para máxima eficiência e experiências inteligentes." },
];

export const CASES: Case[] = [
  {
    company: "Itaú Unibanco", role: "Senior Software Engineer (Full-Stack)", period: "Mar 2023 – Jan 2026",
    duration: "2 anos e 11 meses", location: "São Paulo, Brasil",
    metrics: [
      { value: "90%", label: "Cobertura de testes" },
      { value: "-60%", label: "Tempo de carregamento" },
    ],
    bullets: [
      "Desenvolvimento de 2 projetos internos Full-stack com foco em Frontend",
      "Testes automatizados com Jest e Testing Library (50% → 90%)",
      "Performance: code splitting e lazy loading reduzindo load time em 60%",
      "Arquitetura com foco em segurança, qualidade e escalabilidade",
      "Gerenciamento de estado com NgRx e Context API",
      "Acessibilidade WCAG 2.1 AA",
    ],
    tags: ["Angular", "React", "TypeScript", "Node.js", "Jest", "Python", "NgRx", "AI-Driven"],
  },
  {
    company: "TOTVS", role: "Senior Frontend Developer", period: "Jan 2022 – Mar 2023",
    duration: "1 ano e 3 meses", location: "São Paulo, Brasil",
    metrics: [
      { value: "-30%", label: "Response time APIs" },
      { value: "90%", label: "Fluxos com E2E" },
    ],
    bullets: [
      "Micro-frontends para plataforma de conexão/orquestrador de APIs (Connector)",
      "Suite de testes E2E com Cypress cobrindo 90% dos fluxos críticos",
      "Colaboração ativa em times ágeis: Scrum e Kanban",
      "Gerenciamento de estado complexo com Redux e NgRx",
      "Melhoria de UX/UI com aumento na satisfação dos usuários",
    ],
    tags: ["Angular", "React", "TypeScript", "Node.js", "Redux", "NgRx", "Cypress", "Python"],
  },
  {
    company: "O Boticário", role: "Tech Lead (Full-Stack)", period: "Fev 2020 – Jan 2022",
    duration: "2 anos", location: "São Paulo",
    metrics: [
      { value: "+80%", label: "Conversão mobile" },
      { value: "-40%", label: "Bounce rate" },
    ],
    bullets: [
      "Liderança técnica em projetos PWA e Mobile — marcas Eudora e Boticário",
      "CI/CD com Azure DevOps reduzindo tempo de deploy em 50%",
      "Proposição e execução de melhorias arquiteturais e Code Review",
      "Práticas de testes com Jest, Testing Library e Cypress",
    ],
    tags: ["Angular", "React", "React Native", "GraphQL", "Node.js", "Next.js", "TypeScript", "Azure DevOps"],
  },
  {
    company: "NTT Data (everis)", role: "Senior Frontend Developer", period: "Nov 2018 – Fev 2020",
    duration: "1 ano e 4 meses", location: "São Paulo",
    metrics: [
      { value: "90+", label: "Lighthouse score" },
      { value: "-30%", label: "Tempo de dev" },
    ],
    bullets: [
      "Clientes: Santander Brasil, Santander Argentina e Vivo Brasil",
      "Design System compartilhado reduzindo tempo de desenvolvimento em 30%",
      "Componentes reutilizáveis com 90% de cobertura de testes",
      "Acessibilidade WCAG 2.0 e state machines com Redux/NgRx",
    ],
    tags: ["Angular", "React", "React Native", "Node.js", "TypeScript", "Redux/NgRx", "WCAG 2.0"],
  },
];

export const EARLIER_ROLES: EarlierRole[] = [
  { company: "zFlow", role: "Senior Frontend Developer", period: "Fev 2017 – Nov 2018", detail: "Web Apps de financiamento e simulação para Banco Itaú. Testes 0% → 80%." },
  { company: "Cnova - GPA", role: "Frontend Developer", period: "Jul 2016 – Fev 2017", detail: "Apps híbridos: Casas Bahia, Pontofrio e Extra." },
  { company: "Reclame Aqui", role: "Frontend Developer", period: "Out 2015 – Jul 2016", detail: "Novo portal da plataforma. MVP mobile com Ionic e Angular." },
  { company: "ViajaNet", role: "Frontend Developer", period: "Dez 2014 – Out 2015", detail: "Plataforma de passagens aéreas + serviço Quando Viajar." },
  { company: "Walmart.com", role: "Frontend Developer", period: "Jul 2014 – Dez 2014", detail: "Marketplace: gerenciamento de sellers terceiros." },
  { company: "UOL", role: "Frontend Developer", period: "Out 2012 – Jul 2014", detail: "TodaOferta + Painel UOL Diveo (Cloud)." },
  { company: "Axis.Idea", role: "Frontend Developer", period: "Jan 2012 – Out 2012", detail: "Websites e soluções mobile+desktop." },
  { company: "Tonks Idéias Criativas", role: "Frontend Developer", period: "Out 2010 – Jan 2012", detail: "" },
  { company: "Arca Solutions", role: "Frontend Developer", period: "Set 2009 – Jul 2010", detail: "" },
];

export const STATS: Stat[] = [
  { value: "15+", label: "Anos de experiência", detail: "Desde 2009" },
  { value: "13", label: "Empresas atendidas", detail: "Startups a Enterprise" },
  { value: "M+", label: "Usuários impactados", detail: "Escala nacional" },
  { value: "291", label: "GitHub Stars", detail: "ionic-start-theme" },
];

export const STACK: Stack = {
  "Full-Stack": ["Angular (+9 anos)", "React.js (+6 anos)", "Next.js", "Node.js", "Python (+1 ano)", "Vue.js", "TypeScript", "JavaScript ES6+", "HTML5", "CSS3"],
  "Mobile": ["React Native", "Ionic", "Capacitor", "Cordova", "PWA"],
  "Backend": ["Node.js", "NestJS", "Python", "GraphQL", "REST APIs", "WebSockets"],
  "Testes": ["Jest", "Cypress", "React Testing Library", "E2E", "Integração"],
  "Estado": ["Redux Toolkit", "NgRx", "Zustand", "Context API", "Vuex", "State Machines"],
  "AI & ML": ["LLMOps", "Local LLMs", "Generative AI Tools", "AI-Driven Development"],
  "Arquitetura": ["Micro-frontends", "Module Federation", "Design Systems", "Clean Architecture", "SOLID"],
  "DevOps": ["Docker", "GitHub Actions", "Azure DevOps", "AWS (S3, CloudFront)", "Vercel", "CI/CD", "Webpack", "Vite"],
  "Acessibilidade": ["WCAG 2.1 AA", "ARIA", "Lighthouse", "Web Vitals", "Responsive Design"],
};

export const CERTIFICATIONS: Certification[] = [
  { name: "Fundamentos para uma Carreira em IA Generativa", issuer: "Microsoft & LinkedIn", icon: "🤖" },
  { name: "Explore Web Development with Angular", issuer: "LinkedIn Learning", icon: "🅰️" },
  { name: "Explore React.js Development", issuer: "LinkedIn Learning", icon: "⚛️" },
  { name: "Become a React Native Developer", issuer: "LinkedIn Learning", icon: "📱" },
  { name: "Career Essentials in GitHub Professional Certificate", issuer: "GitHub", icon: "🐙" },
];

export const EDUCATION: Education[] = [
  { degree: "Pós-Graduação", field: "Gestão em Mídias Digitais", school: "Centro Universitário Senac, São Paulo/SP", year: "2012" },
  { degree: "Graduação", field: "Tecnologia em Processamento de Dados", school: "Unisalesiano, Araçatuba/SP", year: "2006" },
];

export const LANGUAGES: Language[] = [
  { lang: "Português", level: "Nativo", pct: 100 },
  { lang: "Inglês", level: "Intermediário", pct: 55 },
  { lang: "Espanhol", level: "Básico", pct: 25 },
];

export const CLIENTS = ["Itaú", "Boticário", "TOTVS", "NTT Data", "Santander", "Walmart", "UOL", "Reclame Aqui", "ViajaNet", "Cnova/GPA"];

export const CONTACT = {
  email: "firminoata@gmail.com",
  phone: "(11) 97083-6907",
  location: "São Paulo, Brasil",
  linkedin: "https://linkedin.com/in/firminoweb",
  github: "https://github.com/firminoweb",
};
