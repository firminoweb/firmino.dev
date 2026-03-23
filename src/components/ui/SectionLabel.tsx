import clsx from "clsx";

interface SectionLabelProps {
  children: React.ReactNode;
  center?: boolean;
}

export function SectionLabel({ children, center = false }: SectionLabelProps) {
  return (
    <div className={clsx("label", center && "justify-center")}>
      {children}
    </div>
  );
}
