import { Pipette } from "lucide-react";
import { eyeDropperColorPicker } from "../features/eye-dropper";
import { defaultButtonBackground } from "@/components/common/micro-button";

const EyeDropButton = () => {

  return (
    <button
        className={`
          ${defaultButtonBackground}
          w-7 h-7
          outline-1
        `}
        onClick={() => {
          eyeDropperColorPicker();
        }}
      >
        <Pipette strokeWidth={2} size={15} />
      </button>
  );
};

export default EyeDropButton;
