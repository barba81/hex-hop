import { Check, Pipette } from "lucide-react";
import { HexAlphaColorPicker } from "react-colorful";
import { useColorStore } from "@/store/useColorStore";
import { ColorRepository } from "@/repo/colorRepository";
import { useState } from "react";
import { ColorValidator } from "@/service/colorFormatValidator";
import { ColorFormatTranslation } from "@/service/colorFormatTranslation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ColorBox from "./ColorBox";
import PipetButton from "./PipetButton";
import ColorInput from "./ColorInput";
import AddColorButton from "./AddColorButton";

declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}

export const buttonStyle =
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
    const colorData = result.entity;
    if (colorData.a === 1) colorData.a = null;
    const colorEntity = await ColorRepository.addColor(colorData);
    if (colorEntity) {
      addColorToState(colorEntity);
    }
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
      <ColorBox />
      <PipetButton />
      <ColorInput />
      <AddColorButton/>
    </div>
  );
};

export default ColorPicker;
