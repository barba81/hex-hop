import { GradientStopEntity } from "@/features/infrastructure/entity/gradient.entity";
import { useGradientStore } from "@/store/use-gradient-store";

export const addNewColorToLayer = (layerId: number) => {
    const newColorStop: GradientStopEntity = {
        a: 1, b: 0.5, g: 0.5, r: 0.5,
        id: 0,
        order: 0,
        layerId: 0,
        position: 0
    }; 
    // add to repo
    // add to state
    useGradientStore.getState().actions.addGradientStop(layerId,newColorStop);

}