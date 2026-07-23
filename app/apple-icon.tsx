import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const s = 180;
  const radius = Math.round(s * 0.22);
  const fontSize = Math.round(s * 0.42);
  const subSize = Math.round(s * 0.2);
  const gap = Math.round(s * 0.03);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1B5E3B",
          width: s,
          height: s,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: radius,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap }}>
          <span
            style={{
              color: "white",
              fontSize,
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
              fontSize,
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
    { width: s, height: s }
  );
}
