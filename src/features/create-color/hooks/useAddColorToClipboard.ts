import { useAppStore } from "@/shared/store/app-store";

export const useAddColorToClipboard = () => {
    const isColorValid = useAppStore((state) => state.isColorValid);
    const inputColor = useAppStore((state) => state.inputColor);
    const addNewColorToClipboard = useAppStore((state) => state.addNewColor);

    return { isColorValid, inputColor, addNewColorToClipboard }
}