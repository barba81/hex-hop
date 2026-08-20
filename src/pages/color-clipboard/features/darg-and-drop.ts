import type { DragEndEvent } from "@dnd-kit/react";
import { rootBlockId, useClipboardStore } from "../store/use-clipboard-store";
import { invoke } from "@tauri-apps/api/core";
import { BlockEntity, PaletteEntity } from "@/infrastructure/models/entity";

export interface DraggableData {
  blockId: number;
  kind: 'droppable' | 'block' | 'palette';
  palette: number | null
}


export const handleDragEnd = (event: DragEndEvent,) => {
  const { operation, canceled } = event;

  if (canceled) return;

  const { source, target } = operation;
  if (!source) return;
  if (!target) return;

  const sourceData = source.data as DraggableData;
  const targetData = target.data as DraggableData;

  if ((sourceData.kind === 'block' || sourceData.kind === 'palette') && targetData.kind === 'droppable') {
    blockInDroppable(sourceData, targetData);
  } else if (sourceData.kind === 'block' && targetData.kind === 'block') {
    blockInBlock(sourceData, targetData);
  } else if (sourceData.kind === 'block' && targetData.kind === 'block') {
    blockInPalette(sourceData, targetData);
  }
};

// push to end of palette, so closed palette 
const blockInPalette = (sourceData: DraggableData, targetData: DraggableData) => {

}

// create new palette, the just need to be not in palette
const blockInBlock = async (sourceData: DraggableData, targetData: DraggableData) => {
  const draggedBlockId = sourceData.blockId;
  const targetBlockId = targetData.blockId;

  if (draggedBlockId === targetBlockId) return;

  const draggedParent = sourceData.palette;
  const targetParent = targetData.palette;

  const state = useClipboardStore.getState();

  const draggedColorBlocks = state.blockIds[draggedParent ?? rootBlockId];
  const targetColorBlocks = state.blockIds[targetParent ?? rootBlockId];

  const newBlocks = [...draggedColorBlocks];
  const blockIx1 = draggedColorBlocks.indexOf(targetBlockId);
  newBlocks.splice(blockIx1, 1);

  const blockIx2 = newBlocks.indexOf(draggedBlockId);
  newBlocks.splice(blockIx2, 1);

  const paletteId = await invoke("create_palette", { palette: { name: "New palette", blockIds: [draggedBlockId, targetBlockId] } });
  const paletteEntity = await invoke<PaletteEntity>("get_palette", { paletteId });


  // THIS IS SHIT
  newBlocks.unshift(paletteEntity.blockId);

  useClipboardStore.getState().addPalette(paletteEntity, [draggedBlockId, targetBlockId]);
  // useClipboardStore.getState().setBlockIds(newBlocks, null);
}


// chekc palette 
const blockInDroppable = async (sourceData: DraggableData, targetData: DraggableData) => {
  const draggedId = sourceData.blockId;
  const targetId = targetData.blockId;

  if (draggedId === targetId) return;

  const state = useClipboardStore.getState();
  const draggedParent = sourceData.palette;
  const draggedColorBlocks = state.blockIds[draggedParent ?? rootBlockId];

  const newDraggedBlocks = [...draggedColorBlocks];

  const oldIndex = newDraggedBlocks.indexOf(draggedId);
  if (oldIndex === -1) return;
  newDraggedBlocks.splice(oldIndex, 1);


  if (targetId === -1) {
    newDraggedBlocks.splice(0, 0, draggedId);
  } else {
    const targetIndex = newDraggedBlocks.indexOf(targetId);
    if (targetIndex === -1) return;
    const newTargetIndex = newDraggedBlocks.indexOf(targetId);
    newDraggedBlocks.splice(newTargetIndex + 1, 0, draggedId);
  }

  useClipboardStore.getState().setBlockIds(newDraggedBlocks, draggedParent);

  try {
    const reorderBlocks = [...reorderHelper(newDraggedBlocks, state.blocksById)];
    await invoke("update_block_order", { reorderBlocks });
  } catch (error) {
    console.error("Failed to save order to DB:", error);
    useClipboardStore.getState().setBlockIds(draggedColorBlocks, draggedParent);
  }
}

export type ReorderBlock = { blockId: number, blockOrder: number };

const reorderHelper = (blockId: number[], blocksById: Record<number, BlockEntity>) => {

  const ids: ReorderBlock[] = [];
  for (const [ix, id] of blockId.entries()) {

    const order = blockId.length - ix;

    if (blocksById[id].blockOrder !== order) {
      ids.push({ blockId: id, blockOrder: order });
    }
  }


  return ids;
}