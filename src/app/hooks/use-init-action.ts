import { invoke } from "@tauri-apps/api/core";
import type { ColorCopyFormula } from "@/shared/types/color-copy-list";
import type { BlockEntity } from "@/shared/types/entity";
import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { useAppStore } from "@/shared/store/app-store";
import { rootBlockId } from "@/shared/data/const-data";
import { useAppInfoStore } from "@/shared/theme/app-status-store";


let isInitialized = false;

export const useInitializeApp = async () => {
  if (isInitialized) return;
  isInitialized = true;

  await moveWindow(Position.TopRight);
  await initData();
  await initAppEvent();
};

export const initData = async () => {
  const [blocks, allCopyFormulas] = await Promise.all([
    invoke<BlockEntity[]>("load_state"),
    invoke<ColorCopyFormula[]>("get_all_color_copy_formula"),
  ]);

  useAppStore.setState((state) => {
    state.copyCopyFormulas = allCopyFormulas;
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

const initAppEvent = async () => {
  const appWindow = getCurrentWebviewWindow();
  await appWindow.listen("tauri://focus", () => {useAppInfoStore.getState().setAppInFocus(true);});
  await appWindow.listen("tauri://blur", () => {useAppInfoStore.getState().setAppInFocus(false);});
};
