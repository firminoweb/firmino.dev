import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "ghost";

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  /** When set, the button renders as a styled <a>/<Link> — avoids invalid
      <a><button> nesting and keeps a single, correctly-sized touch target. */
  href?: string;
}

type ButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

export function Button({ variant = "primary", className, children, href, ...rest }: ButtonProps) {
  const cls = clsx(
    variant === "primary" ? "btn-primary" : "btn-ghost",
    "inline-flex items-center justify-center",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
