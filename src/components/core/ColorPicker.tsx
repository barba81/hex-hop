import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Check, Pipette } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}
const SelectNewColor = () => {
  const [color, setColor] = useState("#3b82f6");

  return (
    <div className="flex items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-10 h-10 p-0 cursor-pointer border-2 overflow-hidden"
            style={{ backgroundColor: color }}
          ></Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <HexColorPicker color={color} onChange={setColor} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
const ColorPicker = () => {
  const [, setSelectedColor] = useState("#ffffff");

  const handlePickColor = async () => {
    // 1. Check if the browser supports the EyeDropper API
    if (!window.EyeDropper) {
      alert("Your browser does not support the EyeDropper API.");
      return;
    }

    const eyeDropper = new window.EyeDropper();

    try {
      // 2. Open the pipette tool
      const result = await eyeDropper.open();
      // 3. The result returns an object: { sRGBHex: '#000000' }
      setSelectedColor(result.sRGBHex);
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
          items-center 
          justify-center
          rounded-md
          w-12 h-10 p-0 cursor-pointer  overflow-hidden
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

      <div className="flex justify-center items-center gap-1">
        <Input className="h-10 border-0" placeholder="Enter color" />
        <div
          className="
          flex  
          items-center 
          justify-center
          rounded-md
          w-13 h-10 p-0 cursor-pointer  overflow-hidden bg-green-400/30 hover:bg-green-400/40 text-gray-900 dark:text-white "
          onClick={() => addColor()}
        >
          <Check strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
