import { Copy, TriangleAlert, TvMinimal } from "lucide-react";
import { useSettingStore } from "./store/use-setting-store";

export const SettingsNavigator = () => {
    const setActiveSettingPage = useSettingStore((state) => state.setActiveSettingPage);

    return (
        <div className="flex w-full dark:bg-zinc-800  px-1 py-1 h-8  ">
            <button className="flex px-2 rounded-md  gap-1.5 text-sm items-center cursor-pointer hover:bg-accent " onClick={() => setActiveSettingPage('view')}>
                <TvMinimal size={15} /> View
            </button>
            <button className="flex px-2 rounded-md  gap-1.5 text-sm items-center cursor-pointer hover:bg-accent " onClick={() => setActiveSettingPage('color-block')}>
                <Copy size={15} /> Color block
            </button>
            <button className="flex p-1.5 rounded-md gap-1.5 text-sm items-center cursor-pointer text-destructive  hover:bg-destructive/20  transition-colors" onClick={() => setActiveSettingPage('danger')}>
                <TriangleAlert size={15} /> Danger settings
            </button>
        </div>
    )
}

export default SettingsNavigator;