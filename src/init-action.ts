import { invoke } from "@tauri-apps/api/core";
import { useHexHopStore } from "@/store/hex-hop-store";
import type { ColorCopyFormula } from "@/infrastructure/models/color-copy-list";
import type { BlockEntity } from "@/infrastructure/models/entity";
import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { useAppInfoStore } from "./store/app-status-store";
import { rootBlockId } from "./infrastructure/data/const-data";

let isInitialized = false;

export const initializeApp = async () => {
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

  useHexHopStore.setState((state) => {
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
