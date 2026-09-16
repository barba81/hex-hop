import { Pipette } from "lucide-react";
import { defaultButtonBackground } from "@/components/common/custom-button";
import { eyeDropperColorPicker } from "../../features/eye-dropper";

const EyeDropButton = () => {

  return (
    <button
        className={`
          ${defaultButtonBackground}
          w-6 h-6
          outline-1
        `}
        onClick={() => {
          eyeDropperColorPicker();
        }}
      >
        <Pipette strokeWidth={2} size={14} />
      </button>
  );
};

export default EyeDropButton;
