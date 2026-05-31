import { useHexHopStore } from "@/store/use-hex-hop-store"

export const removeAllBlocks = (paletteId: number) =>{
    const state = useHexHopStore.getState();
    state.actions.removeAllPalette(paletteId);
}