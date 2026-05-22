import { type Palette } from "@/features/Infrastructure/Domain/Palette.model";
import { type Color } from "@/features/Infrastructure/Domain/Color.model";
import { type Gradient } from "@/features/Infrastructure/Domain/Gradient.model";
import { create } from "zustand";

interface HexHopStore {
    palettes: Palette[];
    colors: Color[];
    gradients: Gradient[];
    actions: HexHopAction;
}

interface HexHopAction {
    setColors: (color: Color) => void;
}

const useHexHopStore = create<HexHopStore>((set) => ({
    palettes: [],
    colors: [],
    gradients: [],
    actions : {
        setColors: function (color: Color): void {
            set({colors: []})
        }
    }
}));
