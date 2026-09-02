import { HexAlphaColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import "@/globals.css";
import { useClipboardStore } from "@/pages/color-clipboard/store/clipboard-store";
import { setColorValidityAndMode } from "../features/set-color-validity-and-mode";

const PreviewColorBox = () => {
  const currentColor = useClipboardStore(x => x.validColor);
  const setInputColor = useClipboardStore(x => x.setInputColor);

  const handleOnChange = (color: string) => {
    setInputColor(color);
    setColorValidityAndMode(color);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="bg-checkerboard rounded-md w-6 h-6 overflow-hidden outline-1 cursor-pointer ">
          <div
            className="w-full h-full transition-opacity "
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