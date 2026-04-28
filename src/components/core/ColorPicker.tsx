import { Check, Pipette } from "lucide-react";
import { HexAlphaColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useColorStore } from "@/store/useColorStore";
import { ColorRepository } from "@/repo/colorRepository";
import { useState } from "react";
import { ColorValidator } from "@/service/colorFormatValidator";
import { ColorFormatTranslation } from "@/service/colorFormatTranslation";

declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}

const buttonStyle =
  "w-7 h-7 p-0 cursor-pointer shrink-0  outline-2 rounded-md ";

const ColorPicker = () => {
  const currentColor = useColorStore().currentlyInsertedColor;
  const setColor = useColorStore().setColor;
  const addColorToState = useColorStore().addColor;
  const [isValidColor, setIsValidColor] = useState<boolean>(true);
  const [format, setValidFormat] = useState<string>("hex");
  const [inputColor, setInputColor] = useState<string>(currentColor);

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

  const addColor = async (colorString: string) => {
    if (!isValidColor) return;
    const result = ColorValidator.validateAndConvert(colorString);
    if (!result.isValid) return;
    const colorEntity = result.entity;
    if (colorEntity.a === 1) colorEntity.a = null;
    await ColorRepository.addColor(colorEntity);
    addColorToState(colorEntity);
  };

  const handleInputColor = (color: string) => {
    setInputColor(color);
    const result = ColorValidator.validateAndConvert(color);
    if (result.isValid === true) {
      setColor(ColorFormatTranslation.toHex(result.entity));
      setValidFormat(result.format);
    }
    setIsValidColor(result.isValid);
  };

  return (
    <div className="flex items-center p-2 gap-2 bg-stone-50/50 dark:bg-black/50">
      <div className="flex items-center gap-3 ">
        <Popover>
          <PopoverTrigger asChild>
            <div
              style={{ backgroundColor: currentColor }}
              className={`${buttonStyle}hover:bg-white/90`}
            ></div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3">
            <HexAlphaColorPicker
              color={currentColor}
              onChange={(color) => {
                setColor(color);
                setInputColor(color);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Pipet button */}
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

      <div className="flex h-8 items-center overflow-hidden rounded-md border-2 focus-within:ring-2 focus-within:ring-ring focus-within:border-input transition-colors">
        <input
          className="h-full w-full px-2 outline-none bg-stone-200  text-sm placeholder:text-muted-foreground"
          placeholder="Enter color"
          value={inputColor}
          onChange={(e) => handleInputColor(e.target.value)}
        />

        <div
          className={`${
            !isValidColor ? "hidden" : "flex"
          } h-full items-center border-l-2 bg-muted/50 px-2 font-mono text-xs font-semibold uppercase text-muted-foreground`}
        >
          {format}
        </div>
      </div>
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
