import { useGradientStore } from "@/store/use-gradient-store";

export async function loadGradientData() {
    console.time();
    /// load all the data 
    useGradientStore.getState().initGradient([]);
    console.timeEnd()
}