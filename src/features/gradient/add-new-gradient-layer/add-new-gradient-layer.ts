import { useGradientLayerStore } from "@/store/use-gradient-layer";
import { GradientLayer } from "@/features/infrastructure/entity/gradient.entity";

export const addNewGradientLayer = (selectGradientId: number | null) => {
    if (selectGradientId === null) return;

    // insert into repo
    
    
    
    // insert into store

    const gradientLayer: GradientLayer = {
        id: 0,
        colorSpace: 'longer hue',
        easingFunction: 0,
        order: 0,
        gradientType: "linear",
        rotationDegree: 0,
        patternRepeatNumber: 0,
        stops: []
    };
    useGradientLayerStore.getState().actions.addGradientLayer(
        gradientLayer
    );
}