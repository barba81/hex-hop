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
  } else if (sourceData.kind === 'block' && targetData.kind === 'palette') {
    blockInPalette(sourceData, targetData);
  }
};

// push to end of palette, so closed palette 
const blockInPalette = async (sourceData: DraggableData, targetData: DraggableData) => {
  const draggedBlockId = sourceData.blockId;

  const draggedParent = sourceData.palette;
  const targetParent = targetData.palette;

  if (draggedParent === targetParent) return;
  const state = useClipboardStore.getState();

  const draggedColorBlocks = state.blockIds[draggedParent ?? rootBlockId];
  const targetColorBlocks = state.blockIds[targetParent ?? rootBlockId] ?? [];

  const newDraggedBlocks = [...draggedColorBlocks];
  const newTargetColorBlocks = [...targetColorBlocks];
  const blockIx1 = draggedColorBlocks.indexOf(draggedBlockId);

  newDraggedBlocks.splice(blockIx1, 1);
  newTargetColorBlocks.push(draggedBlockId);
  state.setBlocksIds([
    { blockId: newDraggedBlocks, paletteId: draggedParent },
    { blockId: newTargetColorBlocks, paletteId: targetParent }
  ]);

  const reorderBlocksDrag = [...reorderHelper(newDraggedBlocks, state.blocksById)];
  const reorderBlocksTarget = [...reorderHelper(newTargetColorBlocks, state.blocksById)];

  await invoke("update_block_order", { reorderBlocks: reorderBlocksDrag });
  await invoke("update_block_order", { reorderBlocks: reorderBlocksTarget });
  await invoke("update_blocks_parent", { paletteId: targetParent, blockIds: [draggedBlockId] });
}

// create new palette, the just need to be not in palette
const blockInBlock = async (sourceData: DraggableData, targetData: DraggableData) => {
  const draggedBlockId = sourceData.blockId;
  const targetBlockId = targetData.blockId;

  if (draggedBlockId === targetBlockId) return;

  const draggedParent = sourceData.palette;
  const targetParent = targetData.palette;

  // you can create palette only in root 
  if (targetParent !== null) return;

  const state = useClipboardStore.getState();

  const draggedColorBlocks = state.blockIds[draggedParent ?? rootBlockId];
  const targetColorBlocks = state.blockIds[targetParent ?? rootBlockId];

  const newDraggedColorBlocksBlocks = [...draggedColorBlocks];

  // this shit is if there are from same 
  let newTargetColorBlocksBlocksBlocks = []
  if (draggedParent === targetParent) {
    newTargetColorBlocksBlocksBlocks = newDraggedColorBlocksBlocks;
  } else {
    newTargetColorBlocksBlocksBlocks = [...targetColorBlocks];
  }


  // remove them form draggedBlockId
  const blockIx1 = newDraggedColorBlocksBlocks.indexOf(draggedBlockId);
  newDraggedColorBlocksBlocks.splice(blockIx1, 1);

  const blockIx2 = newTargetColorBlocksBlocksBlocks.indexOf(targetBlockId);
  newTargetColorBlocksBlocksBlocks.splice(blockIx2, 1);
  // create nwe bloc
  const newPaletteBlocIds = [targetBlockId, draggedBlockId];
  // reorder them and save 


  const paletteId = await invoke<number>("create_palette", { palette: { name: "New palette", blockIds: [targetBlockId, draggedBlockId] } });
  const paletteEntity = await invoke<PaletteEntity>("get_palette", { paletteId });

  newTargetColorBlocksBlocksBlocks.splice(blockIx2, 0, paletteEntity.blockId);
  debugger

  // THIS IS SHIT
  state.addBlock(paletteEntity, null);
  state.setBlocksIds([
    { blockId: newPaletteBlocIds, paletteId: paletteId },
    { blockId: newDraggedColorBlocksBlocks, paletteId: draggedParent },
    { blockId: newTargetColorBlocksBlocksBlocks, paletteId: targetParent },
  ]);

  const reorderBlocks = [
    { blockId: targetBlockId, blockOrder: 1 }, { blockId: draggedBlockId, blockOrder: 0 },
    ...reorderHelper(newDraggedColorBlocksBlocks, useClipboardStore.getState().blocksById),
    ...reorderHelper(newTargetColorBlocksBlocksBlocks, useClipboardStore.getState().blocksById),
  ];
  await invoke("update_block_order", { reorderBlocks });
}

// chekc palette 
const blockInDroppable = async (sourceData: DraggableData, targetData: DraggableData) => {
  const draggedId = sourceData.blockId;
  const targetId = targetData.blockId;

  if (draggedId === targetId) return;

  const state = useClipboardStore.getState();
  const draggedParent = sourceData.palette;
  const targetParent = targetData.palette;
  const draggedColorBlocks = state.blockIds[draggedParent ?? rootBlockId];
  const targetColorBlocks = state.blockIds[targetId ?? rootBlockId];

  const newDraggedBlocks = [...draggedColorBlocks];

  const oldIndex = newDraggedBlocks.indexOf(draggedId);
  if (oldIndex === -1) return;
  newDraggedBlocks.splice(oldIndex, 1);

  let newTargetColorBlocksBlocksBlocks = []
  if (draggedParent === targetParent) {
    newTargetColorBlocksBlocksBlocks = newDraggedBlocks;
  } else {
    newTargetColorBlocksBlocksBlocks = [...targetColorBlocks];
  }


  if (targetId === -1) {
    newDraggedBlocks.splice(0, 0, draggedId);
  } else {
    const targetIndex = newDraggedBlocks.indexOf(targetId);
    if (targetIndex === -1) return;
    const newTargetIndex = newDraggedBlocks.indexOf(targetId);
    newDraggedBlocks.splice(newTargetIndex + 1, 0, draggedId);
  }

  state.setBlocksIds([{ blockId: newDraggedBlocks, paletteId: draggedParent }]);

  try {
    const reorderBlocks = [...reorderHelper(newDraggedBlocks, state.blocksById)];
    await invoke("update_block_order", { reorderBlocks });
  } catch (error) {
    console.error("Failed to save order to DB:", error);
    state.setBlocksIds([{ blockId: draggedColorBlocks, paletteId: draggedParent }]);
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