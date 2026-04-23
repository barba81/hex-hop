import { useState } from "react";
import { Input } from "../ui/input";
import { Check, Pipette } from "lucide-react";
import { HexAlphaColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useColorStore } from "@/store/useColorStore";
import { ColorRepository } from "@/repo/colorRepository";
import { ColorEntity } from "@/model/color";

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
          shrink-0

            w-10 h-10 p-0 
            cursor-pointer 
            outline-2 overflow-hidden"
            style={{ backgroundColor: color }}
          ></div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <HexAlphaColorPicker 
            
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
  const currentColor = useColorStore().currentlyInsertedColor;
  const setColor = useColorStore().setColor;
  const addColorToState = useColorStore().addColor;

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

function hexToRgba(hex: string) {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
  debugger;
    return {
        r,
        g,
        b,
        a:255
    };
}

  const addColor = async (colorString: string) => {
    // add to state
    const color = hexToRgba(colorString);

    const colorEntity: ColorEntity = {
      id: 0,
      pinned: 0,
      ...color,
    };

    const id = await ColorRepository.addColor(colorEntity);
    colorEntity.id = id;
    addColorToState(colorEntity);

  };

  return (
    <div className="flex items-center p-2 gap-2 bg-black/20">
      <SelectNewColor />
      <div
        className="
          flex  
          outline-2
          items-center 
          justify-center
          rounded-md
          shrink-0

          w-10 h-10 p-0 cursor-pointer  overflow-hidden
        bg-foreground/20
        hover:bg-foreground/25
          text-gray-900 dark:text-white "
        onClick={() => {
          handlePickColor();
        }}
      >
        <Pipette strokeWidth={2} />
      </div>

      <Input
        className="h-11 border-3"
        placeholder="Enter color"
        value={currentColor}
        onChange={(e) => setColor(e.target.value)}
        style={{
          borderColor: currentColor,
          outlineColor: currentColor,
        }}
      />
      <div
        className="
          flex  
          items-center 
          outline-2
          justify-center
          rounded-md
          shrink-0
          w-10 h-10 p-0 cursor-pointer  overflow-hidden bg-green-400/30 hover:bg-green-400/40 text-gray-900 dark:text-white "
        onClick={() => addColor(currentColor)}
      >
        <Check strokeWidth={2.5} />
      </div>
    </div>
  );
};

export default ColorPicker;
