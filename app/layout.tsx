import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SwRegister from "@/app/components/SwRegister";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "LongVivIA — Tu prime, tu plataforma",
  description:
    "LongVivIA es tu plataforma gratuita de salud y bienestar en Chile. VIVIAN, tu IA personal, te acompaña 24/7 — sin contraseña, sin letra chica.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LongVivIA",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SwRegister />
      </body>
    </html>
  );
}
