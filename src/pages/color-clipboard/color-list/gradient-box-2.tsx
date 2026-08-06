import { DragDots } from "@/components/common/drag-dots";
import type { GradientEntity } from "@/infrastructure/entity";
import { gradientToCssString } from "../features/gradient-to-css-string";

type GradientBoxParams = {
    gradientEntity: GradientEntity
};
export const GradientBlock2 = ({ gradientEntity }: GradientBoxParams) => {
    const gradientBackground =  gradientToCssString(gradientEntity);
    return (
        <div
            className="h-17 rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden"
        >
            <div className="flex items-center justify-center  shrink-0">
                <DragDots />
            </div>

            <div className="flex-1 flex flex-col justify-between overflow-hidden">
                <div
                    className="w-full h-5 flex-1"
                    style={{
                        backgroundImage: gradientBackground,
                    }}
                />

                <div className="w-full h-7 flex flex-row justify-between pr-2">
                    <div className="flex">
                    </div>
                    <div className="flex gap-2 h-full items-center">
                        {gradientEntity.name}
                    </div>
                </div>
            </div>
        </div>
    );
};