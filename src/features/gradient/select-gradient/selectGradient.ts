import { useGradientStore } from "@/store/use-gradient-store"

export const selectGradient = (gradientId: number) => {
    useGradientStore.getState().actions.setActiveGradient(gradientId);
}