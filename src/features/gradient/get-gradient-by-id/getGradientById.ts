import { getGradientByIdAsync } from "@/repo/gradient/gradient-repo";
import { getGradientStopsByGradientIdAsync } from "@/repo/gradient/gradient-stop";
import { getGradientLayersByGradientIdAsync } from "@/repo/gradient/gradient-layer";
import _ from "lodash";
import { GradientMapper } from "@/repo/gradient/gradient-mapper";

export const getGradientById = async (gradientId: number) => {
    const gradient = await getGradientByIdAsync(gradientId);
    const layers = await getGradientLayersByGradientIdAsync(gradientId);
    const stops = await getGradientStopsByGradientIdAsync(gradientId);

    const gradientEntity= GradientMapper.fromDto(gradient, layers, stops);
    debugger;
    return gradientEntity;
}