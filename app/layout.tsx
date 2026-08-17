import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono, Geist, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/layout/SmoothScroll";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Vorello Agency | Diseño, Tecnología y Producto",
  description:
    "Diseñamos y desarrollamos productos digitales bien pensados, visualmente cuidados y técnicamente sólidos. Sitios web corporativos, web apps y Ecommerce premium.",
  metadataBase: new URL("https://vorelloagency.com"),
  keywords: [
    "Vorello",
    "Agencia Digital",
    "Desarrollo Web",
    "UX/UI",
    "Next.js",
    "Ecommerce Premium",
    "Estudio de Diseño",
    "GSAP React",
  ],
  authors: [{ name: "Vorello Team" }],
  openGraph: {
    title: "Vorello Agency | Diseño, Tecnología y Producto",
    description:
      "Diseñamos y desarrollamos productos digitales bien pensados, visualmente cuidados y técnicamente sólidos.",
    url: "https://vorelloagency.com",
    siteName: "Vorello Agency",
    images: [
      {
        url: "/og/og-home.png",
        width: 1200,
        height: 630,
        alt: "Vorello Agency — Diseño, Tecnología y Producto",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vorello Agency | Diseño, Tecnología y Producto",
    description:
      "Diseñamos y desarrollamos productos digitales bien pensados, visualmente cuidados y técnicamente sólidos.",
    images: ["/og/og-home.png"],
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
      className={cn(
        "h-full",
        "dark",
        "antialiased",
        spaceGrotesk.variable,
        geistMono.variable,
        bebasNeue.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body className="bg-carbon-black text-chrome-highlight selection:bg-electric-violet/20 selection:text-electric-violet flex min-h-full flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
