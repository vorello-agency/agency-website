import React from "react";
import { cn } from "@/lib/utils";
import Eyebrow from "../ui/Eyebrow";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const renderTextWithBreaks = (text: string) => {
  return text.split(/\\n|\n/).map((line, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </React.Fragment>
  ));
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl md:mb-16 2xl:mb-20 2xl:max-w-5xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
      {...props}
    >
      {eyebrow && <Eyebrow className="mb-3 block">{eyebrow}</Eyebrow>}
      <h2 className="text-chrome-highlight mb-4 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl md:text-5xl 2xl:text-6xl">
        {renderTextWithBreaks(title)}
      </h2>
      {description && (
        <p className="text-chrome-deep text-base leading-relaxed text-balance sm:text-lg">
          {renderTextWithBreaks(description)}
        </p>
      )}
    </div>
  );
}
