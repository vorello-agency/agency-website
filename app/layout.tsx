import type { Metadata, Viewport } from "next";
import { Onest, Red_Hat_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ClientInit from "@/components/layout/ClientInit";

const bodyFont = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

const headingFont = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
});

const secondaryFont = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
  (process.env.URL
    ? process.env.URL.startsWith("http")
      ? process.env.URL
      : `https://${process.env.URL}`
    : "https://vorelloagency.com");

export const viewport: Viewport = {
  themeColor: "#0D0F11",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Vorello Agency | Diseño, Tecnología y Producto",
    template: "%s | Vorello Agency",
  },
  description:
    "Diseñamos y desarrollamos productos digitales bien pensados, visualmente cuidados y técnicamente sólidos. Sitios web corporativos, web apps y Ecommerce premium.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
  authors: [{ name: "Vorello Agency" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Vorello Agency | Diseño, Tecnología y Producto",
    description:
      "Diseñamos y desarrollamos productos digitales bien pensados, visualmente cuidados y técnicamente sólidos.",
    url: siteUrl,
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
        bodyFont.variable,
        headingFont.variable,
        secondaryFont.variable,
        "font-sans"
      )}
    >
      <body className="bg-carbon-black text-chrome-highlight selection:bg-electric-violet/20 selection:text-electric-violet flex min-h-full flex-col">
        <ClientInit />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
