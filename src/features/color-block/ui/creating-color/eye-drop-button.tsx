import { Pipette } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useAppStore } from "@/shared/store/app-store";

declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}

const EyeDropButton = () => {
  const addNewColorToClipboard = useAppStore(state => state.addNewColor);

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


  return (
    <Button size='icon-sm' variant='outline' onClick={() => handleOnClick()} >
      <Pipette strokeWidth={2} size={14} />
    </Button>
  );
};

export default EyeDropButton;
