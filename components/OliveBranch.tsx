export default function OliveBranch({ size = 32, variant = "dark" }: { size?: number; variant?: "dark" | "light" }) {
  const stem = variant === "light" ? "rgba(255,255,255,0.9)" : "#1B5E3B";
  const leaf1 = variant === "light" ? "rgba(255,255,255,0.95)" : "#1B5E3B";
  const leaf2 = variant === "light" ? "rgba(255,255,255,0.8)" : "#2D8A5F";
  const olive = "#C9973A";

  return (
    <svg
      width={size}
      height={Math.round(38 * (size / 32))}
      viewBox="0 0 32 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <path d="M 17,37 C 16,30 13,22 15,12 C 16,6 20,2 20,2" stroke={stem} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M 15,30 C 7,28 4,22 7,18 C 9,16 15,20 15,26 Z" fill={leaf1}/>
      <path d="M 16,26 C 24,24 27,18 24,15 C 22,14 16,17 16,23 Z" fill={leaf2} opacity=".88"/>
      <path d="M 15,20 C 7,18 4,12 8,9 C 10,8 15,11 15,17 Z" fill={leaf1} opacity=".92"/>
      <path d="M 16,17 C 24,15 26,9 23,7 C 21,6 16,9 16,14 Z" fill={leaf1} opacity=".82"/>
      <path d="M 15,12 C 8,10 7,5 10,4 C 12,3 15,5 15,9 Z" fill={leaf2} opacity=".78"/>
      <path d="M 17,8 C 22,6 23,2 20,2 C 18,1 17,3 17,6 Z" fill={leaf1} opacity=".72"/>
      <path d="M 15,27 L 11,25" stroke={stem} strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="10" cy="24" r="2.5" fill={olive}/>
      <path d="M 16,19 L 20,17" stroke={stem} strokeWidth="1" strokeLinecap="round"/>
      <circle cx="21" cy="16" r="2.1" fill={olive} opacity=".88"/>
      <path d="M 15,11 L 11,9" stroke={stem} strokeWidth="1" strokeLinecap="round"/>
      <circle cx="10" cy="8" r="1.8" fill={olive} opacity=".82"/>
    </svg>
  );
}
