import { IColorRepository } from "@/features/color-block/service/ColorRepository";
import { invoke } from "@tauri-apps/api/core";


export interface IColorService {
    addColor: () => void;
    updateColor: () => void;
    deleteColor: () => void;
}

export class ColorService implements IColorService {
    private repository: IColorRepository;

    constructor(_repository: IColorRepository) {
        this.repository = _repository;
    }

    public addColor(){

    }

    updateColor(){

    }

    deleteColor(){

    } 
}