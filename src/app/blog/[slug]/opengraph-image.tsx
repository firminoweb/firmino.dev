import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getFonts } from "@/app/social/_lib/fonts";
import { C, COPY } from "@/app/social/_lib/brand";
import { getPostBySlug } from "@/lib/blog";

// nodejs (não edge): getPostBySlug lê o MDX do filesystem
export const alt = "Artigo do blog da firmino.dev";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return DATE_FORMATTER.format(new Date(y, (m ?? 1) - 1, d ?? 1));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // Posts com ogImage no frontmatter servem o PNG estático tal e qual
  // (mantém uma única tag og:image, sem card gerado).
  if (post?.ogImage) {
    const file = path.join(process.cwd(), "public", post.ogImage.replace(/^\/+/, ""));
    const data = await readFile(file);
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const fonts = await getFonts();

  const title = post?.title ?? "Blog da firmino.dev";
  const eyebrow = post?.tags?.[0]
    ? `Blog · ${post.tags[0]}`
    : "Blog · Engenharia de Software";
  const footerLeft = post
    ? `${formatDate(post.date)} · ${post.readingTime.replace("read", "de leitura")}`
    : COPY.footerLeft;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            `radial-gradient(ellipse at top right, #1a2160 0%, transparent 55%),` +
            `radial-gradient(ellipse at bottom left, #2a1f5e 0%, transparent 60%), ${C.bgB}`,
          color: "#e4e6f2",
          fontFamily: "DM Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 36, fontWeight: 800, color: C.white, letterSpacing: -1 }}>
            firmino
          </span>
          <span style={{ fontSize: 36, fontWeight: 400, color: C.accentDeep }}>.dev</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: C.accent,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: title.length > 60 ? 54 : 64,
              fontWeight: 700,
              color: C.white,
              lineHeight: 1.12,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 28,
            borderTop: `1px solid ${C.border}`,
            color: C.footer,
            fontSize: 18,
          }}
        >
          <span>{footerLeft}</span>
          <span style={{ color: C.accentDeep }}>firmino.dev/blog</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
