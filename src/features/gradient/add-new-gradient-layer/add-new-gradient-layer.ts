import { GradientLayer } from "@/features/infrastructure/entity/gradient.entity";
import { insertGradientLayerAsync } from "@/repo/gradient/gradient-layer";
import { useGradientStore } from "@/store/use-gradient-store";


export const addNewGradientLayer = (gradientId: number | null) => {
    if (gradientId === null) return;

    const state =    useGradientStore.getState();
    const gradient = state.gradients.find(x => x.id === gradientId);
    if (!gradient) return;
    const order =
    gradient.layers.length;

    const gradientLayer: GradientLayer = {
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
     insertGradientLayerAsync(gradientLayer, gradientId);

    
    // insert into store

    state.actions.addLayerToSelected(gradientLayer);
}