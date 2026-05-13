import Image from "next/image";
import type { Project } from "@/types";

interface ProjectCoverProps {
  project: Project;
}

function hashAccent(slug: string): string {
  // Deterministic accent: rotate hue based on slug, keep it on-brand (blue-violet range).
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  const hue = 215 + (hash % 50); // 215–265 (blue → violet)
  return `hsl(${hue} 70% 56%)`;
}

export function ProjectCover({ project }: ProjectCoverProps) {
  if (project.cover) {
    return (
      <div className="project-cover">
        <Image
          src={project.cover}
          alt={`${project.title} — ${project.client}`}
          fill
          sizes="(max-width: 920px) 100vw, 920px"
          priority
          className="object-cover"
        />
      </div>
    );
  }

  const accent = project.accent ?? hashAccent(project.slug);

  return (
    <div
      className="project-cover project-cover-fallback"
      style={
        {
          ["--cover-accent"]: accent,
          ["--cover-accent-soft"]: `${accent}33`,
        } as React.CSSProperties
      }
    >
      <div className="project-cover-grid" />
      <div className="project-cover-glow" />
      {project.logo && (
        <div className="project-cover-logo">
          <Image
            src={project.logo}
            alt={project.client}
            width={72}
            height={72}
            sizes="72px"
          />
        </div>
      )}
      <div className="project-cover-meta">
        <span>{project.client}</span>
        <span>·</span>
        <span>{project.year}</span>
      </div>
      <div className="project-cover-title">
        {project.title}
      </div>
    </div>
  );
}
