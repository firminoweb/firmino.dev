import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/ui";
import type { Project } from "@/types";

/** Card de case com logo, resumo e métricas. Usado na home e nas páginas de solução. */
export function CaseCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projetos/${project.slug}`}
      className="gc case-card p-0 cursor-pointer relative overflow-hidden block"
    >
      <div className="case-glow-line" />
      <div className="px-5 sm:px-7 pt-6">
        <div className="flex justify-between items-start mb-1 gap-3">
          <div className="flex items-start gap-3 min-w-0">
            {project.logo && (
              <div className="project-brand">
                <Image src={project.logo} alt={project.client} width={44} height={44} />
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <Tag accent className="!text-[10px]">
                  {project.segment}
                </Tag>
                {project.year && (
                  <span className="text-[11px] text-text-muted">{project.year}</span>
                )}
              </div>
              <h3 className="text-[17px] sm:text-[19px] font-bold text-brand mb-1 tracking-tight">
                {project.title}
              </h3>
              <p className="text-[13px] text-text-dim">
                {project.client} · {project.role}
              </p>
            </div>
          </div>
          <span className="case-arrow shrink-0">↗</span>
        </div>
        <p className="text-[13px] text-text-subtle leading-[1.6] mt-2 mb-3">
          {project.summary}
        </p>
      </div>

      <div className="px-5 sm:px-7 pb-6 flex flex-wrap gap-3">
        {project.metrics.map((m, j) => (
          <div key={j} className="metric-box flex-1 min-w-[100px]">
            <div className="font-serif text-[22px] sm:text-[26px] font-medium text-brand tracking-tight">
              {m.value}
            </div>
            <div className="text-[11px] text-text-dim mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>
    </Link>
  );
}
