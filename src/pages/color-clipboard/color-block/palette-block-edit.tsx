import { PaletteEntity } from "@/infrastructure/models/entity";

type PaletteBlockEditParams = {
    paletteEntity: PaletteEntity
};
const PaletteBlockEdit = ({ paletteEntity }: PaletteBlockEditParams) => {
    return  <div>
        Edit palette
    </div>
}

export default PaletteBlockEdit;