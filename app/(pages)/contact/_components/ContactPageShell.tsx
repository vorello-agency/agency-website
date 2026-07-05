import React from "react";

import Container from "@/components/layout/Container";
import AmbientGlowBackground from "@/components/ui/AmbientGlowBackground";
import DotBackground from "@/components/ui/DotBackground";

interface ContactPageShellProps {
  children: React.ReactNode;
}

export default function ContactPageShell({ children }: ContactPageShellProps) {
  return (
    <main className="relative z-20 flex min-h-screen flex-1 flex-col justify-center overflow-hidden bg-carbon-black pb-12 pt-24 md:pb-24 md:pt-32">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <DotBackground className="opacity-50" />
        <div className="absolute inset-x-0 top-0 h-[500px] bg-linear-to-b from-electric-violet/8 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[500px] bg-linear-to-t from-carbon-black to-transparent" />
      </div>

      <Container className="relative z-10 px-4 sm:px-6 lg:px-8">
        {children}
      </Container>
    </main>
  );
}
