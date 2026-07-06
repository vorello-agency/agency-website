import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type DotBackgroundProps = HTMLAttributes<HTMLDivElement>;

export default function DotBackground({ className, ...props }: DotBackgroundProps) {
  return (
    <div aria-hidden="true" className={cn("bg-dot-white absolute inset-0", className)} {...props} />
  );
}
