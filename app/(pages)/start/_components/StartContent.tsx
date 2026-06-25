import type { UseStartFormReturn } from "../_lib/use-start-form";
import StartForm from "./StartForm";
import type { StartFormProps } from "./StartForm";
import StartIntro from "./StartIntro";
import StartSidebar from "./StartSidebar";

interface StartContentProps extends StartFormProps {
  setFormElement: UseStartFormReturn["setFormElement"];
}

export default function StartContent({
  setFormElement,
  ...startFormProps
}: StartContentProps) {
  return (
    <div className="mt-4" ref={setFormElement}>
      <StartIntro />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <StartSidebar />
        <StartForm {...startFormProps} />
      </div>
    </div>
  );
}
