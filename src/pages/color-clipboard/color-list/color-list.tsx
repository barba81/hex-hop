import EmptyDisplay from "./empty-display";
import ColorBlock from "./color-box/color-block";
import { useHexHopStore } from "@/store/use-hex-hop-store";
import { PaletteBox } from "./palette-box/palette-box";
import { DragDropProvider } from "@dnd-kit/react";

const ColorList = () => {
  const colorBlocks = useHexHopStore().colorBlocks;
  function handleDragEnd({ operation }: { operation: any }) {
    const { source, target } = operation;
    if (!source || !target) return;

    const targetId: string = target.id as string;

    // Dropped into a palette's droppable zone
    if (targetId.endsWith("-drop")) {
      const paletteId = targetId.replace("-drop", "");
      // moveIntoPalette(source.id, paletteId);
    console.log("Palette: ",source.id,paletteId);

      return;
    }
    console.log(source.id,target.id);
    // reorderBlock(source.id, target.id);
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-3 p-2">
        {colorBlocks.length === 0 && <EmptyDisplay />}
        {colorBlocks
          .sort((a, b) => a.order - b.order)
          .map((block, ix) =>
            block.kind === "color" ? (
              <ColorBlock key={ix} color={block} />
            ) : block.kind === "palette" ? (
              <PaletteBox key={ix} palette={block} />
            ) : // block.kind === 'gradient'? <GradientBlock key={ix} gradient={block} /> :
            null,
          )}
      </div>
    </DragDropProvider>
  );
};

export default ColorList;
