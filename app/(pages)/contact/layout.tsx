import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto Directo",
  description:
    "Hablemos sobre tu próximo proyecto digital. Consultas directas, soporte o propuestas a medida con Vorello Agency.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
