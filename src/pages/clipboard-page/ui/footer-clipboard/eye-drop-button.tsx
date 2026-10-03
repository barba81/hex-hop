import { Pipette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addNewColorToClipboard } from "@/pages/clipboard-page/features/color-actions";

const handleOnClick = async () => {
  if (!window.EyeDropper) {
    return;
  }
  const eyeDropper = new window.EyeDropper();
  try {
    const result = await eyeDropper.open();
    addNewColorToClipboard(result.sRGBHex, null);
  } catch (e) {
    console.error(e);
  }
};


const EyeDropButton = () => {


  return (
    <Button size='icon-sm' variant='outline' onClick={() => handleOnClick()} >
      <Pipette strokeWidth={2} size={14} />
    </Button>
  );
};

export default EyeDropButton;


declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}
