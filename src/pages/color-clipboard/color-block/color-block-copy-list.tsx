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
        <div className="w-3 cursor-pointer">
            {copyBlock.isIcon && copyBlock.icon ? (

                <Icon size={20} />
            ) : (
                <div className="text-xs">{
                    copyBlock.fallBack
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

    return <div className="flex h-full items-center gap-1 w-40 ">
        {copyList.map((copyBlock) => {
            return <ColorCopyBlock key={copyBlock.id} colorEntity={param.colorEntity} copyBlock={copyBlock} />
        })}
    </div>

}