import { HexAlphaColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover";
import "@/app/globals.css";
import { useAppStore } from "@/shared/store/app-store";
import { formatHex8 } from "culori";

const ColorBoxPicker = () => {
  const currentColor = formatHex8(useAppStore(x => x.lastValidColor));
  const handleColorChange = useAppStore(state => state.handleColorChange);

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

export default ColorBoxPicker;