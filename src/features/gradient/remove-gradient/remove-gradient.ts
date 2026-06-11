import { useGradientStore } from "@/store/use-gradient-store";

export const deleteGradient = (selectedGradientId: number | null) => {
    if (selectedGradientId === null) return;
    
    useGradientStore.getState().actions.removeGradient(selectedGradientId);
    useGradientStore.getState().actions.setNewActiveGradient();
}