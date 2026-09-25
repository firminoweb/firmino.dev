import { llmsTxt } from "@/lib/markdown";

/* /llms.txt (https://llmstxt.org): resumo do site em Markdown para IAs e agentes. */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
