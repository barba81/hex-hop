import { HexAlphaColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "@/globals.css";
import { useHexHopStore } from "@/store/hex-hop-store";
import { setInputColor } from "../../features/clipboard-store-actions";
import { setColorValidityAndMode } from "../../features/set-color-validity-and-mode";
import { useClipboardStore } from "../../store/clipboard-store";

const PreviewColorBox = () => {
  const currentColor = useClipboardStore(x => x.validColor);

  const handleOnChange = (color: string) => {
    setInputColor(color);
    setColorValidityAndMode(color);
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