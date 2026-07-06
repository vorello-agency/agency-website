import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Vorello Agency",
  description:
    "Política de privacidad de Vorello Agency. Conocé cómo recopilamos, usamos y protegemos tu información personal.",
};

export default function PrivacidadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
