import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";

interface PostNavProps {
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
}

export function PostNav({ prev, next }: PostNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Navegação entre artigos"
      className="mt-16 pt-10 border-t border-border-subtle grid gap-4 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="gc block py-6 px-7 hover:border-accent-light/30 transition-colors group"
          rel="prev"
        >
          <span className="block text-[11.5px] text-text-dim uppercase tracking-[1.5px] mb-2">
            ← Post anterior
          </span>
          <span className="block font-serif text-[18px] leading-[1.3] text-text-light group-hover:text-accent-light transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="gc block py-6 px-7 hover:border-accent-light/30 transition-colors group sm:text-right"
          rel="next"
        >
          <span className="block text-[11.5px] text-text-dim uppercase tracking-[1.5px] mb-2">
            Próximo post →
          </span>
          <span className="block font-serif text-[18px] leading-[1.3] text-text-light group-hover:text-accent-light transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block" />
      )}
    </nav>
  );
}
