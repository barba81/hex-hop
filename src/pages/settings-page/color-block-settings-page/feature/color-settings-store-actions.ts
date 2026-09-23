import type { ColorCopyFormula} from "@/infrastructure/models/color-copy-list";
import { defaultColorCopyFormula } from "@/infrastructure/models/color-copy-list";
import { useHexHopStore } from "@/store/hexhop-store";
import { invoke } from "@tauri-apps/api/core";

export const addNewColorCopyBlock = async () => {
  const newCopyFormula = await invoke<ColorCopyFormula>("create_color_copy_formula", {
    colorCopyFormula: { ...defaultColorCopyFormula, id: crypto.randomUUID() },
  });

  useHexHopStore.setState((state) => {
    state.copyList.push(newCopyFormula);
  });
};

export const flipColorCopyBlockVisibility = async (copyBlockId: string) => {
  const currentList = useHexHopStore.getState().copyList;
  const oldBlock = currentList.find((x) => x.id === copyBlockId);

  if (!oldBlock) return;

  const newCopyFormula = await invoke<ColorCopyFormula>("update_color_copy_formula", {
    colorCopyFormula: { ...oldBlock, enabled: !oldBlock.enabled },
  });

  useHexHopStore.setState((state) => {
    const index = state.copyList.findIndex((x) => x.id === copyBlockId);
    if (index !== -1) {
      state.copyList[index] = newCopyFormula;
    }
  });
};

export const deleteColorCopyBlock = async (copyBlockId: string) => {
  await invoke("delete_color_copy_formula", {
    colorFormulaId: copyBlockId,
  });

  useHexHopStore.setState((state) => {
    state.copyList = state.copyList.filter((x) => x.id !== copyBlockId);
  });
};

export const setColorCopyFormulaActive = async (copyBlockId: string) => {
  useHexHopStore.setState((state) => {
     state.colorCopyFormulaActiveId = copyBlockId;
  });
};
