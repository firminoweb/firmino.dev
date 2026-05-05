import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "firmino.dev — Engenharia de Software, Mobile & Generative AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
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
            "radial-gradient(ellipse at top right, #1a2160 0%, transparent 55%), radial-gradient(ellipse at bottom left, #2a1f5e 0%, transparent 60%), #0b0e2d",
          color: "#e4e6f2",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: -1 }}>
            firmino
          </span>
          <span style={{ fontSize: 36, fontWeight: 300, color: "#5c7cfa" }}>.dev</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#6d8cff",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Engenharia de Software · Web · Mobile · IA
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 500,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: -2.5,
              maxWidth: 980,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Desenvolvemos soluções&nbsp;
            <span style={{ color: "#5c7cfa", fontStyle: "italic" }}>que transformam negócios</span>
          </div>
          <div style={{ fontSize: 22, color: "#8e92b0", lineHeight: 1.4, maxWidth: 920 }}>
            Angular · React · React Native · Next.js · Node.js · Generative AI · LLM Applications
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 28,
            borderTop: "1px solid #1e2145",
            color: "#737699",
            fontSize: 18,
          }}
        >
          <span>15+ anos · Itaú · Boticário · TOTVS · NTT Data</span>
          <span style={{ color: "#5c7cfa" }}>firmino.dev</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
