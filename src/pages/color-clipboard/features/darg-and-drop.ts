import type { DragEndEvent } from "@dnd-kit/react";
import { useClipboardStore } from "../store/use-clipboard-store";
import { addNewPalette } from "./add-block";

export interface DraggableData {
  blockId: number;
  kind: 'droppable' | 'block' | 'palette';
  palette: number | null
}


export const handleDragEnd = (event: DragEndEvent, colorBlocks: number[]) => {
  const { operation, canceled } = event;

  if (canceled) return;

  const { source, target } = operation;
  if (!source) return;
  if (!target) return;

  const sourceData = source.data as DraggableData;
  const targetData = target.data as DraggableData;
  if ((sourceData.kind === 'block' || sourceData.kind === 'palette') && targetData.kind === 'droppable') {
    blockInDroppable(sourceData, targetData, colorBlocks);
  } else if (sourceData.kind === 'block' && targetData.kind === 'block') {
    blockInBlock(sourceData, targetData, colorBlocks);
  } else  if (sourceData.kind === 'block' && targetData.kind === 'block') {
    blockInPalette(sourceData, targetData, colorBlocks);
  } 
};

// push to end of palette, so closed palette 
const blockInPalette = (sourceData: DraggableData, targetData: DraggableData, colorBlocks: number[]) => {

}

// create new palette, the just need to be not in palette
const blockInBlock = (sourceData: DraggableData, targetData: DraggableData, colorBlocks: number[]) => {
  const draggedId = sourceData.blockId;
  const targetId = targetData.blockId;

  if (draggedId === targetId) return;

  const newBlocks = [...colorBlocks];
  const blockId1 = colorBlocks.indexOf(targetId);
  newBlocks.splice(blockId1, 1);

  const blockId2 = newBlocks.indexOf(draggedId);
  newBlocks.splice(blockId2, 1);

  useClipboardStore.getState().setBlockIds(newBlocks);

  const paletteId = addNewPalette({});

}


// chekc palette 
const blockInDroppable = (sourceData: DraggableData, targetData: DraggableData, colorBlocks: number[]) => {
  const draggedId = sourceData.blockId;
  const targetId = targetData.blockId;

  if (draggedId === targetId) return;
  const oldIndex = colorBlocks.indexOf(draggedId);
  if (oldIndex === -1) return;
  const newBlocks = [...colorBlocks];
  newBlocks.splice(oldIndex, 1);

  if (targetId === -1) {
    newBlocks.splice(0, 0, draggedId);
  } else {
    const targetIndex = colorBlocks.indexOf(targetId);
    if (targetIndex === -1) return;
    const newTargetIndex = newBlocks.indexOf(targetId);
    newBlocks.splice(newTargetIndex + 1, 0, draggedId);
  }
  useClipboardStore.getState().setBlockIds(newBlocks);

  console.log(
    useClipboardStore.getState().blocksById);
}