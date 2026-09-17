import { HexAlphaColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "@/globals.css";
import { useClipboardStore } from "@/store/clipboard-store";
import { setInputColor } from "../../features/store-actions/clipboard-store-actions";
import { setColorValidityAndMode } from "../../features/set-color-validity-and-mode";
import { IconButton } from "@/components/custom/icon-button";

const PreviewColorBox = () => {
  const currentColor = useClipboardStore(x => x.validColor);

  const handleOnChange = (color: string) => {
    setInputColor(color);
    setColorValidityAndMode(color);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton className="overflow-hidden bg-checkerboard" >
          <div
            className="w-full h-full transition-opacity "
            style={{
              backgroundColor: currentColor,
            }}
          />
        </IconButton>

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