import EmptyDisplay from "./empty-display";
import ColorBlock from "../color-boxes/color-block";
import { useHexHopStore } from "@/store/use-hex-hop-store";
import { PaletteBox } from "./palette-box/palette-box";

const ColorList = () => {
  const colorBlocks = useHexHopStore().colorBlocks;

  return (
    <>
      <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-3 p-2">
        {colorBlocks.length === 0 && <EmptyDisplay />}
       {colorBlocks
       .sort((a, b) => a.order - b.order)
       .map((block, ix) => (
        block.kind === 'color'   ? <ColorBlock  key={ix} color={block} /> :
        block.kind === 'palette' ? <PaletteBox  key={ix} palette={block} /> :
        // block.kind === 'gradient'? <GradientBlock key={ix} gradient={block} /> :
        null
      ))}
      </div>
    </>
  );
};

export default ColorList;
