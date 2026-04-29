import { Pipette } from "lucide-react";
import { useColorStore } from "@/store/useColorStore";
import { buttonStyle } from "./DefaultStyle";

declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}

const PipetButton = () => {
    const setColor = useColorStore().setColor;
    const addColor = useColorStore().addColor;

  const handlePickColor = async () => {
    if (!window.EyeDropper) {
      return;
    }

    const eyeDropper = new window.EyeDropper();

    try {
      const result = await eyeDropper.open();
      setColor(result.sRGBHex);
      await addColor(result.sRGBHex);
    } catch (e) {
      console.log("Color selection cancelled or failed");
    }
  };

  return (
    <>
      <div
        className={`${buttonStyle}       
          flex  
          items-center 
          justify-center
        dark:bg-foreground/10
        bg-stone-200
        hover:bg-foreground/25
          text-gray-900 dark:text-white `}
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
