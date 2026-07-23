import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const size = parseInt(searchParams.get("s") ?? "192");
  const maskable = size >= 512;

  // Olivo ocupa ~58% del ícono, centrado dentro del safe zone del maskable
  const branchW = Math.round(size * 0.58);
  const branchH = Math.round(branchW * (38 / 32));

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B5E3B",
          // maskable: fondo full-bleed sin borde redondeado
          // non-maskable: esquinas redondeadas (~22%)
          borderRadius: maskable ? 0 : Math.round(size * 0.22),
        }}
      >
        {/* OliveBranch — variante light (hojas blancas, aceitunas doradas) */}
        <svg
          width={branchW}
          height={branchH}
          viewBox="0 0 32 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 17,37 C 16,30 13,22 15,12 C 16,6 20,2 20,2" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
          <path d="M 15,30 C 7,28 4,22 7,18 C 9,16 15,20 15,26 Z" fill="rgba(255,255,255,0.95)"/>
          <path d="M 16,26 C 24,24 27,18 24,15 C 22,14 16,17 16,23 Z" fill="rgba(255,255,255,0.8)" opacity="0.88"/>
          <path d="M 15,20 C 7,18 4,12 8,9 C 10,8 15,11 15,17 Z" fill="rgba(255,255,255,0.95)" opacity="0.92"/>
          <path d="M 16,17 C 24,15 26,9 23,7 C 21,6 16,9 16,14 Z" fill="rgba(255,255,255,0.95)" opacity="0.82"/>
          <path d="M 15,12 C 8,10 7,5 10,4 C 12,3 15,5 15,9 Z" fill="rgba(255,255,255,0.8)" opacity="0.78"/>
          <path d="M 17,8 C 22,6 23,2 20,2 C 18,1 17,3 17,6 Z" fill="rgba(255,255,255,0.95)" opacity="0.72"/>
          <path d="M 15,27 L 11,25" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx="10" cy="24" r="2.5" fill="#C9973A"/>
          <path d="M 16,19 L 20,17" stroke="rgba(255,255,255,0.9)" strokeWidth="1" strokeLinecap="round"/>
          <circle cx="21" cy="16" r="2.1" fill="#C9973A" opacity="0.88"/>
          <path d="M 15,11 L 11,9" stroke="rgba(255,255,255,0.9)" strokeWidth="1" strokeLinecap="round"/>
          <circle cx="10" cy="8" r="1.8" fill="#C9973A" opacity="0.82"/>
        </svg>
      </div>
    ),
    { width: size, height: size }
  );
}
