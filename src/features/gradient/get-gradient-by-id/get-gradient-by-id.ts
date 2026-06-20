import { getGradientByIdAsync } from "@/repo/gradient/gradient-repo";
import { getGradientStopsByGradientIdAsync, getGradientStopsByIdAsync, getGradientStopsByLayerIdAsync } from "@/repo/gradient/gradient-stop-repo";
import { getGradientLayersByGradientIdAsync, getGradientLayersByIdAsync } from "@/repo/gradient/gradient-layer-repo";
import { GradientLayerMapper, GradientMapper, GradientStopMapper } from "@/repo/gradient/gradient-mapper";

export const getGradientById = async (gradientId: number) => {
    const gradient = await getGradientByIdAsync(gradientId);
    const layers = await getGradientLayersByGradientIdAsync(gradientId);
    const stops = await getGradientStopsByGradientIdAsync(gradientId);

    const gradientEntity = GradientMapper.fromDto(gradient, layers, stops);
    return gradientEntity;
}

export const getGradientLayerById = async (layerId: number) => {
    const layers = await getGradientLayersByIdAsync(layerId); 4
    const stops = await getGradientStopsByLayerIdAsync(layerId);

    const gradientEntity = GradientLayerMapper.fromDto(layers, stops);
    return gradientEntity;
}


export const getGradientStopById = async (stopId: number) => {
    const stop = await getGradientStopsByIdAsync(stopId);
    const gradientEntity = GradientStopMapper.fromDto(stop);
    return gradientEntity;
}