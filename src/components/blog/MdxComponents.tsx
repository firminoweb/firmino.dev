import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

type AnchorProps = ComponentPropsWithoutRef<"a">;

export const mdxComponents = {
  a: ({ href = "#", ...props }: AnchorProps) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return <Link href={href} {...(props as AnchorProps)} />;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  },
};
