import { ChevronDown, ChevronUp } from "lucide-react";
import { DragDots } from "./DragDots";
import ColorBlock from "../colorBoxes/ColorBlock";
import { useState } from "react";



export const PaletteBox = () => {
  const [expandPalette, setExpandPalette] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col outline-3 rounded-md ">
        <div
          className={`h-7  ${!expandPalette && 'rounded-md'}  ${expandPalette && 'rounded-t-md'} w-full shrink-0 relative flex items-center justify-between overflow-hidden `}
        >
          <div className="absolute inset-0 bg-checkerboard    flex">
             <div
              className="w-full h-full"
              style={{
                background: `#B24C63`,
              }}
            />
                <div
              className="w-full h-full"
              style={{
                background: `#B21C63`,
              }}
            />
                <div
              className="w-full h-full"
              style={{
                background: `#B24C12`,
              }}
            />
           {/* <div
              className="w-full h-full"
              style={{
                background: `#5438DC`,
              }}
            />
              <div
              className="w-full h-full"
              style={{
                background: `#357DED`,
              }}
            />
              <div
              className="w-full h-full"
              style={{
                background: `#56eef4`,
              }}
            /> */}
            {/* <div
              className="w-full h-full"
              style={{
                background: `#32e875`,
              }}
            /> */}
          </div>

          <div className={` h-full flex items-center justify-start overflow-hidden ${!expandPalette && 'rounded-md'} `}>
            <DragDots />
            <div
              className="relative rounded-md bg-foreground/20 p-0.5 cursor-pointer   flex flex-col items-center justify-center "
              onClick={() => setExpandPalette(!expandPalette)}
            >
              {!expandPalette && <ChevronDown size={14} />}
              {expandPalette && <ChevronUp size={14} />}
            </div>
          </div>
          {/* <div className="relative h-full   flex items-center justify-start overflow-hidden text-sm  text-red-50 bg-foreground/20 px-3 rounded-l-md font-mono">
            Test palette name
          </div> */}
        </div>
        {expandPalette && (
          <div className="flex flex-col p-2 gap-2 bg-foreground/2 rounded-b-md ">
            <ColorBlock color={{r: 32, b: 23, g: 32, id: 1, name:"123"}} />
            <ColorBlock color={{r: 32, b: 23, g: 32, id: 1, name:"123"}} />
          </div>
        )}
      </div>
    </>
  );
};
