import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "./_components/Hero";
import Statement from "./_components/Statement";
import Services from "./_components/Services";
import Process from "./_components/Process";
import Technologies from "./_components/Technologies";
import MidCTA from "./_components/MidCTA";
import Fit from "./_components/Fit";
import CTA from "./_components/CTA";
import { TracingBeam } from "@/components/aceternity/tracing-beam";
import TechScaleDivider from "@/components/layout/TechScaleDivider";

export default function Home() {
  return (
    <>
      <Navbar />
      <TracingBeam>
        <main className="bg-carbon-black flex flex-1 flex-col">
          <Hero />
          <div className="bg-carbon-black z-30">
            <TechScaleDivider leftContent="VORELLO AGENCY" rightContent="DESIGN // PRODUCT // TECHNOLOGY" />
          </div>
          <Statement />
          <TechScaleDivider index={2} />
          <Services />
          <TechScaleDivider compact index={3} className="translate-y-4" />
          <Process />
          <TechScaleDivider compact index={4} />
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
