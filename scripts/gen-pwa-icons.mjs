// Genera iconos PWA estáticos desde SVG usando sharp
// Ejecutar: node scripts/gen-pwa-icons.mjs

import sharp from "sharp";

const svgIcon = (size, maskable) => {
  const scale = (size * 0.58) / 32;
  const branchW = Math.round(size * 0.58);
  const branchH = Math.round(branchW * (38 / 32));
  const ox = Math.round((size - branchW) / 2);
  const oy = Math.round((size - branchH) / 2);
  const rx = maskable ? 0 : Math.round(size * 0.22);

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${rx}" fill="#1B5E3B"/>
  <g transform="translate(${ox}, ${oy}) scale(${scale})">
    <path d="M 17,37 C 16,30 13,22 15,12 C 16,6 20,2 20,2"
      stroke="white" stroke-opacity="0.9" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    <path d="M 15,30 C 7,28 4,22 7,18 C 9,16 15,20 15,26 Z"
      fill="white" fill-opacity="0.95"/>
    <path d="M 16,26 C 24,24 27,18 24,15 C 22,14 16,17 16,23 Z"
      fill="white" fill-opacity="0.7"/>
    <path d="M 15,20 C 7,18 4,12 8,9 C 10,8 15,11 15,17 Z"
      fill="white" fill-opacity="0.87"/>
    <path d="M 16,17 C 24,15 26,9 23,7 C 21,6 16,9 16,14 Z"
      fill="white" fill-opacity="0.82"/>
    <path d="M 15,12 C 8,10 7,5 10,4 C 12,3 15,5 15,9 Z"
      fill="white" fill-opacity="0.78"/>
    <path d="M 17,8 C 22,6 23,2 20,2 C 18,1 17,3 17,6 Z"
      fill="white" fill-opacity="0.72"/>
    <path d="M 15,27 L 11,25"
      stroke="white" stroke-opacity="0.9" stroke-width="1.2" stroke-linecap="round"/>
    <circle cx="10" cy="24" r="2.5" fill="#C9973A"/>
    <path d="M 16,19 L 20,17"
      stroke="white" stroke-opacity="0.9" stroke-width="1" stroke-linecap="round"/>
    <circle cx="21" cy="16" r="2.1" fill="#C9973A" fill-opacity="0.88"/>
    <path d="M 15,11 L 11,9"
      stroke="white" stroke-opacity="0.9" stroke-width="1" stroke-linecap="round"/>
    <circle cx="10" cy="8" r="1.8" fill="#C9973A" fill-opacity="0.82"/>
  </g>
</svg>`;
};

await sharp(Buffer.from(svgIcon(192, false))).png().toFile("public/icon-192.png");
console.log("✓ public/icon-192.png");

await sharp(Buffer.from(svgIcon(512, true))).png().toFile("public/icon-512.png");
console.log("✓ public/icon-512.png");

await sharp(Buffer.from(svgIcon(180, false))).png().toFile("public/apple-touch-icon.png");
console.log("✓ public/apple-touch-icon.png");

console.log("Iconos generados.");
