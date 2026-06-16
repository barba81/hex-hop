import { getGradientByIdAsync } from "@/repo/gradient/gradient-repo";
import { getGradientStopsByGradientIdAsync } from "@/repo/gradient/gradient-stop";
import { getGradientLayersByGradientIdAsync } from "@/repo/gradient/gradient-layer";

export const getGradientById = (gradientId: number) => {
    const gradinet = getGradientByIdAsync(gradientId);
    const layers = getGradientLayersByGradientIdAsync(gradientId);
    const stops = getGradientStopsByGradientIdAsync(gradientId);

    debugger;
    
}