import { Pipette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleEyeDropperColorPicker } from "../../features/color-actions";

const EyeDropButton = () => {

  const handleOnClick = () => {
    handleEyeDropperColorPicker();
  };
  
  return (
    <Button size='icon-sm' variant='outline' onClick={() => handleOnClick()} >
      <Pipette strokeWidth={2} size={14} />
    </Button>
  );
};

export default EyeDropButton;
