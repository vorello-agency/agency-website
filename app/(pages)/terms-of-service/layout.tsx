import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Vorello Agency",
  description:
    "Términos y condiciones de uso del sitio web de Vorello Agency.",
};

export default function TerminosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
