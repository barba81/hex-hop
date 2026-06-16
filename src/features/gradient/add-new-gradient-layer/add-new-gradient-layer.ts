import { GradientLayerEntity } from "@/features/infrastructure/entity/gradient.entity";
import { insertGradientLayerAsync } from "@/repo/gradient/gradient-layer-repo";
import { GradientLayerMapper } from "@/repo/gradient/gradient-mapper";
import { useGradientStore } from "@/store/use-gradient-store";


export const addNewGradientLayer = (gradientId: number | null) => {
    if (gradientId === null) return;

    const state = useGradientStore.getState();
    const gradient = state.gradients.find(x => x.id === gradientId);
    if (!gradient) return;
    const order =
        gradient.layers.length;

    const gradientLayer: GradientLayerEntity = {
        id: 0,
        colorSpace: 'longer hue',
        easingFunction: 0,
        order,
        gradientType: "linear",
        rotationDegree: 0,
        patternRepeatNumber: 0,
        stops: []
    };
    // insert into repo

    const gradientLayerDto = GradientLayerMapper.toDto(gradientLayer, gradientId);
    insertGradientLayerAsync(gradientLayerDto);


    // insert into store

    state.actions.addLayerToSelected(gradientLayer);
}