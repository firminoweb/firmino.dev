import { getAgentSkills, skillDigest, skillUrl, SKILLS_SCHEMA } from "@/lib/agent-skills";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    $schema: SKILLS_SCHEMA,
    skills: getAgentSkills().map((s) => ({
      name: s.name,
      type: "skill-md",
      description: s.description,
      url: skillUrl(s.name),
      digest: skillDigest(s.raw),
    })),
  });
}
