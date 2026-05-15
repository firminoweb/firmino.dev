import clsx from "clsx";

interface SectionLabelProps {
  children: React.ReactNode;
  center?: boolean;
  prominent?: boolean;
}

export function SectionLabel({ children, center = false, prominent = false }: SectionLabelProps) {
  return (
    <div className={clsx("label", prominent && "label-prominent", center && "justify-center")}>
      {children}
    </div>
  );
}
