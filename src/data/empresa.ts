import { COMPANY } from "@/data/portfolio";
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

/**
 * Especialidades declaradas no JSON-LD da Organization (`knowsAbout`) e no
 * /llms.txt. É o que liga a firmino.dev a esses temas para buscadores e IAs,
 * então só entra aqui o que a empresa de fato entrega.
 */
export const KNOWS_ABOUT = [
  "Desenvolvimento de software sob medida",
  "Desenvolvimento de sistemas web",
  "Criação de sites institucionais",
  "Desenvolvimento de aplicativos iOS e Android",
  "Automação de processos com inteligência artificial",
  "Chatbots e agentes de IA",
  "Integração com WhatsApp, CRM e sistemas internos",
  "Manutenção de sistemas web e aplicativos",
  "Performance web e Core Web Vitals",
  "Acessibilidade digital (WCAG)",
  "React",
  "Next.js",
  "React Native",
  "Micro-frontends",
];

export interface FaqItem {
  q: string;
  a: string;
}

/** Perguntas da home. Alimentam a seção FAQ, o JSON-LD FAQPage e o /llms.txt. */
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quanto custa um projeto?",
    a: "Depende do tamanho. Um site institucional, um app e uma plataforma com integração têm escopos diferentes. Na primeira conversa a gente entende o que você precisa e devolve uma estimativa de investimento e prazo, sem custo e sem compromisso.",
  },
  {
    q: "Em quanto tempo fica pronto?",
    a: "Projetos menores saem em poucas semanas. Plataformas maiores avançam em entregas quinzenais, com algo já funcionando cedo pra você acompanhar de perto. O cronograma é definido junto com você antes de começar.",
  },
  {
    q: "Vocês trabalham com contrato e nota fiscal?",
    a: `Sim. Somos uma empresa registrada no Brasil (${COMPANY.legalName}, CNPJ ${COMPANY.cnpj}), com contrato e nota fiscal em todos os projetos, do pequeno negócio à grande operação.`,
  },
  {
    q: "Atendem empresas fora de São Paulo?",
    a: "Sim. O atendimento é 100% remoto, para clientes de todo o Brasil e do exterior. Workshops e imersões presenciais ficam disponíveis sob demanda na grande São Paulo.",
  },
  {
    q: "Já tenho um sistema ou uma agência. Dá pra trabalhar junto?",
    a: "Dá. A gente assume a evolução de um sistema que já existe ou entra como reforço técnico dentro do seu time ou da sua agência, no seu processo e nas suas ferramentas, sem fricção e, se você preferir, sem contato com o seu cliente final.",
  },
  {
    q: "Quem vai trabalhar no meu projeto?",
    a: "O fundador, João Firmino, conduz a parte técnica e é o seu ponto de contato do começo ao fim. Conforme o projeto pede, entram especialistas parceiros em desenvolvimento, design de produto e marketing digital. Você não paga por estrutura que o seu caso não precisa.",
  },
  {
    q: "Como começa?",
    a: "Você manda uma mensagem pelo formulário ou pelo WhatsApp contando o que precisa. Respondemos em até 24h úteis com os próximos passos, e só seguimos adiante se fizer sentido pra você.",
  },
];
