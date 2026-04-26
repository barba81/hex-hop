import { Input } from "../ui/input";
import { Check, Pipette } from "lucide-react";
import { HexAlphaColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useColorStore } from "@/store/useColorStore";
import { ColorRepository } from "@/repo/colorRepository";
import { useState } from "react";
import { ColorValidator } from "@/service/colorFormatValidator";

declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}

const buttonStyle =
  "w-7 h-7 p-0 cursor-pointer shrink-0  outline-2 rounded-md ";

const SelectNewColor = () => {
  const setCurrentColor = useColorStore().setColor;
  const currentColor = useColorStore().currentlyInsertedColor;

  return (
    <div className="flex items-center gap-3 ">
      <Popover>
        <PopoverTrigger asChild>
          <div
            style={{ backgroundColor: currentColor }}
            className={`${buttonStyle}   hover:bg-white/90`}
          ></div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <HexAlphaColorPicker
            color={currentColor}
            onChange={(color) => {
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
  const setCurrentColor = useColorStore().setColor;
  const [isValidColor, setIsValidColor] = useState<boolean>(true);

  const handlePickColor = async () => {
    if (!window.EyeDropper) {
      return;
    }

    const eyeDropper = new window.EyeDropper();

    try {
      const result = await eyeDropper.open();
      setColor(result.sRGBHex);
      setCurrentColor(result.sRGBHex);
      await addColor(result.sRGBHex);
    } catch (e) {
      console.log("Color selection cancelled or failed");
    }
  };

  const addColor = async (colorString: string) => {
    // add to state
    if (!isValidColor) return;
    const result = ColorValidator.validateAndConvert(colorString);
    if (!result.isValid) return;
    const colorEntity = result.entity;

    await ColorRepository.addColor(colorEntity);

    addColorToState(colorEntity);
  };

  const handleInputColor = (color: string) => {
    const result = ColorValidator.validateAndConvert(color);
    console.log(result);
    if (result.isValid === true) setColor(color);
    setIsValidColor(result.isValid);
  };

  return (
    <div className="flex items-center p-2 gap-2 bg-black/50">
      <SelectNewColor />

      {/* Pipet button */}
      <div
        className={`${buttonStyle}       
          flex  
          items-center 
          justify-center
        bg-foreground/10
        hover:bg-foreground/25
          text-gray-900 dark:text-white `}
        onClick={() => {
          handlePickColor();
        }}
      >
        <Pipette strokeWidth={2} size={15} />
      </div>

      {/* Input button */}
      <Input
        className="h-8 border-2 p-2"
        placeholder="Enter color"
        value={currentColor}
        onChange={(e) => handleInputColor(e.target.value)}
      />
      <div
        className={`${buttonStyle}       
          flex  
          items-center 
          justify-center
      ${isValidColor && "bg-green-400/60 hover:bg-green-400/40"} text-gray-900 dark:text-white `}
        onClick={() => addColor(currentColor)}
      >
        <Check strokeWidth={3} size={16} />
      </div>
    </div>
  );
};

export default ColorPicker;
