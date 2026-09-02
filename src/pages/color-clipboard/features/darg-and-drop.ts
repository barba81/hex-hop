import type { DragEndEvent } from "@dnd-kit/react";
import { rootBlockId, useClipboardStore } from "../store/clipboard-store";
import { invoke } from "@tauri-apps/api/core";
import type { BlockEntity, PaletteEntity } from "@/infrastructure/models/entity";
import { useColorListCommands } from "@/infrastructure/command/command-manager-provider";

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

  const oldDroppableOrder = [...draggedColorBlocks];
  const oldTargetOrder = [...targetColorBlocks];

  const newDraggedBlocks = [...draggedColorBlocks];

  const oldIndex = newDraggedBlocks.indexOf(draggedId);

  if (oldIndex === -1) return;
  newDraggedBlocks.splice(oldIndex, 1);

  let newTargetBlocks = []
  if (draggedParent === targetParent) {
    newTargetBlocks = newDraggedBlocks;
  } else {
    newTargetBlocks = [...targetColorBlocks];
  }


  if (targetId === -1) {
    newTargetBlocks.splice(0, 0, draggedId);
  } else {
    const targetIndex = newTargetBlocks.indexOf(targetId);
    if (targetIndex === -1) return;
    const newTargetIndex = newTargetBlocks.indexOf(targetId);
    newTargetBlocks.splice(newTargetIndex + 1, 0, draggedId);
  }

  const updatedState = useClipboardStore.getState();


  const { ids: id, oldIds: oldIds1 } = reorderHelper(newDraggedBlocks, updatedState.blocksById);
  const { ids: id2, oldIds: oldIds2 } = reorderHelper(newTargetBlocks, updatedState.blocksById);

  const newReorderBlocks = [...id, ...id2];
  const oldReorderBlocks = [...oldIds1, ...oldIds2];

  state.reorderBlocks([
    { blockId: newDraggedBlocks, paletteId: draggedParent },
    { blockId: newTargetBlocks, paletteId: targetParent }]);

  await invoke("update_blocks_parent", { paletteId: targetParent, blockIds: [draggedId] });
  await invoke("update_block_order", { reorderBlocks: newReorderBlocks });

  useColorListCommands.getState().push({
    async undo() {
      state.reorderBlocks([
        { blockId: oldDroppableOrder, paletteId: draggedParent },
        { blockId: oldTargetOrder, paletteId: targetParent }]);

      await invoke("update_blocks_parent", { paletteId: draggedParent, blockIds: [draggedId] });
      await invoke("update_block_order", { reorderBlocks: oldReorderBlocks });

    },
    async redo() {
      state.reorderBlocks([
        { blockId: newDraggedBlocks, paletteId: draggedParent },
        { blockId: newTargetBlocks, paletteId: targetParent }]);

      await invoke("update_blocks_parent", { paletteId: targetParent, blockIds: [draggedId] });
      await invoke("update_block_order", { reorderBlocks: newReorderBlocks });
    },
  });
}

// create new palette, the just need to be not in palette
const blockInBlock = async (sourceData: DraggableData, targetData: DraggableData) => {
  const draggedBlockId = sourceData.blockId;
  const targetBlockId = targetData.blockId;

  if (draggedBlockId === targetBlockId) return;

  const draggedParentId = sourceData.palette;
  const targetParentId = targetData.palette;

  // you can create palette only in root 
  if (targetParentId !== null) return;

  const state = useClipboardStore.getState();

  const draggedColorBlocks = state.blockIds[draggedParentId ?? rootBlockId];
  const targetColorBlocks = state.blockIds[targetParentId ?? rootBlockId];
  const root = [...state.blockIds[rootBlockId]];

  const sourceBlocks = [...draggedColorBlocks];
  const oldSourceBlocks = [...draggedColorBlocks];
  const oldTargetBlocks = [...targetColorBlocks];

  // this shit is if there are from same 
  let targetBlocks = []
  if (draggedParentId === targetParentId) {
    targetBlocks = sourceBlocks;
  } else {
    targetBlocks = [...targetColorBlocks];
  }


  // remove them form draggedBlockId
  const dropIx = sourceBlocks.indexOf(draggedBlockId);
  sourceBlocks.splice(dropIx, 1);

  const targetIx = targetBlocks.indexOf(targetBlockId);
  targetBlocks.splice(targetIx, 1);
  // create nwe bloc
  const newPaletteBlocIds = [targetBlockId, draggedBlockId];

  // create palette and insert into the new list 
  const paletteEntity = await invoke<PaletteEntity>("create_palette", { palette: { name: "New palette", blockIds: [targetBlockId, draggedBlockId] } });

  state.insertPalette(paletteEntity, [targetBlockId, draggedBlockId], targetIx);

  targetBlocks.splice(targetIx, 0, paletteEntity.blockId);

  // THIS IS SHIT
  const updateState = useClipboardStore.getState();

  const { ids: id1, oldIds: oldIds1 } = reorderHelper(sourceBlocks, updateState.blocksById);
  const { ids: id2, oldIds: oldIds2 } = reorderHelper(targetBlocks, updateState.blocksById);

  const reorderBlocks = [
    ...id1, ...id2
  ];
  const oldReorderBlocks = [...oldIds1, ...oldIds2];

  state.reorderBlocks([
    { blockId: newPaletteBlocIds, paletteId: paletteEntity.id },
    { blockId: sourceBlocks, paletteId: draggedParentId },
    { blockId: targetBlocks, paletteId: targetParentId },
  ]);

  await invoke("update_block_order", { reorderBlocks });


  useColorListCommands.getState().push({
    async undo() {

      await invoke("soft_delete_block", { blockId: paletteEntity.blockId });
      await invoke("update_blocks_parent", { paletteId: draggedParentId, blockIds: [draggedBlockId] });
      await invoke("update_blocks_parent", { paletteId: targetParentId, blockIds: [targetBlockId] });
      await invoke("update_block_order", { reorderBlocks: oldReorderBlocks });

      useClipboardStore.getState().deleteBlock(paletteEntity.blockId, null);
      state.reorderBlocks([
        { blockId: root, paletteId: null },
        { blockId: oldSourceBlocks, paletteId: draggedParentId },
        { blockId: oldTargetBlocks, paletteId: targetParentId },
      ]);

    },
    async redo() {
      await invoke("restore_block", { blockId: paletteEntity.blockId });
      const entity = await invoke<PaletteEntity>("get_palette", { paletteId:paletteEntity.id });
      await invoke("update_block_order", { reorderBlocks });
      await invoke("update_blocks_parent", { paletteId: paletteEntity.id, blockIds: [targetBlockId, draggedBlockId] });
      
      state.insertPalette(entity, [targetBlockId, draggedBlockId], targetIx);
      state.reorderBlocks([
        { blockId: newPaletteBlocIds, paletteId: paletteEntity.id },
        { blockId: sourceBlocks, paletteId: draggedParentId },
        { blockId: targetBlocks, paletteId: targetParentId },
      ]);
    },
  });

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

  const oldDraggedBlocks = [...draggedColorBlocks];
  const oldTargetColorBlocks = [...targetColorBlocks];

  const newDraggedBlocks = [...draggedColorBlocks];
  const newTargetColorBlocks = [...targetColorBlocks];

  const blockIx1 = draggedColorBlocks.indexOf(draggedId);
  newDraggedBlocks.splice(blockIx1, 1);

  newTargetColorBlocks.push(draggedId);

  const updatedState = useClipboardStore.getState();

  const { ids: id, oldIds: oldIds1 } = reorderHelper(newTargetColorBlocks, updatedState.blocksById);
  const { ids: id2, oldIds: oldIds2 } = reorderHelper(newDraggedBlocks, updatedState.blocksById);

  const reorderBlocksDrag = [...id, ...id2];
  const oldReorderBlocksDrag = [...oldIds1, ...oldIds2];

  state.reorderBlocks([
    { blockId: newDraggedBlocks, paletteId: draggedPalette },
    { blockId: newTargetColorBlocks, paletteId: targetPalette }
  ]);

  await invoke("update_blocks_parent", { paletteId: targetPalette, blockIds: [draggedId] });
  await invoke("update_block_order", { reorderBlocks: reorderBlocksDrag });


  useColorListCommands.getState().push({
    async undo() {
      state.reorderBlocks([
        { blockId: oldDraggedBlocks, paletteId: draggedPalette },
        { blockId: oldTargetColorBlocks, paletteId: targetPalette }
      ]);
      await invoke("update_blocks_parent", { paletteId: draggedPalette, blockIds: [draggedId] });
      await invoke("update_block_order", { reorderBlocks: oldReorderBlocksDrag });
    },
    async redo() {

      state.reorderBlocks([
        { blockId: newDraggedBlocks, paletteId: draggedPalette },
        { blockId: newTargetColorBlocks, paletteId: targetPalette }
      ]);

      await invoke("update_blocks_parent", { paletteId: targetPalette, blockIds: [draggedId] });
      await invoke("update_block_order", { reorderBlocks: reorderBlocksDrag });
    },
  });
}

const reorderHelper = (blockIds: number[], blocksById: Record<number, BlockEntity>) => {
  const ids: ReorderBlock[] = [];
  const oldIds: ReorderBlock[] = [];
  for (const [ix, id] of blockIds.entries()) {

    const order = blockIds.length - ix;
    const block = blocksById[id];
    if (block.blockOrder !== order) {
      ids.push({ blockId: id, blockOrder: order });
      oldIds.push({ blockId: id, blockOrder: block.blockOrder });
    }
  }
  return { ids, oldIds };
}