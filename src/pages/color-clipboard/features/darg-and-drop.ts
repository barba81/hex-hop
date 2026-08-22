import type { DragEndEvent } from "@dnd-kit/react";
import { rootBlockId, useClipboardStore } from "../store/use-clipboard-store";
import { invoke } from "@tauri-apps/api/core";
import { BlockEntity, PaletteEntity } from "@/infrastructure/models/entity";

export interface DraggableData {
  blockId: number;
  kind: 'droppable' | 'block' | 'palette';
  palette: number | null
}

export type ReorderBlock = { blockId: number, blockOrder: number };


export const handleDragEnd = (event: DragEndEvent,) => {
  const { operation, canceled } = event;

  if (canceled) return;

  const { source, target } = operation;
  if (!source) return;
  if (!target) return;

  const sourceData = source.data as DraggableData;
  const targetData = target.data as DraggableData;

  if (sourceData.blockId === targetData.blockId) return;

  if ((sourceData.kind === 'block' || sourceData.kind === 'palette') && targetData.kind === 'droppable') {
    blockInDroppable(sourceData, targetData);
  } else if (sourceData.kind === 'block' && targetData.kind === 'block') {
    blockInBlock(sourceData, targetData);
  } else if (sourceData.kind === 'block' && targetData.kind === 'palette') {
    blockInPalette(sourceData, targetData);
  }
};

// chekc palette 
const blockInDroppable = async (sourceData: DraggableData, targetData: DraggableData) => {
  const draggedId = sourceData.blockId;
  const targetId = targetData.blockId;
  const state = useClipboardStore.getState();
  const draggedParent = sourceData.kind === 'palette' ? null : sourceData.palette;

  const targetParent = targetData.palette;
  const draggedColorBlocks = state.blockIds[draggedParent ?? rootBlockId];
  const targetColorBlocks = state.blockIds[targetParent ?? rootBlockId];

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
    newTargetColorBlocksBlocksBlocks.splice(0, 0, draggedId);
  } else {
    const targetIndex = newTargetColorBlocksBlocksBlocks.indexOf(targetId);
    if (targetIndex === -1) return;
    const newTargetIndex = newTargetColorBlocksBlocksBlocks.indexOf(targetId);
    newTargetColorBlocksBlocksBlocks.splice(newTargetIndex + 1, 0, draggedId);
  }
  const reorderBlocks = [...reorderHelper(newDraggedBlocks, useClipboardStore.getState().blocksById), ...reorderHelper(newTargetColorBlocksBlocksBlocks, useClipboardStore.getState().blocksById)];

  state.reorderBlocks([{ blockId: newDraggedBlocks, paletteId: draggedParent }, { blockId: newTargetColorBlocksBlocksBlocks, paletteId: targetParent }]);

  try {
    await invoke("update_blocks_parent", { paletteId: targetParent, blockIds: [draggedId] });
    await invoke("update_block_order", { reorderBlocks });
  } catch (error) {
    console.error("Failed to save order to DB:", error);
    state.reorderBlocks([{ blockId: draggedColorBlocks, paletteId: draggedParent }]);
  }
}

const blockInBlock = async (sourceData: DraggableData, targetData: DraggableData) => {
  const draggedBlockId = sourceData.blockId;
  const targetBlockId = targetData.blockId;
  const sourceParentId = sourceData.palette ?? rootBlockId;
  const targetParentId = targetData.palette ?? rootBlockId;

  if (targetParentId !== rootBlockId) return;

  const state = useClipboardStore.getState();

  const isSameParent = sourceParentId === targetParentId;

  const sourceBlocks = [...(state.blockIds[sourceParentId] ?? [])];
  const targetBlocks = isSameParent ? sourceBlocks : [...(state.blockIds[targetParentId] ?? [])];

  // remove them form draggedBlockId
  const dropIx = sourceBlocks.indexOf(draggedBlockId);
  sourceBlocks.splice(dropIx, 1);

  const targetIx = targetBlocks.indexOf(targetBlockId);
  targetBlocks.splice(targetIx, 1);

  // create palette and insert into the new list 

  const paletteId = await invoke<number>("create_palette", { palette: { name: "New palette", blockIds: [targetBlockId, draggedBlockId] } });
  const paletteEntity = await invoke<PaletteEntity>("get_palette", { paletteId });

  state.insertPalette(paletteEntity, [targetBlockId, draggedBlockId], targetIx);
  targetBlocks.splice(targetIx, 0, paletteEntity.blockId);

  state.reorderBlocks([
    { blockId: sourceBlocks, paletteId: sourceParentId },
    { blockId: targetBlocks, paletteId: targetBlockId },
  ]);

  const updatedState = useClipboardStore.getState();
  const reorderBlocks = [
    { blockId: targetBlockId, blockOrder: 2 }, { blockId: draggedBlockId, blockOrder: 1 },
    ...reorderHelper(sourceBlocks, updatedState.blocksById),
    ...reorderHelper(targetBlocks, updatedState.blocksById),
  ];

  await invoke("update_block_order", { reorderBlocks });
}

// push to end of palette, so closed palette 
const blockInPalette = async (sourceData: DraggableData, targetData: DraggableData) => {
  const draggedId = sourceData.blockId;

  // bug palette is carred 
  const draggedPalette = sourceData.palette;
  const targetPalette = targetData.palette;

  if (draggedPalette === targetPalette) return;

  const state = useClipboardStore.getState();

  const draggedColorBlocks = state.blockIds[draggedPalette ?? rootBlockId];
  const targetColorBlocks = state.blockIds[targetPalette ?? rootBlockId] ?? [];

  const newDraggedBlocks = [...draggedColorBlocks];
  const newTargetColorBlocks = [...targetColorBlocks];

  const blockIx1 = draggedColorBlocks.indexOf(draggedId);
  newDraggedBlocks.splice(blockIx1, 1);

  newTargetColorBlocks.push(draggedId);

  const reorderBlocksDrag = [
    ...reorderHelper(newTargetColorBlocks, useClipboardStore.getState().blocksById),
    ...reorderHelper(newDraggedBlocks, useClipboardStore.getState().blocksById),
  ];

  state.reorderBlocks([
    { blockId: newDraggedBlocks, paletteId: draggedPalette },
    { blockId: newTargetColorBlocks, paletteId: targetPalette }
  ]);

  await invoke("update_blocks_parent", { paletteId: targetPalette, blockIds: [draggedId] });
  await invoke("update_block_order", { reorderBlocks: reorderBlocksDrag });


  
}

// need to get old and new order delta
const reorderHelper = (blockIds: number[], blocksById: Record<number, BlockEntity>) => {
  const ids: ReorderBlock[] = [];
  for (const [ix, id] of blockIds.entries()) {

    const order = blockIds.length - ix;

    if (blocksById[id].blockOrder !== order) {
      ids.push({ blockId: id, blockOrder: order });
    }
  }
  return ids;
}
