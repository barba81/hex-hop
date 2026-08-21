import { GradientEntity, PaletteEntity } from "@/infrastructure/models/entity";

type GradientBlockEditParams = {
    gradientEntity: GradientEntity
};
const GradientBlockEdit = ({ gradientEntity }: GradientBlockEditParams) => {
    return <div>
        Edit gradient
    </div>
}

export default GradientBlockEdit;