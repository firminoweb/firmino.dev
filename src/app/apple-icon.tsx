import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b0e2d 0%, #1a2160 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <span style={{ fontSize: 64, fontWeight: 800, color: "#fff", letterSpacing: -2 }}>f</span>
          <span style={{ fontSize: 64, fontWeight: 300, color: "#5c7cfa" }}>.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
