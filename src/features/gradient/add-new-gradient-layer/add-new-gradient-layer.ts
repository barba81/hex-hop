import { GradientLayer } from "@/features/infrastructure/entity/gradient.entity";
import { useGradientStore } from "@/store/use-gradient-store";

export const addNewGradientLayer = (gradientId: number | null) => {
    if (gradientId === null) return;

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
     useGradientStore.getState().actions.addLayerToSelected(gradientLayer);
}