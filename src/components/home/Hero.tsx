import Link from "next/link";
import { Reveal, Button, Tag, SectionLabel } from "@/components/ui";
import { HERO_TAGS } from "@/data/portfolio";
import { getAllPosts, type BlogPostMeta } from "@/lib/blog";

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return DATE_FORMATTER.format(new Date(y, (m ?? 1) - 1, d ?? 1));
}

export function Hero() {
  const [latestPost] = getAllPosts();

  return (
    <section id="home" className="section-padding-hero">
      <div className="content-container w-full grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-10 lg:gap-14 items-center">
        <Reveal>
          <div>
            <SectionLabel prominent>Engenharia de software · Web · Mobile · IA</SectionLabel>
            <h1 className="hero-heading">
              <span className="font-serif">Construímos </span>
              <span className="font-serif text-accent-light italic">software</span>
              <span className="font-serif">.</span><br />
              <span className="font-serif">Reforçamos </span>
              <span className="font-serif text-accent-light italic">times</span>
              <span className="font-serif">.</span>
            </h1>
            <p className="text-base text-text-muted leading-[1.75] max-w-[500px] mb-5">
              Software construído pra durar, com time que responde. 15+ anos entregando para Itaú, Boticário, TOTVS e NTT Data.
            </p>
            <div className="flex flex-wrap gap-2 mb-9">
              {HERO_TAGS.map((t) => (
                <Tag key={t} accent>{t}</Tag>
              ))}
            </div>
            <div>
              <div className="flex flex-wrap gap-3.5">
                <Link href="/contato">
                  <Button>Quero uma proposta →</Button>
                </Link>
                <Link href="/projetos">
                  <Button variant="ghost">Ver casos</Button>
                </Link>
              </div>
              <p className="text-[11.5px] text-text-dim mt-3">
                Resposta em 24h · sem compromisso
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="flex justify-center">
            {latestPost ? <LatestPostCard post={latestPost} /> : <FallbackCard />}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LatestPostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="gc w-full max-w-[340px] p-0 relative overflow-hidden block group"
    >
      <div className="glow-line-top-hero" />
      <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border-card">
        <div className="flex items-center gap-2.5">
          <div className="hero-card-dot" />
          <span className="text-[13px] text-text-subtle font-medium">firmino.dev/blog</span>
        </div>
        <span className="text-lg text-text-darker group-hover:text-accent-light transition-colors">↗</span>
      </div>
      <div className="flex flex-col gap-4 px-6 pt-7 pb-8">
        <span className="text-[10.5px] text-accent-light font-semibold tracking-[2.5px] uppercase">
          Último post
        </span>
        <h3 className="font-serif text-[22px] leading-[1.2] text-text-light group-hover:text-accent-light transition-colors line-clamp-3">
          {post.title}
        </h3>
        {post.description && (
          <p className="text-[13px] text-text-dim leading-[1.65] line-clamp-3">
            {post.description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-2 text-[11.5px] text-text-dim uppercase tracking-[1.5px]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="text-text-dim/40">·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
        <div className="hero-sweep-bar animate-sweep" />
      </div>
    </Link>
  );
}

function FallbackCard() {
  return (
    <div className="gc w-full max-w-[340px] p-0 relative overflow-hidden">
      <div className="glow-line-top-hero" />
      <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border-card">
        <div className="flex items-center gap-2.5">
          <div className="hero-card-dot" />
          <span className="text-[13px] text-text-subtle font-medium">firmino.dev</span>
        </div>
        <span className="text-lg text-text-darker">↗</span>
      </div>
      <div className="flex flex-col items-center gap-5 px-6 pt-9 pb-10">
        <div className="hero-card-icon animate-float">⟨/⟩</div>
        <div className="text-center">
          <div className="font-serif text-[30px] text-brand font-medium">Engenharia</div>
          <div className="font-serif text-[30px] text-accent-light italic">AI-Driven</div>
        </div>
        <p className="text-[12.5px] text-text-dim text-center leading-[1.6] px-2">
          Angular · React · React Native · Next.js · Node.js<br /> Generative AI · LLM Applications · AI-Driven
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
        <div className="hero-sweep-bar animate-sweep" />
      </div>
    </div>
  );
}
