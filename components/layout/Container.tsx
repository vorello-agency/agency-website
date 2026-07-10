import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  spacing?: "default" | "compact" | "none";
  children: React.ReactNode;
}

export default function Container({
  as: Component = "div",
  spacing = "default",
  children,
  className,
  ...props
}: ContainerProps) {
  const hasCustomPadding = className && /(^|\s)(px-|p-)/.test(className);

  const spacingMap = {
    default: "px-5 xs:px-10 md:px-12 lg:px-20 xl:px-28 2xl:px-8",
    compact: "px-5 xs:px-8 md:px-10 lg:px-16 xl:px-20 2xl:px-8",
    none: "px-0",
  };

  return (
    <Component
      className={cn(
        "w-full",
        hasCustomPadding ? "" : spacingMap[spacing],
        "2xl:max-w-7xl 2xl:mx-auto",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
