import { Pipette } from "lucide-react";
import { eyeDropperColorPicker } from "../features/eye-dropper";
import { MicroButton } from "@/components/common/micro-button";

const EyeDropButton = () => {

  return (
    <MicroButton
        className={`
          flex  
          items-center 
          justify-center
          dark:bg-foreground/10
          hover:bg-foreground/25
        bg-stone-100
        text-gray-900 
        dark:text-white `}
        onClick={() => {
          eyeDropperColorPicker();
        }}
      >
        <Pipette strokeWidth={2} size={15} />
      </MicroButton>
  );
};

export default EyeDropButton;
