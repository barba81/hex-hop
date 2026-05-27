import { ChevronDown, ChevronUp } from "lucide-react";
import { DragDots } from "../drag-dots";
import ColorBlock from "../../color-boxes/color-block";
import { useState } from "react";
import { PaletteEntity } from "@/features/infrastructure/entity/palette.entity";
import { PaletteBoxEmpty } from "./palette-box-empty";
import { colorDataToHex } from "@/features/colors/color-format-changer";
import {useSortable} from '@dnd-kit/react/sortable';

type PaletteBoxParams = {
  palette: PaletteEntity;
};

export const PaletteBox = ({ palette }: PaletteBoxParams) => {
  const [expandPalette, setExpandPalette] = useState<boolean>(false);
  const {ref} = useSortable({id: palette.order, index: palette.order});

  return (
    <>
      <div
      ref={ref} 
      className="flex flex-col outline-3 rounded-md ">
        {palette.children.length === 0 && (
          <>
            <PaletteBoxEmpty name="Empty Palette" />
          </>
        )}
        {palette.children.length !== 0 && (
          <>
            <div
              className={`h-7  ${!expandPalette && "rounded-md"}  ${expandPalette && "rounded-t-md"} w-full shrink-0 relative flex items-center justify-between overflow-hidden `}
            >
              {/* Background  */}
              <div className="absolute inset-0 bg-checkerboard    flex">
                {palette.children.map((block,ix) =>
                  block.kind === "color" ? (
                    <div
                      key={ix}
                      className="w-full h-full"
                      style={{
                        background: colorDataToHex(block),
                      }}
                    />
                  ) : 
                  null,
                )}
              </div>

              <div
                className={` h-full flex items-center justify-start overflow-hidden ${!expandPalette && "rounded-md"} `}
              >
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
                 {palette.children.map((block,  ix) =>
                  block.kind === "color" ? (
                  <ColorBlock color={block} key={ix}/>
                  ) : 
                  null,
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
