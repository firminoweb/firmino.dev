import { ImageResponse } from "next/og";
import { getFonts } from "../_lib/fonts";
import { bannerBackground, C, COPY } from "../_lib/brand";

export const runtime = "nodejs";

/**
 * Bold-typographic hero banner, rendered at the right dimensions per network.
 *   GET /social/banner?format=linkedin | twitter | instagram | cover
 *
 * `footer` formats (square/2:1) have room for the credibility strip and keep
 * the content left-aligned. The short wide banners (linkedin/twitter) drop the
 * strip and the subline (redundant with the eyebrow) and anchor everything to
 * the RIGHT: both platforms overlay the profile photo on the left of the
 * cover, so the whole left region is unsafe for text — the decorative
 * watermark moves there instead.
 */

type Format = {
  w: number;
  h: number;
  pad: number;
  wm: number; // wordmark
  eb: number; // eyebrow
  hl: number; // headline
  sb: number; // subline
  wmark: number; // watermark glyph
  footer: boolean;
};

const FORMATS: Record<string, Format> = {
  linkedin: { w: 1584, h: 396, pad: 84, wm: 26, eb: 14, hl: 54, sb: 18, wmark: 520, footer: false },
  twitter: { w: 1500, h: 500, pad: 84, wm: 28, eb: 15, hl: 70, sb: 20, wmark: 640, footer: false },
  instagram: { w: 1080, h: 1080, pad: 96, wm: 32, eb: 18, hl: 100, sb: 26, wmark: 940, footer: true },
  cover: { w: 1280, h: 640, pad: 80, wm: 32, eb: 16, hl: 80, sb: 22, wmark: 720, footer: true },
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("format") || "cover";
  const f = FORMATS[key] ?? FORMATS.cover;
  // Wide banners (no footer): profile avatar overlays the left → content goes right
  const wide = !f.footer;
  const fonts = await getFonts();

  const Wordmark = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ fontFamily: "DM Sans", fontWeight: 800, fontSize: f.wm, color: C.white, letterSpacing: -f.wm * 0.02 }}>
        firmino
      </span>
      <span style={{ fontFamily: "DM Sans", fontWeight: 400, fontSize: f.wm, color: C.accent }}>.dev</span>
    </div>
  );

  const Main = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <span
        style={{
          fontFamily: "DM Sans",
          fontWeight: 700,
          fontSize: f.eb,
          letterSpacing: f.eb * 0.26,
          textTransform: "uppercase",
          color: C.accent,
          marginBottom: f.hl * 0.3,
        }}
      >
        {COPY.eyebrow}
      </span>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontFamily: "DM Sans", fontWeight: 800, fontSize: f.hl, lineHeight: 1.02, color: C.white, letterSpacing: -f.hl * 0.03 }}>
          {COPY.hlLead}
        </span>
        <div style={{ display: "flex", alignItems: "baseline", gap: f.hl * 0.22 }}>
          <span style={{ fontFamily: "Playfair Display", fontStyle: "italic", fontWeight: 600, fontSize: f.hl, lineHeight: 1.04, color: C.accentDeep, letterSpacing: -f.hl * 0.01 }}>
            {COPY.hlAccent}
          </span>
          <span style={{ fontFamily: "DM Sans", fontWeight: 800, fontSize: f.hl, lineHeight: 1.02, color: C.white, letterSpacing: -f.hl * 0.03 }}>
            {COPY.hlTail}
          </span>
        </div>
      </div>

      {/* Subline only on footer formats — on the wide banners it just repeated the eyebrow */}
      {!wide && (
        <span style={{ fontFamily: "DM Sans", fontWeight: 500, fontSize: f.sb, color: C.muted, letterSpacing: f.sb * 0.04, marginTop: f.hl * 0.34 }}>
          {COPY.subline}
        </span>
      )}
    </div>
  );

  const Watermark = (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: wide ? "flex-start" : "flex-end" }}>
      <span
        style={{
          fontFamily: "Playfair Display",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: f.wmark,
          lineHeight: 1,
          color: C.accentDeep,
          opacity: 0.07,
          ...(wide ? { marginLeft: -f.wmark * 0.1 } : { marginRight: -f.wmark * 0.16 }),
        }}
      >
        f.
      </span>
    </div>
  );

  const Footer = (
    <div
      style={{
        position: "absolute",
        bottom: f.pad,
        left: f.pad,
        right: f.pad,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: `1px solid ${C.border}`,
        paddingTop: f.pad * 0.34,
        fontFamily: "DM Sans",
        fontWeight: 500,
        fontSize: f.sb * 0.86,
        color: C.footer,
      }}
    >
      <span>{COPY.footerLeft}</span>
      <span style={{ color: C.accent }}>{COPY.footerRight}</span>
    </div>
  );

  // Footer formats: wordmark pinned top, footer pinned bottom, headline centred.
  // Wide formats: wordmark + headline as one left-aligned column, with the
  // column itself anchored to the right — the left of the cover sits under the
  // profile avatar on LinkedIn/X.
  const root = f.footer ? (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: f.pad, background: bannerBackground }}>
      {Watermark}
      <div style={{ position: "absolute", top: f.pad, left: f.pad, display: "flex" }}>{Wordmark}</div>
      {Main}
      {Footer}
    </div>
  ) : (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", padding: f.pad, background: bannerBackground }}>
      {Watermark}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: f.h * 0.06 }}>
        {Wordmark}
        {Main}
      </div>
    </div>
  );

  return new ImageResponse(root, { width: f.w, height: f.h, fonts });
}
