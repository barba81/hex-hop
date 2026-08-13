import { HexAlphaColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { buttonStyle } from "../../../style/default-style";

import "@/globals.css";
import { useClipboardStore } from "@/store/use-clipboard-store";
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
            <div className="bg-checkerboard rounded-md  ">
              <div
                className={`${buttonStyle}hover:bg-white/90   overflow-hidden`}
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