import { useAppStore } from "@/shared/store/app-store";

export const useAddColorToClipboard = () => {
    const isColorValid = useAppStore((state) => state.isColorValid);
    const inputColor = useAppStore((state) => state.inputColor);
    const colorMode = useAppStore((state) => state.colorMode);
    const lastValidColor = useAppStore((state) => state.lastValidColor);

    const handleColorChange = useAppStore((state) => state.handleColorChange);
    const addNewColorToClipboard = useAppStore((state) => state.addNewColor);

    return { isColorValid, inputColor, colorMode, lastValidColor, handleColorChange, addNewColorToClipboard }
}