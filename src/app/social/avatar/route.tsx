import { ImageResponse } from "next/og";
import { getFonts } from "../_lib/fonts";
import { avatarBackground, C } from "../_lib/brand";

export const runtime = "nodejs";

/**
 * Square brand mark for social profile pictures.
 *   GET /social/avatar?size=400
 * The `f.` mark is centred with generous padding so it survives the circular
 * crop most platforms apply.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const size = Math.min(
    Math.max(parseInt(searchParams.get("size") || "400", 10) || 400, 64),
    1024,
  );
  const fonts = await getFonts();
  const mark = Math.round(size * 0.46);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: avatarBackground,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span
            style={{
              fontFamily: "DM Sans",
              fontWeight: 800,
              fontSize: mark,
              color: C.white,
              letterSpacing: -mark * 0.04,
              lineHeight: 1,
            }}
          >
            f
          </span>
          <span
            style={{
              fontFamily: "DM Sans",
              fontWeight: 400,
              fontSize: mark,
              color: C.accent,
              lineHeight: 1,
            }}
          >
            .
          </span>
        </div>
      </div>
    ),
    { width: size, height: size, fonts },
  );
}
