import type {
  CareerRole,
  EarlierRole,
  SkillGroup,
  Education,
  Language,
  Stat,
} from "@/types";
import { SITE_URL } from "@/lib/seo";

/* ════════════════════════════════════════════
   Currículo · João Henrique Firmino
   Fonte da página /joao (perfil do fundador).
   Mantido separado de portfolio.ts porque aqui
   os dados são da PESSOA, não da empresa.
   ════════════════════════════════════════════ */

/**
 * @id canônico da pessoa no grafo do schema.org. O Person do /sobre aponta
 * para o mesmo id, para o Google entender que é uma entidade só e não duas.
 */
export const PERSON_ID = `${SITE_URL}/joao#person`;

export const PERSON = {
  name: "João Henrique Firmino",
  shortName: "João Firmino",
  role: "Senior Full Stack Developer",
  headline: "Fundador da firmino.dev",
  location: "São Paulo, SP",
  photo: "/images/joao-firmino.jpg",
  cv: "/cv-joao-firmino-full-stack.pdf",
  /** Endereço da pessoa. O falecom@ é o inbox comercial da empresa (CONTACT). */
  email: "joao@firmino.dev",
  /** Perfis pessoais. Os da empresa ficam em CONTACT (portfolio.ts). */
  linkedin: "https://www.linkedin.com/in/firminoweb",
  github: "https://github.com/firminoweb",
};

export const PERSON_SUMMARY = [
  "Desenvolvedor full stack com mais de 16 anos construindo produtos web e mobile de alta escala. Passei por Itaú, O Boticário, TOTVS, NTT Data, Walmart, UOL e Grupo Pão de Açúcar, em projetos que atenderam milhões de usuários no Brasil.",
  "Atuei como Tech Lead e engenheiro sênior, com liderança técnica, mentoria de desenvolvedores, code review e definição de padrões de arquitetura. Hoje levo esse mesmo método para os clientes da firmino.dev, a empresa que fundei.",
];

export const PERSON_STATS: Stat[] = [
  { value: "16+", label: "Anos de experiência", detail: "Desde 2009" },
  { value: "50+", label: "Projetos entregues", detail: "Web, mobile e IA" },
  { value: "Milhões", label: "Usuários impactados", detail: "Escala nacional" },
  { value: "9 anos", label: "De Angular", detail: "6+ anos de React" },
];

export const CAREER: CareerRole[] = [
  {
    company: "firmino.dev",
    role: "Fundador e Senior Full Stack Developer",
    period: "Jan 2026 até hoje",
    current: true,
    location: "São Paulo, SP",
    highlights: [
      "Consultoria e desenvolvimento full stack para empresas digitalizando a operação e para agências que precisam de reforço técnico sênior.",
      "Aplicações web e apps mobile sob medida, do produto ao deploy, com qualidade automatizada e foco em performance.",
      "Automações e aplicações com IA Generativa conectadas ao que o cliente já usa.",
    ],
    stack: [
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "React Native",
      "Angular",
      "TypeScript",
      "MongoDB",
      "PostgreSQL",
      "IA aplicada",
    ],
  },
  {
    company: "Itaú Unibanco",
    role: "Senior Software Engineer (Full Stack)",
    period: "Mar 2023 a Jan 2026",
    location: "São Paulo, SP",
    highlights: [
      "Desenvolvimento de 2 projetos internos full stack (60% front-end e 40% back-end).",
      "Testes automatizados com Jest e Testing Library, elevando a cobertura de código de 50% para 90%.",
      "Otimização de performance com code splitting e lazy loading em React e Next.js, reduzindo o tempo de carregamento inicial em 60%.",
      "Arquitetura com foco em segurança, qualidade e escalabilidade, com gerenciamento de estado em NgRx e Context API.",
      "Acessibilidade em conformidade com WCAG 2.1 AA e práticas AI-driven no fluxo de desenvolvimento.",
    ],
    stack: ["Angular", "React", "TypeScript", "Node.js", "NestJS", "MongoDB", "Python"],
  },
  {
    company: "TOTVS",
    role: "Senior Frontend Developer",
    period: "Jan 2022 a Mar 2023",
    location: "São Paulo, SP",
    highlights: [
      "Interface e micro-frontends para a plataforma de conexão e orquestração de APIs (Connector).",
      "Redução de 30% no tempo de resposta das APIs com otimizações no frontend.",
      "Suíte de testes E2E com Cypress cobrindo 90% dos fluxos críticos.",
      "Atuação ágil em Scrum e Kanban, com estado complexo em Redux e NgRx e melhorias de UX/UI.",
    ],
    stack: ["Angular", "React", "TypeScript", "Node.js", "Jest", "Python"],
  },
  {
    company: "O Boticário",
    role: "Tech Lead (Full Stack)",
    period: "Fev 2020 a Jan 2022",
    location: "São Paulo, SP",
    highlights: [
      "Liderança técnica em 2 projetos de marcas do grupo (70% front-end e 30% back-end).",
      "Projetos PWA e mobile das marcas Eudora e O Boticário, com aumento de 80% na conversão mobile.",
      "Redução de 40% no bounce rate com melhorias de acessibilidade e performance.",
      "Melhorias arquiteturais, novas features e processo de code review; pipeline de CI/CD com Azure DevOps reduzindo o tempo de deploy em 50%.",
    ],
    stack: ["Angular", "React", "React Native", "GraphQL", "Node.js", "Next.js", "MongoDB"],
  },
  {
    company: "NTT Data (everis)",
    role: "Senior Frontend Developer",
    period: "Nov 2018 a Fev 2020",
    location: "São Paulo, SP",
    highlights: [
      "Desenvolvimento para os clientes Santander Brasil, Santander Argentina e Vivo Brasil.",
      "Design system compartilhado que reduziu o tempo de desenvolvimento em 30%.",
      "Web Vitals com scores Lighthouse acima de 90 em todas as métricas e componentes reutilizáveis com 90% de cobertura de testes.",
      "Acessibilidade WCAG 2.0 e gerenciamento de estado com Redux, NgRx e state machines.",
    ],
    stack: ["Angular", "React", "React Native", "Node.js", "TypeScript"],
  },
];

export const EARLIER_ROLES: EarlierRole[] = [
  {
    company: "zFlow",
    role: "Senior Frontend Developer",
    period: "Fev 2017 a Nov 2018",
    detail: "Web apps de financiamento e simulação para o Banco Itaú (Angular, Vue.js, TypeScript).",
  },
  {
    company: "Cnova (GPA)",
    role: "Frontend Developer",
    period: "Jul 2016 a Fev 2017",
    detail: "Apps híbridos de Casas Bahia, Pontofrio e Extra (Ionic, Cordova, AngularJS).",
  },
  {
    company: "Reclame Aqui",
    role: "Frontend Developer",
    period: "Out 2015 a Jul 2016",
    detail: "Novo portal da plataforma de reclamações (AngularJS, Ionic).",
  },
  {
    company: "ViajaNet",
    role: "Frontend Developer",
    period: "Dez 2014 a Out 2015",
    detail: "Plataforma de compra de passagens aéreas (AngularJS, Ionic, Node.js).",
  },
  {
    company: "Walmart.com",
    role: "Frontend Developer",
    period: "Jul 2014 a Dez 2014",
    detail: "Marketplace de sellers terceiros (AngularJS, Node.js).",
  },
  {
    company: "UOL",
    role: "Frontend Developer",
    period: "Out 2012 a Jul 2014",
    detail: "TodaOferta e painel UOL Diveo/Cloud (JavaScript, jQuery).",
  },
  {
    company: "Axis.Idea",
    role: "Frontend Developer",
    period: "Jan 2012 a Out 2012",
    detail: "Websites e soluções mobile e desktop.",
  },
  {
    company: "Tonks Ideias Criativas",
    role: "Frontend Developer",
    period: "Out 2010 a Jan 2012",
    detail: "Websites e sistemas para clientes de agência.",
  },
  {
    company: "Arca Solutions",
    role: "Frontend Developer",
    period: "Set 2009 a Jul 2010",
    detail: "Primeiros projetos web profissionais.",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Front-end",
    items: ["React.js (6+ anos)", "Angular (9+ anos)", "Next.js (5+ anos)", "JavaScript ES6+", "TypeScript", "HTML5", "CSS3"],
  },
  {
    title: "Back-end",
    items: ["Node.js (6+ anos)", "NestJS (5+ anos)", "Python (1+ ano)", "RESTful APIs", "GraphQL", "WebSockets", "PostgreSQL (5+ anos)", "MongoDB (5+ anos)"],
  },
  {
    title: "Mobile",
    items: ["React Native", "Ionic", "PWA"],
  },
  {
    title: "Testes e qualidade",
    items: ["Jest", "React Testing Library", "Cypress", "Testes de integração", "E2E"],
  },
  {
    title: "Gerenciamento de estado",
    items: ["Redux Toolkit", "NgRx", "Context API", "Zustand"],
  },
  {
    title: "Arquitetura e padrões",
    items: ["Micro-frontends", "Module Federation", "Design Systems", "Clean Architecture", "SOLID"],
  },
  {
    title: "Performance e acessibilidade",
    items: ["Web Vitals", "Lighthouse", "WCAG 2.1", "ARIA", "Responsive Design"],
  },
  {
    title: "DevOps e ferramentas",
    items: ["Git", "GitHub Actions", "Azure DevOps", "Docker", "CI/CD", "Webpack", "Vite", "Babel", "AWS (S3, CloudFront)", "Vercel"],
  },
  {
    title: "Inteligência Artificial",
    items: ["IA aplicada / AI-driven", "AI-assisted Development", "Prompt Engineering", "AI Agents", "RAG", "Function Calling", "MCP", "LLMs com Claude (Anthropic API)", "OpenAI API", "Claude Code", "Cursor", "GitHub Copilot"],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: "Pós-graduação em Gestão de Mídias Digitais",
    school: "Centro Universitário Senac",
    year: "2012",
    location: "São Paulo, SP",
  },
  {
    degree: "Tecnologia em Processamento de Dados",
    school: "Unisalesiano",
    year: "2006",
    location: "Araçatuba, SP",
  },
];

export const CERTIFICATIONS: string[] = [
  "Carreira com IA Generativa (Microsoft e LinkedIn)",
  "Career Essentials in GitHub Professional Certificate (GitHub)",
  "Become a React Native Developer (LinkedIn)",
];

export const LANGUAGES: Language[] = [
  { name: "Português", level: "Nativo" },
  { name: "Inglês", level: "Intermediário (leitura, escrita e conversação)" },
  { name: "Espanhol", level: "Básico" },
];
