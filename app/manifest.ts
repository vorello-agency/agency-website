import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vorello Agency | Diseño, Tecnología y Producto",
    short_name: "Vorello",
    description:
      "Diseñamos y desarrollamos productos digitales bien pensados, visualmente cuidados y técnicamente sólidos.",
    start_url: "/",
    display: "standalone",
    background_color: "#0D0F11",
    theme_color: "#0D0F11",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/assets/isotipo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
