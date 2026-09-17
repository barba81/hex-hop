import { Pipette } from "lucide-react";
import { IconButton } from "@/components/custom/icon-button";
import { eyeDropperColorPicker } from "../../features/eye-dropper";

const EyeDropButton = () => {

  return (
    <IconButton onClick={() => eyeDropperColorPicker() } >
        <Pipette strokeWidth={2} size={14} />
    </IconButton>
  );
};

export default EyeDropButton;
