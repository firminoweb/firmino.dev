import clsx from "clsx";

interface TagProps {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export function Tag({ children, accent = false, className }: TagProps) {
  return (
    <span className={clsx("tag", accent && "tag-accent", className)}>
      {children}
    </span>
  );
}
