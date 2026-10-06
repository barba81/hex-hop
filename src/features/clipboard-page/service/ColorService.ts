import { IColorRepository } from "@/features/clipboard-page/service/ColorRepository";

export interface IColorService {
    addColor: () => void;
    updateColor: () => void;
    deleteColor: () => void;
    getColorAutoName: () => void;
}

export class ColorService implements IColorService{
    private repository: IColorRepository;

    constructor(_repository: IColorRepository){
        this.repository = _repository;
    }

    addColor: () => void;
    updateColor: () => void;
    deleteColor: () => void;
    getColorAutoName: () => void;
}