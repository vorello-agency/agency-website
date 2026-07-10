import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Ensure registration runs only on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  // Set default configurations (e.g. suppress warnings for dynamic React routes/states)
  gsap.config({
    nullTargetWarn: false,
  });
}

export { gsap, ScrollTrigger, useGSAP };

