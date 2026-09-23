import { cn } from "@/lib/utils";
import { useHexHopStore } from "@/store/store-bundle";
import { Button } from "@base-ui/react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minus, X } from "lucide-react";

const disabledBacgorund = "bg-[#e6e6e6] dark:bg-[#3d3d3d] ";

const MacHeaderButton = () => {
  const appWindow = getCurrentWindow();
  const appInFocus = useHexHopStore((state) => state.appInFocus);
  return (
    <div className="flex gap-2 px-3 items-center group">
      <Button
        onClick={() => appWindow.close()}
        disabled={!appInFocus}
        className={cn(
          "cursor-pointer w-4 h-4  border-[0.5px] rounded-full flex items-center justify-center",
          appInFocus
            ? "bg-[#ff5f57] border-[#e0443e]"
            : disabledBacgorund,
        )}
      >
        <span className="hidden group-hover:block text-[8px] text-[#4c0000] font-bold">
          <X size={9} strokeWidth={4} />
        </span>
      </Button>

      <Button
        onClick={() => appWindow.minimize()}
        className={cn(
          "cursor-pointer w-4 h-4 rounded-full flex items-center justify-center",
          appInFocus
            ? " bg-[#febc2e] border-[#d8a124]"
            : disabledBacgorund,
        )}
      >
        <span className="hidden group-hover:block text-[10px] text-[#5c3c00] font-bold mb-0.5">
          <Minus size={9} strokeWidth={4}  />
        </span>
      </Button>

      <Button className="w-4 h-4 rounded-full border-[0.5px] border-[#d1d1d1] dark:border-[#2b2b2b] flex items-center justify-center cursor-default"></Button>
    </div>
  );
};

export default MacHeaderButton;
