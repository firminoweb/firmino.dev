#!/usr/bin/env node
/**
 * Normaliza logos de clientes em public/images/logos/:
 * - 96x96, contain, fundo transparente
 * - WebP qualidade 90, lossless quando faz sentido
 *
 * Uso: node scripts/optimize-logos.mjs
 */
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const LOGOS_DIR = new URL("../public/images/logos/", import.meta.url).pathname;
const TARGET_SIZE = 96;
const SUPPORTED = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const files = await readdir(LOGOS_DIR);

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!SUPPORTED.has(ext)) continue;

  const name = basename(file, ext);
  const input = join(LOGOS_DIR, file);
  const output = join(LOGOS_DIR, `${name}.webp`);

  const before = (await stat(input)).size;

  const buffer = await sharp(input)
    .resize(TARGET_SIZE, TARGET_SIZE, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toBuffer();

  await sharp(buffer).toFile(output);
  const after = (await stat(output)).size;

  console.log(
    `${file.padEnd(24)} → ${name}.webp` +
      `  ${(before / 1024).toFixed(1)}KB → ${(after / 1024).toFixed(1)}KB`,
  );
}
