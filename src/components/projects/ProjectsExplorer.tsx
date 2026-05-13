"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Reveal, Tag, Button } from "@/components/ui";
import {
  PROJECTS,
  PROJECT_TYPE_LABELS,
  PAST_CLIENTS,
} from "@/data/portfolio";
import type { ProjectType } from "@/types";

type FilterValue = ProjectType | "all";

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "corporate", label: PROJECT_TYPE_LABELS.corporate },
  { value: "freelance", label: PROJECT_TYPE_LABELS.freelance },
  { value: "personal", label: PROJECT_TYPE_LABELS.personal },
  { value: "oss", label: PROJECT_TYPE_LABELS.oss },
];

export function ProjectsExplorer() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [showPastClients, setShowPastClients] = useState(false);

  const filtered = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.type === filter)),
    [filter],
  );

  const availableFilters = useMemo(() => {
    const types = new Set(PROJECTS.map((p) => p.type));
    return FILTERS.filter((f) => f.value === "all" || types.has(f.value));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {availableFilters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={clsx(
              "stack-tab",
              filter === f.value ? "stack-tab-active" : "stack-tab-inactive",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <Link
              href={`/projetos/${p.slug}`}
              className="gc case-card p-6 block relative overflow-hidden h-full"
            >
              <div className="case-glow-line" />
              <div className="flex items-start gap-3 mb-3">
                {p.logo && (
                  <div className="project-brand">
                    <Image src={p.logo} alt={p.client} width={44} height={44} />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Tag accent className="!text-[10px]">
                      {PROJECT_TYPE_LABELS[p.type]}
                    </Tag>
                    <span className="text-[11px] text-text-dark">{p.year}</span>
                  </div>
                  <h2 className="text-[18px] font-bold text-brand mb-1 tracking-tight">
                    {p.title}
                  </h2>
                  <p className="text-[13px] text-text-dim">
                    {p.client} · {p.role}
                  </p>
                </div>
              </div>
              <p className="text-[13.5px] text-text-subtle leading-[1.65] mb-4">
                {p.summary}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.slice(0, 5).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="gc px-6 py-10 text-center">
          <p className="text-sm text-text-dim">
            Em breve — projetos desta categoria serão publicados aqui.
          </p>
        </div>
      )}

      <div className="flex justify-center mt-4">
        <Button variant="ghost" onClick={() => setShowPastClients(!showPastClients)}>
          {showPastClients ? "Ocultar clientes ↑" : "Ver demais clientes →"}
        </Button>
      </div>

      <div
        className={clsx(
          "overflow-hidden transition-all duration-600 ease-[cubic-bezier(.25,.46,.45,.94)] flex flex-col gap-2.5",
          showPastClients ? "max-h-[1400px]" : "max-h-0",
        )}
      >
        <div className="pt-4 pb-2">
          <span className="text-xs text-text-dark tracking-[1.5px] uppercase font-medium">
            Demais clientes (2009 – 2018)
          </span>
        </div>
        {PAST_CLIENTS.map((c, i) => (
          <div key={i} className="earlier-role-card">
            <div className="flex items-center gap-3">
              <div className="client-mono shrink-0">
                {c.logo ? (
                  <Image
                    src={c.logo}
                    alt={c.company}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span>{c.company.charAt(0)}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-0.5">
                  <span className="text-sm font-semibold text-text-nav">{c.company}</span>
                  <span className="text-[11px] text-text-dark">{c.period}</span>
                </div>
                {c.detail && <div className="text-xs text-text-dark mt-0.5">{c.detail}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
