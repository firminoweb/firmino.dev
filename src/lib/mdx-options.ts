import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";

const prettyCodeOptions: Options = {
  // Dual theme: light é o tema principal do site, dark é opt-in. Com um objeto
  // de temas o shiki emite --shiki-light/--shiki-dark por token e não escreve
  // `color`; quem escolhe é o CSS em blog/[slug]/prose.css.
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
  defaultLang: "plaintext",
};

export const mdxOptions: MDXRemoteProps["options"] = {
  mdxOptions: {
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
};
