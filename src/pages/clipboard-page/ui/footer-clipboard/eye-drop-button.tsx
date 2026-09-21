import { Pipette } from "lucide-react";
import { eyeDropperColorPicker } from "../../features/eye-dropper";
import { Button } from "@/components/ui/button";

const EyeDropButton = () => {

  return (
    <Button size='icon-sm' variant='outline'  onClick={() => eyeDropperColorPicker() } >
        <Pipette strokeWidth={2} size={14} />
    </Button>
  );
};

export default EyeDropButton;
