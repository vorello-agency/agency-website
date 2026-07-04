import { cn } from "@/lib/utils";
import AmbientGlow from "@/components/ui/AmbientGlow";

interface AmbientGlowBackgroundProps {
  className?: string;
  violetSide?: "left" | "right";
}

export default function AmbientGlowBackground({
  className,
  violetSide = "left",
}: AmbientGlowBackgroundProps) {
  const violetPosition =
    violetSide === "left" ? "left-1/4" : "right-1/4";
  const bluePosition =
    violetSide === "left" ? "right-1/4" : "left-1/4";

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <AmbientGlow
        className={cn(
          "top-1/4 h-[300px] w-[500px] animate-glow-drift bg-electric-violet/5 blur-[120px] motion-reduce:animate-none",
          violetPosition
        )}
      />
      <AmbientGlow
        className={cn(
          "bottom-1/4 h-[250px] w-[400px] animate-glow-drift bg-neon-blue/5 blur-[100px] motion-reduce:animate-none",
          bluePosition
        )}
      />
    </div>
  );
}
