// Símbolo oficial de VIVIAN: rama de olivo sobre fondo verde con aceitunas doradas.
// Usar en tarjetas, iconos y cualquier representación visual de VIVIAN.

export default function VivianIcon({ size = 46 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="46" height="46" rx="12" fill="#1B5E3B" />
      <path
        d="M23,42 C23,42 13,32 15,19 C17,9 23,6 23,6"
        stroke="rgba(255,255,255,.9)" strokeWidth="1.8" strokeLinecap="round" fill="none"
      />
      <ellipse cx="19" cy="22" rx="6" ry="3" transform="rotate(-38,19,22)" fill="rgba(255,255,255,.85)" />
      <ellipse cx="22" cy="16" rx="5.5" ry="2.8" transform="rotate(-20,22,16)" fill="rgba(255,255,255,.7)" />
      <ellipse cx="15" cy="30" rx="5" ry="2.5" transform="rotate(-52,15,30)" fill="rgba(255,255,255,.75)" />
      <circle cx="19" cy="25" r="2" fill="#F5DFA0" />
      <circle cx="14" cy="33" r="1.8" fill="#F5DFA0" opacity=".85" />
    </svg>
  );
}
