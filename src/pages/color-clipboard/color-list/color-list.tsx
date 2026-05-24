import { useColorStore } from "@/store/use-color-store";
import EmptyDisplay from "./empty-display";
import { PaletteBox } from "./palette-box";
import ColorBlock from "../color-boxes/color-block";
import { useHexHopStore } from "@/store/use-hex-hop-store";

const ColorList = () => {
  const colorBlocks = useHexHopStore().colorBlocks;

  return (
    <>
      <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-3 p-2">
        {colorBlocks.length === 0 && <EmptyDisplay />}
        <PaletteBox/>
        <PaletteBox/>
        {/* {colorBlocks.map((color, ix) => (
          <ColorBlock color={color} key={ix} />
        ))} */}
      </div>
    </>
  );
};

export default ColorList;
