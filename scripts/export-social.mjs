// Exports the social-media assets to public/social/ as PNGs.
//
// Requires the app to be running (next dev or next start). Override the base
// URL with SOCIAL_BASE_URL if you serve on another host/port.
//
//   yarn dev          # in one terminal
//   yarn export:social
//
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.SOCIAL_BASE_URL || "http://localhost:3000";
const OUT = join(process.cwd(), "public", "social");

/** [route, output filename] */
const JOBS = [
  // Avatars / iconography — square brand mark
  ["/social/avatar?size=400", "avatar-400.png"], // LinkedIn / X
  ["/social/avatar?size=320", "avatar-320.png"], // Instagram
  ["/social/avatar?size=460", "avatar-460.png"], // GitHub org
  // Hero banners
  ["/social/banner?format=linkedin", "linkedin-banner-1584x396.png"],
  ["/social/banner?format=twitter", "twitter-header-1500x500.png"],
  ["/social/banner?format=instagram", "instagram-post-1080x1080.png"],
  ["/social/banner?format=cover", "cover-1280x640.png"],
];

await mkdir(OUT, { recursive: true });

let ok = 0;
for (const [route, file] of JOBS) {
  const res = await fetch(BASE + route);
  if (!res.ok) {
    console.error(`✗ ${file} — ${res.status} ${res.statusText} (${route})`);
    process.exitCode = 1;
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(join(OUT, file), buf);
  console.log(`✓ ${file.padEnd(34)} ${(buf.length / 1024).toFixed(0)} KB`);
  ok++;
}

console.log(`\n${ok}/${JOBS.length} assets → public/social/`);
