import { getAgentSkills } from "@/lib/agent-skills";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAgentSkills().map((s) => ({ name: s.name }));
}

export async function GET(_: Request, ctx: RouteContext<"/.well-known/agent-skills/[name]/SKILL.md">) {
  const { name } = await ctx.params;
  const skill = getAgentSkills().find((s) => s.name === name);
  if (!skill) return new Response(null, { status: 404 });
  return new Response(skill.raw, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
