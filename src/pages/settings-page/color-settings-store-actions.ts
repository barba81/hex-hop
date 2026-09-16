import { ColorCopyFormula, defaultColorCopyFormula } from "@/infrastructure/models/color-copy-list";
import { useClipboardStore } from "@/store/clipboard-store";
import { invoke } from "@tauri-apps/api/core";

export const addNewColorCopyBlock = () => useClipboardStore.setState(async () => {
    const newCopyFormula = await invoke<ColorCopyFormula>("create_color_copy_formula", {
        colorCopyFormula: { ...defaultColorCopyFormula, id: crypto.randomUUID() }
    });

    useClipboardStore.setState((state) => {
        state.copyList.push(newCopyFormula);
    });
})



export const flipColorCopyBlockVisiblity = (copyBlockId: string) => useClipboardStore.setState(async (state) => {
    const copyBlockIx = state.copyList.findIndex(x => x.id === copyBlockId);

    if (copyBlockIx < 0) return;

    const oldBlock = state.copyList[copyBlockIx];
    const newCopyFormula = await invoke<ColorCopyFormula>("update_color_copy_formula", {
        colorCopyFormula: { ...oldBlock, enabled: !oldBlock.enabled }
    });

    useClipboardStore.setState((state) => {
        state.copyList[copyBlockIx] = newCopyFormula;
    });
})

export const deleteColorCopyBlock = (copyBlockId: string) => useClipboardStore.setState(async (state) => {
    await invoke("delete_color_copy_formula", {
        colorFormulaId: copyBlockId
    });

    useClipboardStore.setState((state) => {
        state.copyList = state.copyList.filter(x => x.id !== copyBlockId);
    });
})

