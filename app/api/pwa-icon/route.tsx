import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const size = Math.min(512, Math.max(16, parseInt(searchParams.get("s") ?? "192")));
  const radius = Math.round(size * 0.22);
  const fontSize = Math.round(size * 0.42);
  const subSize = Math.round(size * 0.2);
  const gap = Math.round(size * 0.03);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1B5E3B",
          width: size,
          height: size,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: radius,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: gap,
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: fontSize,
              fontWeight: 700,
              fontFamily: "serif",
              letterSpacing: "-1px",
              lineHeight: 1,
            }}
          >
            LongViv
          </span>
          <span
            style={{
              color: "#C9973A",
              fontSize: fontSize,
              fontWeight: 700,
              fontFamily: "serif",
              letterSpacing: "-1px",
              lineHeight: 1,
            }}
          >
            IA
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: gap * 2,
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: subSize,
              fontFamily: "sans-serif",
              letterSpacing: "1px",
            }}
          >
            .cl
          </span>
        </div>
      </div>
    ),
    { width: size, height: size }
  );
}
