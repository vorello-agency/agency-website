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
