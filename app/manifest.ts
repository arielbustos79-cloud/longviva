import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LongVivIA",
    short_name: "LongVivIA",
    description: "Tu plataforma de salud, bienestar y experiencias — pensada para tu prime.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F3",
    theme_color: "#1B5E3B",
    orientation: "portrait",
    icons: [
      {
        src: "/api/pwa-icon?s=192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/api/pwa-icon?s=512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
