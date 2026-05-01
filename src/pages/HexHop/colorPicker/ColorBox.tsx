import { HexAlphaColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { buttonStyle } from "./DefaultStyle";
import { useColorStore } from "@/store/useColorStore";
import { ColorPallet } from "@/service/colorPallet";

const ColorBox = () => {
  const currentColor = useColorStore().validColor;
  const setColor = useColorStore().setInputColor;

  return (
    <>
      <div className="flex items-center gap-3 ">
        <Popover>
          <PopoverTrigger asChild>
            <div
              style={{
                backgroundColor: currentColor,
              }}
              className={`${buttonStyle}hover:bg-white/90`}
            ></div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3">
            <HexAlphaColorPicker
              color={currentColor}
              onChange={(color) => {
                setColor(color);
                ColorPallet.ValidateColor(color);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default ColorBox;
