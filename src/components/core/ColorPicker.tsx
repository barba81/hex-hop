import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Check, Pipette } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useColorStore } from "@/store/useColorStore";

declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}
const SelectNewColor = () => {
  const [color, setColor] = useState("#3b82f6");
  const setCurrentColor = useColorStore().setColor;

  return (
    <div className="flex items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <div
            className="
            rounded-md 
            w-10 h-10 p-0 
            cursor-pointer 
            outline-2 overflow-hidden"
            style={{ backgroundColor: color }}
          ></div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <HexColorPicker
            color={color}
            onChange={(color) => {
              setColor(color);
              setCurrentColor(color);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
const ColorPicker = () => {
  const currentColor = useColorStore().currentColor;
  const setColor = useColorStore().setColor;

  const handlePickColor = async () => {
    if (!window.EyeDropper) {
      return;
    }

    const eyeDropper = new window.EyeDropper();

    try {
      const result = await eyeDropper.open();
      setColor(result.sRGBHex);
    } catch (e) {
      console.log("Color selection cancelled or failed");
    }
  };

  const addColor = async () => {
    // add to state
    // add to db
    // add small mouse soter that is saved
  };

  return (
    <div className="flex items-center p-2 gap-2 border-t-2 bg-black/20">
      <div
        className="
          flex  
          outline-2
          items-center 
          justify-center
          rounded-md
          w-18 h-10 p-0 cursor-pointer  overflow-hidden
        bg-foreground/20
        hover:bg-foreground/25
          text-gray-900 dark:text-white "
        onClick={() => {
          handlePickColor();
        }}
      >
        <Pipette strokeWidth={2} />
      </div>
      <SelectNewColor />

      <Input
        className="h-11 border-2"
        placeholder="Enter color"
        value={currentColor}
      />
      <div
        className="
          flex  
          items-center 
          outline-2
          justify-center
          rounded-md
          w-19 h-10 p-0 cursor-pointer  overflow-hidden bg-green-400/30 hover:bg-green-400/40 text-gray-900 dark:text-white "
        onClick={() => addColor()}
      >
        <Check strokeWidth={2.5} />
      </div>
    </div>
  );
};

export default ColorPicker;
