import type { ColorCopyFormula} from "@/infrastructure/models/color-copy-list";
import { defaultColorCopyFormula } from "@/infrastructure/models/color-copy-list";
import { useAppStore } from "@/store/store";
import { invoke } from "@tauri-apps/api/core";
import { useSettingStore } from "../../store/settings-store";

export const addNewColorCopyBlock = async () => {
  const newCopyFormula = await invoke<ColorCopyFormula>("create_color_copy_formula", {
    colorCopyFormula: { ...defaultColorCopyFormula, id: crypto.randomUUID() },
  });

  useAppStore.setState((state) => {
    state.copyCopyFormulas.push(newCopyFormula);
  });
};

export const flipColorCopyBlockVisibility = async (copyBlockId: string) => {
  const currentList = useAppStore.getState().copyCopyFormulas;
  const oldBlock = currentList.find((x) => x.id === copyBlockId);

  if (!oldBlock) return;

  const newCopyFormula = await invoke<ColorCopyFormula>("update_color_copy_formula", {
    colorCopyFormula: { ...oldBlock, enabled: !oldBlock.enabled },
  });

  useAppStore.setState((state) => {
    const index = state.copyCopyFormulas.findIndex((x) => x.id === copyBlockId);
    if (index !== -1) {
      state.copyCopyFormulas[index] = newCopyFormula;
    }
  });
};

export const deleteColorCopyBlock = async (copyBlockId: string) => {
  await invoke("delete_color_copy_formula", {
    colorFormulaId: copyBlockId,
  });

  useAppStore.setState((state) => {
    state.copyCopyFormulas = state.copyCopyFormulas.filter((x) => x.id !== copyBlockId);
  });
};

export const setColorCopyFormulaActive = async (copyBlockId: string) => {
  useSettingStore.setState((state) => {
     state.colorCopyFormulaActiveId = copyBlockId;
  });
};
