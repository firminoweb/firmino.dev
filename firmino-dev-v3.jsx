import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════
   firmino.dev v3 — Final consolidated data
   Sources: LinkedIn Profile (4) + CV Full 2026
   ════════════════════════════════════════════ */

const NAV = ["Home", "Serviços", "Cases", "Stack", "Certificações", "Contato"];

const HERO_TAGS = ["Full-Stack", "LLMOps", "Local LLMs", "Generative AI", "Micro-frontends", "AI-Driven"];

const KEY_ACHIEVEMENTS = [
  { value: "-60%", label: "Deploy time", desc: "Migração para micro-frontends" },
  { value: "+35%", label: "Conversão mobile", desc: "Arquitetura PWA" },
  { value: "90%", label: "Cobertura testes", desc: "Jest, Cypress, Testing Library" },
  { value: "-40%", label: "Tempo de carga", desc: "Code splitting & lazy loading" },
];

const SERVICES = [
  { icon: "◈", title: "Desenvolvimento Full-Stack", desc: "Aplicações completas com Angular, React, Next.js no frontend e Node.js, Python no backend — do protótipo ao deploy em produção." },
  { icon: "⬡", title: "Arquitetura Micro-frontends", desc: "Module Federation, Design Systems e decomposição para plataformas corporativas escaláveis com Clean Architecture e SOLID." },
  { icon: "◎", title: "Mobile & PWA", desc: "Apps nativos com React Native e Ionic/Capacitor. Progressive Web Apps de alta performance servindo milhões de usuários." },
  { icon: "⬢", title: "Performance & Qualidade", desc: "Auditoria Lighthouse, Web Vitals, testes automatizados (Jest, Cypress, E2E) e conformidade WCAG 2.1 AA / ARIA." },
  { icon: "◇", title: "Tech Lead & Mentoria", desc: "Liderança técnica, code review, definição de padrões, processos ágeis (Scrum/Kanban) e capacitação de times — devs mentorados hoje são sêniors." },
  { icon: "⏣", title: "AI-Driven Development", desc: "LLMOps, Local LLMs e Generative AI Tools integrados ao ciclo de desenvolvimento para máxima eficiência e experiências inteligentes." },
];

const CASES = [
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

const EARLIER_ROLES = [
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

const STATS = [
  { value: "15+", label: "Anos de experiência", detail: "Desde 2009" },
  { value: "13", label: "Empresas atendidas", detail: "Startups a Enterprise" },
  { value: "M+", label: "Usuários impactados", detail: "Escala nacional" },
  { value: "291", label: "GitHub Stars", detail: "ionic-start-theme" },
];

const STACK = {
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

const CERTS = [
  { name: "Fundamentos para uma Carreira em IA Generativa", issuer: "Microsoft & LinkedIn", icon: "🤖" },
  { name: "Explore Web Development with Angular", issuer: "LinkedIn Learning", icon: "🅰️" },
  { name: "Explore React.js Development", issuer: "LinkedIn Learning", icon: "⚛️" },
  { name: "Become a React Native Developer", issuer: "LinkedIn Learning", icon: "📱" },
  { name: "Career Essentials in GitHub Professional Certificate", issuer: "GitHub", icon: "🐙" },
];

const EDUCATION = [
  { degree: "Pós-Graduação", field: "Gestão em Mídias Digitais", school: "Centro Universitário Senac, São Paulo/SP", year: "2012" },
  { degree: "Graduação", field: "Tecnologia em Processamento de Dados", school: "Unisalesiano, Araçatuba/SP", year: "2006" },
];

const CLIENTS = ["Itaú", "Boticário", "TOTVS", "NTT Data", "Santander", "Walmart", "UOL", "Reclame Aqui", "ViajaNet", "Cnova/GPA"];

/* ─── Hooks ─── */
function useInView(ref, threshold = 0.1) {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), { threshold });
    o.observe(ref.current);
    return () => o.disconnect();
  }, [ref, threshold]);
  return v;
}

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const v = useInView(ref);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(36px)", transition: `all 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

/* ─── Main ─── */
export default function FirminoDevV3() {
  const [activeStack, setActiveStack] = useState("Full-Stack");
  const [hoveredCase, setHoveredCase] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [expandedCase, setExpandedCase] = useState(null);
  const [showAllRoles, setShowAllRoles] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const A = "#4263EB";
  const AL = "#5C7CFA";
  const AD = "#3B5BDB";

  return (
    <div style={{ background: "#050610", color: "#D8DAE8", minHeight: "100vh", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap" rel="stylesheet" />

      <style>{`
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        ::selection{background:${A}44;color:#fff}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#050610}::-webkit-scrollbar-thumb{background:#1a1d38;border-radius:3px}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(2deg)}}
        @keyframes pulse{0%,100%{opacity:.35}50%{opacity:.7}}
        @keyframes sweep{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
        @keyframes gridDrift{0%{background-position:0 0}100%{background-position:80px 80px}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .serif{font-family:'Playfair Display',Georgia,serif}
        .nav-link{color:#6B6F8A;text-decoration:none;font-size:13.5px;font-weight:500;letter-spacing:.4px;transition:color .25s;cursor:pointer}
        .nav-link:hover{color:#E2E4F0}
        .btn-primary{background:linear-gradient(135deg,${AD},${A});color:#fff;border:none;padding:12px 28px;border-radius:10px;font-size:13.5px;font-weight:600;cursor:pointer;transition:all .35s;letter-spacing:.4px;font-family:inherit}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 40px ${A}44}
        .btn-ghost{background:transparent;color:#A0A3BB;border:1px solid #1E2042;padding:12px 28px;border-radius:10px;font-size:13.5px;font-weight:600;cursor:pointer;transition:all .35s;font-family:inherit}
        .btn-ghost:hover{border-color:${A}66;color:#fff}
        .label{color:${AL};font-size:11.5px;font-weight:600;letter-spacing:3.5px;text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:14px}
        .label::before{content:'';width:28px;height:1px;background:linear-gradient(90deg,${A},transparent)}
        .gc{background:linear-gradient(155deg,rgba(12,14,28,.85),rgba(8,10,22,.95));border:1px solid #14163066;border-radius:18px;backdrop-filter:blur(8px);transition:all .45s cubic-bezier(.25,.46,.45,.94)}
        .gc:hover{border-color:${A}30;box-shadow:0 0 60px ${A}08,inset 0 1px 0 ${A}15}
        .tag{display:inline-block;padding:4px 11px;font-size:11px;font-weight:500;color:#7B7F9A;background:#0e1028;border:1px solid #191c38;border-radius:6px;letter-spacing:.3px}
        .tag-accent{background:${A}0A;border-color:${A}20;color:${AL}}
        .metric-box{text-align:center;padding:12px 16px;border-radius:10px;background:rgba(66,99,235,.06);border:1px solid rgba(66,99,235,.12)}
      `}</style>

      {/* BG */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-15%", right: "-8%", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle,${A}06 0%,transparent 65%)`, animation: "pulse 9s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-8%", left: "-12%", width: 650, height: 650, borderRadius: "50%", background: `radial-gradient(circle,${AL}05 0%,transparent 65%)`, animation: "pulse 11s ease-in-out infinite 4s" }} />
        <div style={{ position: "absolute", top: "40%", left: "50%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${AD}04 0%,transparent 60%)`, animation: "pulse 13s ease-in-out infinite 7s" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${A}05 1px,transparent 1px)`, backgroundSize: "80px 80px", animation: "gridDrift 30s linear infinite" }} />
      </div>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(5,6,16,.88)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: `1px solid ${scrolled ? "#14163044" : "transparent"}`, transition: "all .5s", padding: "0 clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 21, fontWeight: 800, color: "#fff", letterSpacing: -.8 }}>firmino</span>
            <span style={{ fontSize: 21, fontWeight: 300, color: AL }}>.dev</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV.map(n => <a key={n} className="nav-link">{n}</a>)}
            <button className="btn-primary" style={{ padding: "10px 22px" }}>Agendar Reunião</button>
          </div>
        </div>
      </nav>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ═══ HERO ═══ */}
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px clamp(24px,5vw,80px) 60px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 56, alignItems: "center" }}>
            <Reveal>
              <div>
                <div className="label">Senior Full-Stack Developer & Architect</div>
                <h1 style={{ fontSize: "clamp(42px,5vw,62px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: -2.5, marginBottom: 28 }}>
                  <span className="serif">Soluções digitais</span><br />
                  <span className="serif">que impulsionam </span>
                  <span className="serif" style={{ color: AL, fontStyle: "italic" }}>negócios</span>
                </h1>
                <p style={{ fontSize: 16, color: "#6B6F8A", lineHeight: 1.75, maxWidth: 500, marginBottom: 20 }}>
                  15+ anos criando aplicações web e mobile escaláveis para gigantes como Itaú, Boticário, TOTVS e Walmart. Especialista em Angular, React, Node.js e AI-Driven Development com LLMOps e Generative AI.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
                  {HERO_TAGS.map(t => <span key={t} className="tag tag-accent">{t}</span>)}
                </div>
                <div style={{ display: "flex", gap: 14 }}>
                  <button className="btn-primary">Agendar Reunião →</button>
                  <button className="btn-ghost">Ver Projetos</button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={.18}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="gc" style={{ width: 340, padding: 0, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -1, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg,transparent,${A}55,transparent)` }} />
                  <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #14163044", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: `linear-gradient(135deg,${A},${AL})`, boxShadow: `0 0 12px ${A}44` }} />
                      <span style={{ fontSize: 13, color: "#7B7F9A", fontWeight: 500 }}>J. H. Firmino & CIA LTDA</span>
                    </div>
                    <span style={{ fontSize: 18, color: "#2a2d4a" }}>↗</span>
                  </div>
                  <div style={{ padding: "36px 24px 40px", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                    <div style={{ width: 90, height: 90, borderRadius: 22, background: `linear-gradient(145deg,${AD}22,${A}11)`, border: `1px solid ${A}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, animation: "float 7s ease-in-out infinite", color: AL }}>
                      ⟨/⟩
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div className="serif" style={{ fontSize: 30, color: "#fff", fontWeight: 500 }}>Full-Stack</div>
                      <div className="serif" style={{ fontSize: 30, color: AL, fontStyle: "italic" }}>AI-Driven</div>
                    </div>
                    <p style={{ fontSize: 12.5, color: "#555876", textAlign: "center", lineHeight: 1.6, padding: "0 8px" }}>
                      Angular · React · Next.js · Node.js · Python<br />LLMOps · Local LLMs · Generative AI Tools
                    </p>
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, overflow: "hidden" }}>
                    <div style={{ width: "40%", height: "100%", background: `linear-gradient(90deg,transparent,${A},transparent)`, animation: "sweep 4s ease-in-out infinite" }} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ CLIENTS ═══ */}
        <Reveal>
          <section style={{ padding: "20px clamp(24px,5vw,80px) 60px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <p style={{ textAlign: "center", fontSize: 12, color: "#3a3d56", letterSpacing: 2, textTransform: "uppercase", marginBottom: 28, fontWeight: 500 }}>Empresas que confiam no meu trabalho</p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 36, alignItems: "center", padding: "28px 0", borderTop: "1px solid #11132a", borderBottom: "1px solid #11132a" }}>
                {CLIENTS.map((c, i) => (
                  <span key={i} style={{ fontSize: 14, fontWeight: 700, color: "#272a44", letterSpacing: 2, textTransform: "uppercase", transition: "color .3s", cursor: "default" }}
                    onMouseEnter={e => e.target.style.color = "#7B7F9A"}
                    onMouseLeave={e => e.target.style.color = "#272a44"}>{c}</span>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══ KEY ACHIEVEMENTS ═══ */}
        <section style={{ padding: "80px clamp(24px,5vw,80px)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div className="label" style={{ justifyContent: "center" }}>Realizações-Chave</div>
                <h2 className="serif" style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.15 }}>
                  Impacto mensurável em<br />
                  <span style={{ color: AL, fontStyle: "italic" }}>cada projeto</span>
                </h2>
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
              {KEY_ACHIEVEMENTS.map((a, i) => (
                <Reveal key={i} delay={i * .07}>
                  <div className="gc" style={{ padding: "36px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: "25%", right: "25%", height: 1, background: `linear-gradient(90deg,transparent,${A}44,transparent)` }} />
                    <div className="serif" style={{ fontSize: 48, fontWeight: 400, color: "#fff", letterSpacing: -2, lineHeight: 1 }}>{a.value}</div>
                    <div style={{ fontSize: 14, color: AL, fontWeight: 600, marginTop: 8 }}>{a.label}</div>
                    <div style={{ fontSize: 12, color: "#3a3d56", marginTop: 4 }}>{a.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SERVICES ═══ */}
        <section style={{ padding: "80px clamp(24px,5vw,80px)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div className="label" style={{ justifyContent: "center" }}>Serviços</div>
                <h2 className="serif" style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.15 }}>
                  Potencialize seu negócio com<br />
                  <span style={{ color: AL, fontStyle: "italic" }}>tecnologia de ponta</span>
                </h2>
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
              {SERVICES.map((s, i) => (
                <Reveal key={i} delay={i * .07}>
                  <div className="gc" style={{ padding: "32px 28px", position: "relative", overflow: "hidden", cursor: "default" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg,${A}12,${A}06)`, border: `1px solid ${A}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: AL, marginBottom: 20 }}>{s.icon}</div>
                    <h3 style={{ fontSize: 16.5, fontWeight: 700, color: "#E2E4F0", marginBottom: 10, letterSpacing: -.3 }}>{s.title}</h3>
                    <p style={{ fontSize: 13.5, color: "#5a5e78", lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CASES ═══ */}
        <section style={{ padding: "80px clamp(24px,5vw,80px)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "start" }}>
              <Reveal>
                <div style={{ position: "sticky", top: 120 }}>
                  <div className="label">Cases & Experiência</div>
                  <h2 className="serif" style={{ fontSize: "clamp(32px,4vw,46px)", fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.12, marginBottom: 20 }}>
                    Resultados reais em<br />
                    <span style={{ color: AL, fontStyle: "italic" }}>empresas líderes</span>
                  </h2>
                  <p style={{ fontSize: 15, color: "#555876", lineHeight: 1.75, marginBottom: 16, maxWidth: 380 }}>
                    Da otimização de performance à liderança técnica de equipes full-stack, cada projeto gera impacto mensurável.
                  </p>

                  {/* Stats mini */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
                    {STATS.map((s, i) => (
                      <div key={i} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(66,99,235,.04)", border: "1px solid rgba(66,99,235,.08)" }}>
                        <div className="serif" style={{ fontSize: 24, color: "#fff" }}>{s.value}</div>
                        <div style={{ fontSize: 11, color: "#555876" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <button className="btn-ghost" onClick={() => setShowAllRoles(!showAllRoles)}>
                    {showAllRoles ? "Ocultar anteriores ↑" : "Ver histórico completo →"}
                  </button>
                </div>
              </Reveal>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {CASES.map((c, i) => (
                  <Reveal key={i} delay={i * .1}>
                    <div className="gc"
                      onMouseEnter={() => setHoveredCase(i)}
                      onMouseLeave={() => setHoveredCase(null)}
                      onClick={() => setExpandedCase(expandedCase === i ? null : i)}
                      style={{ padding: 0, cursor: "pointer", position: "relative", overflow: "hidden", borderColor: hoveredCase === i ? `${A}40` : "#14163066" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${A},transparent)`, opacity: hoveredCase === i ? 1 : 0, transition: "opacity .4s" }} />
                      <div style={{ padding: "24px 28px 0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                          <div>
                            <h4 style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 4, letterSpacing: -.3 }}>{c.company}</h4>
                            <p style={{ fontSize: 13, color: "#555876" }}>{c.role}</p>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                            <span className="tag" style={{ fontSize: 10.5, color: "#555876" }}>{c.duration}</span>
                            <span style={{ fontSize: 18, color: hoveredCase === i ? AL : "#1E2042", transition: "all .35s", transform: hoveredCase === i ? "translate(2px,-2px)" : "none" }}>↗</span>
                          </div>
                        </div>
                        <p style={{ fontSize: 11.5, color: "#3a3d56", marginBottom: 12 }}>{c.period} · {c.location}</p>
                      </div>
                      <div style={{ padding: "0 28px 16px", display: "flex", gap: 12 }}>
                        {c.metrics.map((m, j) => (
                          <div key={j} className="metric-box" style={{ flex: 1 }}>
                            <div className="serif" style={{ fontSize: 26, fontWeight: 500, color: "#fff", letterSpacing: -1 }}>{m.value}</div>
                            <div style={{ fontSize: 11, color: "#555876", marginTop: 2 }}>{m.label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ maxHeight: expandedCase === i ? 300 : 0, overflow: "hidden", transition: "max-height .5s cubic-bezier(.25,.46,.45,.94)" }}>
                        <div style={{ padding: "0 28px 8px", display: "flex", flexDirection: "column", gap: 6 }}>
                          {c.bullets.map((b, j) => (
                            <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                              <div style={{ width: 4, height: 4, borderRadius: "50%", background: A, flexShrink: 0, marginTop: 7 }} />
                              <span style={{ fontSize: 13, color: "#7B7F9A", lineHeight: 1.5 }}>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ padding: "12px 28px 24px", display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {c.tags.map(t => <span key={t} className="tag">{t}</span>)}
                      </div>
                    </div>
                  </Reveal>
                ))}

                {/* Earlier roles */}
                <div style={{ maxHeight: showAllRoles ? 1200 : 0, overflow: "hidden", transition: "max-height .6s cubic-bezier(.25,.46,.45,.94)", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ padding: "16px 0 8px" }}>
                    <span style={{ fontSize: 12, color: "#3a3d56", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500 }}>Posições anteriores (2009–2018)</span>
                  </div>
                  {EARLIER_ROLES.map((r, i) => (
                    <div key={i} style={{ padding: "16px 20px", borderRadius: 12, border: "1px solid #11132a", background: "rgba(8,10,22,.5)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#A0A3BB" }}>{r.company}</span>
                        <span style={{ fontSize: 11, color: "#3a3d56" }}>{r.period}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#555876" }}>{r.role}</div>
                      {r.detail && <div style={{ fontSize: 12, color: "#3a3d56", marginTop: 4 }}>{r.detail}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ STACK ═══ */}
        <section style={{ padding: "80px clamp(24px,5vw,80px)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div className="label" style={{ justifyContent: "center" }}>Stack Técnica</div>
                <h2 className="serif" style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.15 }}>
                  Domínio full-stack que gera<br />
                  <span style={{ color: AL, fontStyle: "italic" }}>resultados consistentes</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={.1}>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
                {Object.keys(STACK).map(cat => (
                  <button key={cat} onClick={() => setActiveStack(cat)} style={{
                    background: activeStack === cat ? `linear-gradient(135deg,${AD},${A})` : "transparent",
                    color: activeStack === cat ? "#fff" : "#555876",
                    border: activeStack === cat ? "none" : "1px solid #191c38",
                    padding: "10px 20px", borderRadius: 10, fontSize: 12.5, fontWeight: 600, cursor: "pointer", transition: "all .3s", fontFamily: "inherit",
                    boxShadow: activeStack === cat ? `0 4px 20px ${A}33` : "none",
                  }}>{cat}</button>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, minHeight: 60 }}>
                {STACK[activeStack]?.map((t, i) => (
                  <div key={t + activeStack} className="gc" style={{
                    padding: "14px 26px", fontSize: 14.5, fontWeight: 500, color: "#A0A3BB", letterSpacing: -.2,
                    cursor: "default", animation: `fadeUp .4s ease ${i * .05}s both`,
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${A}44`; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#14163066"; e.currentTarget.style.color = "#A0A3BB"; }}>
                    {t}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ CERTIFICATIONS ═══ */}
        <section style={{ padding: "80px clamp(24px,5vw,80px)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div className="label" style={{ justifyContent: "center" }}>Certificações & Formação</div>
                <h2 className="serif" style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.15 }}>
                  Aprendizado<br />
                  <span style={{ color: AL, fontStyle: "italic" }}>contínuo</span>
                </h2>
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
              {/* Certifications */}
              <Reveal>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "#6B6F8A", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>Certificações</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {CERTS.map((c, i) => (
                      <div key={i} className="gc" style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${A}0A`, border: `1px solid ${A}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#D8DAE8", marginBottom: 2 }}>{c.name}</div>
                          <div style={{ fontSize: 12, color: "#555876" }}>{c.issuer}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              {/* Education */}
              <Reveal delay={.1}>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "#6B6F8A", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>Formação Acadêmica</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {EDUCATION.map((e, i) => (
                      <div key={i} className="gc" style={{ padding: "24px 24px", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: `linear-gradient(90deg,transparent,${A}33,transparent)` }} />
                        <div style={{ fontSize: 13, color: AL, fontWeight: 600, marginBottom: 4 }}>{e.degree}</div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: "#E2E4F0", marginBottom: 6 }}>{e.field}</div>
                        <div style={{ fontSize: 13, color: "#555876" }}>{e.school}</div>
                        <div style={{ fontSize: 12, color: "#3a3d56", marginTop: 4 }}>{e.year}</div>
                      </div>
                    ))}
                  </div>

                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "#6B6F8A", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 32, marginBottom: 20 }}>Idiomas</h3>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[
                      { lang: "Português", level: "Nativo", pct: 100 },
                      { lang: "Inglês", level: "Intermediário", pct: 55 },
                      { lang: "Espanhol", level: "Básico", pct: 25 },
                    ].map((l, i) => (
                      <div key={i} style={{ flex: 1, padding: "16px", borderRadius: 12, border: "1px solid #14163066", background: "rgba(8,10,22,.5)", textAlign: "center" }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#A0A3BB", marginBottom: 4 }}>{l.lang}</div>
                        <div style={{ fontSize: 11, color: "#555876", marginBottom: 8 }}>{l.level}</div>
                        <div style={{ height: 3, borderRadius: 2, background: "#14163066" }}>
                          <div style={{ height: "100%", borderRadius: 2, background: `linear-gradient(90deg,${AD},${AL})`, width: `${l.pct}%`, transition: "width 1s ease" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ AI CTA ═══ */}
        <section style={{ padding: "80px clamp(24px,5vw,80px)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <div className="gc" style={{ padding: "72px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -1, left: "15%", right: "15%", height: 1, background: `linear-gradient(90deg,transparent,${A}44,transparent)` }} />
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center top,${A}08,transparent 55%)`, pointerEvents: "none" }} />
                <div className="label" style={{ justifyContent: "center", position: "relative" }}>AI-Driven Development</div>
                <h2 className="serif" style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 400, letterSpacing: -1, lineHeight: 1.2, marginBottom: 20, position: "relative" }}>
                  Impulsione seu negócio com<br />
                  <span style={{ color: AL, fontStyle: "italic" }}>aplicações inteligentes</span>
                </h2>
                <p style={{ fontSize: 15, color: "#555876", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 36px", position: "relative" }}>
                  Da ideação ao deploy. LLMOps, Local LLMs e Generative AI Tools integrados ao ciclo de desenvolvimento full-stack. Acelere o time-to-market com segurança, performance e inovação.
                </p>
                <button className="btn-primary" style={{ position: "relative" }}>Agendar Reunião →</button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer style={{ padding: "80px clamp(24px,5vw,80px) 40px", borderTop: "1px solid #11132a" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 48, marginBottom: 56 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 16 }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>firmino</span>
                    <span style={{ fontSize: 20, fontWeight: 300, color: AL }}>.dev</span>
                  </div>
                  <p style={{ fontSize: 13.5, color: "#3a3d56", lineHeight: 1.75, maxWidth: 260 }}>
                    Desenvolvimento full-stack, arquitetura web e AI-Driven Development para empresas que exigem excelência técnica e inovação.
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: 12, fontWeight: 600, color: "#6B6F8A", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 22 }}>Empresa</h4>
                  {["Sobre", "Blog", "Cases", "Certificações", "Contato"].map(l => (
                    <a key={l} style={{ display: "block", fontSize: 13.5, color: "#3a3d56", textDecoration: "none", marginBottom: 14, cursor: "pointer", transition: "color .2s" }}
                      onMouseEnter={e => e.target.style.color = "#A0A3BB"}
                      onMouseLeave={e => e.target.style.color = "#3a3d56"}>{l}</a>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontSize: 12, fontWeight: 600, color: "#6B6F8A", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 22 }}>Serviços</h4>
                  {["Full-Stack Dev", "Mobile & PWA", "Arquitetura", "Tech Lead", "AI-Driven", "Performance"].map(l => (
                    <a key={l} style={{ display: "block", fontSize: 13.5, color: "#3a3d56", textDecoration: "none", marginBottom: 14, cursor: "pointer", transition: "color .2s" }}
                      onMouseEnter={e => e.target.style.color = "#A0A3BB"}
                      onMouseLeave={e => e.target.style.color = "#3a3d56"}>{l}</a>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontSize: 12, fontWeight: 600, color: "#6B6F8A", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 22 }}>Contato</h4>
                  <p style={{ fontSize: 13.5, color: "#3a3d56", marginBottom: 10 }}>✉ firminoata@gmail.com</p>
                  <p style={{ fontSize: 13.5, color: "#3a3d56", marginBottom: 10 }}>☎ (11) 97083-6907</p>
                  <p style={{ fontSize: 13.5, color: "#3a3d56", marginBottom: 22 }}>📍 São Paulo, Brasil</p>
                  <div style={{ display: "flex", gap: 10 }}>
                    {["LinkedIn", "GitHub"].map(s => (
                      <span key={s} style={{ padding: "7px 16px", fontSize: 12, fontWeight: 500, color: "#3a3d56", border: "1px solid #191c38", borderRadius: 8, cursor: "pointer", transition: "all .25s" }}
                        onMouseEnter={e => { e.target.style.borderColor = `${A}44`; e.target.style.color = "#A0A3BB"; }}
                        onMouseLeave={e => { e.target.style.borderColor = "#191c38"; e.target.style.color = "#3a3d56"; }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "1px solid #11132a" }}>
                <span style={{ fontSize: 12.5, color: "#272a44" }}>© 2026 J. H. Firmino & CIA LTDA. Todos os direitos reservados.</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E44" }} />
                  <span style={{ fontSize: 12, color: "#272a44" }}>Disponível para projetos</span>
                </div>
              </div>
            </Reveal>
          </div>
        </footer>

      </div>
    </div>
  );
}
