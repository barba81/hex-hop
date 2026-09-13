import { ColorCopyList } from "@/infrastructure/models/color-copy-list"
import { ColorEntity } from "@/infrastructure/models/entity"
import { useClipboardStore } from "@/store/clipboard-store"


interface ColorBlockCopyProps {
    colorEntity: ColorEntity,
    copyBlock: ColorCopyList,
}

const ColorCopyBlock = ({ colorEntity, copyBlock }: ColorBlockCopyProps) => {
    const Icon = copyBlock.icon;

    return (
        <div className="cursor-pointer">
            {copyBlock.isIcon && copyBlock.icon ? (
                <div className="w-4">
                    <Icon size={20} />
                </div>
            ) : (
                <div className="text-xs">{
                    copyBlock.fallBackName
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
    const copyList = useClipboardStore((state) => state.copyList);

    return <div className="flex items-start flex-wrap  gap-1 w-30 px-1">
        {copyList.map((copyBlock) => {
            return <ColorCopyBlock key={copyBlock.id} colorEntity={param.colorEntity} copyBlock={copyBlock} />
        })}
    </div>

}