import React from "react";

import Container from "@/components/layout/Container";
import AmbientGlowBackground from "@/components/ui/AmbientGlowBackground";
import DotBackground from "@/components/ui/DotBackground";

interface ContactPageShellProps {
  children: React.ReactNode;
}

export default function ContactPageShell({ children }: ContactPageShellProps) {
  return (
    <main className="bg-carbon-black relative z-20 flex min-h-screen flex-1 flex-col justify-center overflow-hidden pt-24 pb-12 md:pt-32 md:pb-24">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <DotBackground className="opacity-50" />
        <div className="from-electric-violet/8 absolute inset-x-0 top-0 h-[500px] bg-linear-to-b to-transparent" />
        <div className="from-carbon-black absolute inset-x-0 bottom-0 h-[500px] bg-linear-to-t to-transparent" />
      </div>

      <Container className="relative z-10 px-4 sm:px-6 lg:px-8">{children}</Container>
    </main>
  );
}
