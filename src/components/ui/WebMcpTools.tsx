"use client";

import { useEffect } from "react";
import type { ModelContext } from "@/lib/webmcp";

/**
 * Registra as ferramentas WebMCP (lib/webmcp.ts) para agentes de IA no
 * navegador. O import é dinâmico: em navegador sem a API, o módulo das
 * ferramentas nem é baixado.
 */
export function WebMcpTools() {
  useEffect(() => {
    const mc = ((document as unknown as { modelContext?: ModelContext }).modelContext ??
      (navigator as unknown as { modelContext?: ModelContext }).modelContext);
    if (!mc) return;

    const controller = new AbortController();
    import("@/lib/webmcp").then(({ registerTools }) => registerTools(mc, controller.signal));
    return () => controller.abort();
  }, []);

  return null;
}
