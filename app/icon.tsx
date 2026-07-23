import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1B5E3B",
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
        }}
      >
        <span
          style={{
            color: "#C9973A",
            fontSize: 20,
            fontWeight: 700,
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          L
        </span>
      </div>
    ),
    { width: 32, height: 32 }
  );
}
