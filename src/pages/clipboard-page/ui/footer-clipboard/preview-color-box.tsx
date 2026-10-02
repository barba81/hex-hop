import { HexAlphaColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "@/globals.css";
import { useAppStore } from "@/store/app-store";
import { handleColorChange } from "../../features/color-actions";
import { formatHex8 } from "culori";

const PreviewColorBox = () => {
  const currentColor = formatHex8(useAppStore(x => x.validColor));

  const handleOnChange = (color: string) => {
    handleColorChange(color);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="overflow-hidden bg-checkerboard w-8 h-8 rounded-md" >
          <div
            className=" transition-opacity w-full h-full "
            style={{
              backgroundColor: currentColor,
            }}
          />
        </div>

      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <HexAlphaColorPicker
          color={currentColor}
          onChange={handleOnChange}
        />
      </PopoverContent>
    </Popover>
  );
};

export default PreviewColorBox;