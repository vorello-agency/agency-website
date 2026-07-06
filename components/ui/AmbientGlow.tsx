import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type AmbientGlowProps = ComponentProps<"div">;

export default function AmbientGlow({ className, ...props }: AmbientGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full", className)}
      {...props}
    />
  );
}
