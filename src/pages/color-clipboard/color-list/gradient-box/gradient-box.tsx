import { DragDots } from "@/components/common/drag-dots";
import { GradientEntity } from "@/infrastructure/entity";
import { GradientToCssString } from "../../features/gradient-to-css-string";

type GradientBoxParams = {
    gradient: GradientEntity
};

export const GradientBox = ({ gradient }: GradientBoxParams) => {
    return (
        <div
            className={`h-14 rounded-md w-full shrink-0 relative flex items-center justify-between   outline-1 overflow-hidden `}
        >
            <div className="absolute inset-0 bg-checkerboard  rounded-md overflow-hidden">
                <div
                    className="w-full h-full"
                    style={{
                        background: GradientToCssString(gradient)
                    }}
                />
            </div>

            <DragDots />

            <div className=" w-full h-full  relative ">

            </div>
        </div>
    );
};
