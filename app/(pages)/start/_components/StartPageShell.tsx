import React from "react";

import AmbientGlowBackground from "@/components/ui/AmbientGlowBackground";
import DotBackground from "@/components/ui/DotBackground";

interface StartPageShellProps {
  children: React.ReactNode;
  footerSlot?: React.ReactNode;
}

export default function StartPageShell({ children, footerSlot }: StartPageShellProps) {
  return (
    <main className="relative z-20 flex min-h-screen flex-1 flex-col justify-center overflow-hidden bg-carbon-black pb-12 pt-24 md:pb-24 md:pt-32">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <DotBackground className="opacity-50" />
        <div className="absolute inset-x-0 top-0 h-[500px] bg-linear-to-b from-electric-violet/8 to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        {children}
      </div>

      {footerSlot}
    </main>
  );
}
