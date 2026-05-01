import { Pipette } from "lucide-react";
import { useColorStore } from "@/store/useColorStore";
import { buttonStyle } from "./DefaultStyle";
import { ColorPallet } from "@/service/colorPallet";

declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}

const PipetButton = () => {
  const setInputColor = useColorStore().setInputColor;

  const handlePickColor = async () => {
    if (!window.EyeDropper) {
      return;
    }

    const eyeDropper = new window.EyeDropper();

    try {
      const result = await eyeDropper.open();
      setInputColor(result.sRGBHex);
      ColorPallet.AddColor(result.sRGBHex);
    } catch (e) {
      console.error("Color selection cancelled or failed");
    }
  };

  return (
    <>
      <div
        className={`
          ${buttonStyle}       
          flex  
          items-center 
          justify-center
          dark:bg-foreground/10
          hover:bg-foreground/25
        bg-stone-200
        text-gray-900 
        dark:text-white `}
        onClick={() => {
          handlePickColor();
        }}
      >
        <Pipette strokeWidth={2} size={15} />
      </div>
    </>
  );
};

export default PipetButton;
