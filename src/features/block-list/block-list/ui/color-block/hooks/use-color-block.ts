import { useAppStore } from "@/shared/store/app-store"

export const useColorBlock = () => {
    const setEditBlock = useAppStore((state) => state.setEditBlock);
    const deleteColorBlock = useAppStore((state) => state.deleteColorBlock);
    return {setEditBlock, deleteColorBlock}
}