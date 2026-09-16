import { invoke } from "@tauri-apps/api/core";
import { useClipboardStore, rootBlockId } from "@/store/clipboard-store";
import { ColorCopyFormula } from "@/infrastructure/models/color-copy-list";
import { BlockEntity } from "@/infrastructure/models/entity";
import { moveWindow, Position } from "@tauri-apps/plugin-positioner";



let isInitialized = false;

export const initializeApp = async () => {
  if (isInitialized) return;
  isInitialized = true;

  await moveWindow(Position.TopRight);
  await initBlocks();
};



export const initBlocks = async () => {
  const [blocks, allCopyFormulas] = await Promise.all([
    invoke<BlockEntity[]>("load_state"),
    invoke<ColorCopyFormula[]>("get_all_color_copy_formula"),
  ]);

  useClipboardStore.setState((state) => {
    if (allCopyFormulas.length > 0) {
      state.colorCopyFormulaActiveId = allCopyFormulas[0].id;
    }
    state.copyList = allCopyFormulas;
    state.blockIds[rootBlockId] = blocks.map((block) => block.blockId);
    state.blocksById = {};

    for (const block of blocks) {
      state.blocksById[block.blockId] = block;

      if (block.kind === "palette" && block.blocks) {
        state.blockIds[block.id] = block.blocks.map((x) => x.blockId);
        for (const innerBlock of block.blocks) {
          state.blocksById[innerBlock.blockId] = innerBlock;
        }
      }
    }
  });
};