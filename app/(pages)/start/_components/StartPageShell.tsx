import React from "react";

import Container from "@/components/layout/Container";

interface StartPageShellProps {
  children: React.ReactNode;
  footerSlot?: React.ReactNode;
}

export default function StartPageShell({ children, footerSlot }: StartPageShellProps) {
  return (
    <main className="relative z-20 flex min-h-screen flex-1 flex-col justify-center overflow-hidden bg-carbon-black pb-12 pt-24 md:pb-24 md:pt-32">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-dot-white opacity-35" />
        <div className="absolute left-1/4 top-1/4 h-[300px] w-[500px] rounded-full bg-electric-violet/5 blur-[120px] animate-glow-drift" />
        <div className="absolute bottom-1/4 right-1/4 h-[250px] w-[400px] rounded-full bg-neon-blue/5 blur-[100px] animate-glow-drift" />
      </div>

      <Container className="relative z-10 px-4 sm:px-6 lg:px-8">
        {children}
      </Container>

      {footerSlot}
    </main>
  );
}
