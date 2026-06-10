/**
 * Loads the brand fonts (DM Sans + Playfair Display) as TTF buffers for Satori
 * / next/og. Google Fonts only returns a single TrueType face (instead of the
 * woff2 unicode-range split, which Satori can't parse) when the `text=` subset
 * param is present — so we pass a fixed superset of every glyph we render.
 *
 * Result is memoised at module scope; the four faces are fetched once per
 * server process.
 */

const ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" +
  "ÀÁÂÃÉÊÍÓÔÕÚÇàáâãéêíóôõúç" +
  "0123456789 .,:;·/+-–&()'" +
  '?!"“”‘’—%';

type FontStyle = "normal" | "italic";

export interface LoadedFont {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 600 | 700 | 800;
  style: FontStyle;
}

async function loadFont(
  family: string,
  weight: LoadedFont["weight"],
  style: FontStyle = "normal",
): Promise<LoadedFont> {
  const axis =
    style === "italic" ? `ital,wght@1,${weight}` : `wght@${weight}`;
  const url =
    `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:${axis}` +
    `&text=${encodeURIComponent(ALPHABET)}`;

  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/);
  if (!match) {
    throw new Error(`Could not resolve a TTF for ${family} ${weight} ${style}`);
  }
  const data = await (await fetch(match[1])).arrayBuffer();
  return { name: family, data, weight, style };
}

let cache: Promise<LoadedFont[]> | null = null;

/** All faces used across the social assets. Cached after first call. */
export function getFonts(): Promise<LoadedFont[]> {
  if (!cache) {
    cache = Promise.all([
      loadFont("DM Sans", 400),
      loadFont("DM Sans", 500),
      loadFont("DM Sans", 700),
      loadFont("DM Sans", 800),
      loadFont("Playfair Display", 600, "italic"),
    ]);
  }
  return cache;
}
