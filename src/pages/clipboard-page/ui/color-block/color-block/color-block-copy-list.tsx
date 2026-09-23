import type { ColorCopyFormula } from "@/infrastructure/models/color-copy-list"
import type { ColorEntity } from "@/infrastructure/models/entity"
import { useHexHopStore } from "@/store/hex-hop-store"


interface ColorBlockCopyProps {
    colorEntity: ColorEntity,
    copyBlock: ColorCopyFormula,
}

const ColorCopyBlock = ({ colorEntity, copyBlock }: ColorBlockCopyProps) => {
    return (
        <div className="cursor-pointer">
            { copyBlock.icon ? (
                <div className="w-4">
                    {/* <Icon size={20} /> */}
                </div>
            ) : (
                <div className="text-xs">{
                    copyBlock.formulaName
                }
                </div>
            )}
        </div>
    );
};

interface ColorBlockCopyListProps {
    colorEntity: ColorEntity
}


export const ColorBlockCopyList = (param: ColorBlockCopyListProps) => {
    const copyList = useHexHopStore((state) => state.copyList);

    return <div className="flex items-start flex-wrap  gap-1 w-30 px-1">
        {copyList.map((copyBlock) => {
            return <ColorCopyBlock key={copyBlock.id} colorEntity={param.colorEntity} copyBlock={copyBlock} />
        })}
    </div>

}