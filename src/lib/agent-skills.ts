import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import matter from "gray-matter";

/* ════════════════════════════════════════════
   Agent Skills · firmino.dev
   Skills em content/agent-skills/<name>.md,
   publicadas em /.well-known/agent-skills/
   (Agent Skills Discovery v0.2.0).
   ════════════════════════════════════════════ */

const SKILLS_DIR = path.join(process.cwd(), "content/agent-skills");

export const SKILLS_SCHEMA = "https://schemas.agentskills.io/discovery/0.2.0/schema.json";

export interface AgentSkill {
  name: string;
  description: string;
  /** Conteúdo exato servido como SKILL.md (o digest é calculado sobre ele). */
  raw: string;
}

export function getAgentSkills(): AgentSkill[] {
  if (!fs.existsSync(SKILLS_DIR)) return [];
  return fs
    .readdirSync(SKILLS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(SKILLS_DIR, file), "utf8");
      const { data } = matter(raw);
      const name = file.replace(/\.md$/, "");
      if (data.name !== name) {
        throw new Error(`[agent-skills] ${file}: frontmatter name deve ser "${name}"`);
      }
      return { name, description: String(data.description ?? ""), raw };
    });
}

export function skillUrl(name: string): string {
  return `/.well-known/agent-skills/${name}/SKILL.md`;
}

export function skillDigest(raw: string): string {
  return `sha256:${createHash("sha256").update(raw, "utf8").digest("hex")}`;
}
