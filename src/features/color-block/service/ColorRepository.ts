export interface IColorRepository {
    addColor: () => void;
    updateColor: () => void;
    deleteColor: () => void;
    getColorAutoName: () => void;
}

export class ColorRepository implements IColorRepository{
    addColor: () => void;
    updateColor: () => void;
    deleteColor: () => void;
    getColorAutoName: () => void;

}