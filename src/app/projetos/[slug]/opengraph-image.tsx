import { ImageResponse } from "next/og";
import { getFonts } from "@/app/social/_lib/fonts";
import { C } from "@/app/social/_lib/brand";
import { getProjectBySlug } from "@/data/portfolio";

// O logo do cliente tem 96px e virava um card borrado quando o case era
// compartilhado. Aqui a prévia é gerada com o título e os números do case.
export const alt = "Case da firmino.dev";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const fonts = await getFonts();

  const title = project?.title ?? "Cases da firmino.dev";
  const eyebrow = project
    ? project.kind === "carreira"
      ? `Trajetória do fundador · ${project.client}`
      : `Case · ${project.segment} · ${project.client}`
    : "Cases de clientes";
  const metrics = project?.metrics.slice(0, 2) ?? [];

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
              fontSize: title.length > 60 ? 50 : 60,
              fontWeight: 700,
              color: C.white,
              lineHeight: 1.12,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {metrics.length > 0 && (
            <div style={{ display: "flex", gap: 16 }}>
              {metrics.map((m) => (
                <div
                  key={m.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "14px 22px",
                    borderRadius: 14,
                    background: "rgba(92,124,250,0.10)",
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <span style={{ fontSize: 32, fontWeight: 700, color: C.white }}>{m.value}</span>
                  <span style={{ fontSize: 17, color: C.muted }}>{m.label}</span>
                </div>
              ))}
            </div>
          )}
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
          <span>{project?.role ?? "Cases de clientes"}</span>
          <span style={{ color: C.accentDeep }}>firmino.dev/projetos</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
