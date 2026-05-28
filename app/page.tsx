import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Technologies from "@/components/sections/Technologies";
import MidCTA from "@/components/sections/MidCTA";
import Fit from "@/components/sections/Fit";
import CTA from "@/components/sections/CTA";
import { TracingBeam } from "@/components/aceternity/tracing-beam";
import TechScaleDivider from "@/components/ui/TechScaleDivider";

export default function Home() {
  return (
    <>
      <Navbar />
      <TracingBeam>
        <main className="flex-1 flex flex-col bg-carbon-black">
          <Hero />
          <TechScaleDivider index={1} />
          <Statement />
          <TechScaleDivider index={2} />
          <Services />
          <TechScaleDivider index={3} className="translate-y-4" />
          <Process />
          <TechScaleDivider index={4} />
          <Technologies />
          <MidCTA />
          <Fit />
          <TechScaleDivider index={5} />
          <CTA />
        </main>
      </TracingBeam>
      <Footer />
    </>
  );
}

