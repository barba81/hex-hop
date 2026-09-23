import { cn } from "@/lib/utils";
import { useHexHopStore } from "@/store/store-bundle";
import { Button } from "@base-ui/react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Maximize2, Minus, X } from "lucide-react";

const disabledBackground = "bg-[#e6e6e6] dark:bg-[#3d3d3d]";
const commonButtonStyles = "cursor-pointer w-3.5 h-3.5 border-[0.5px] rounded-full flex items-center justify-center";

interface MacHeaderButtonProps {
  disabledButtons?: ("close" | "minimize" | "maximize")[];
}

const MacHeaderButton = ({ disabledButtons = [] }: MacHeaderButtonProps) => {
  const appWindow = getCurrentWindow();
  const appInFocus = useHexHopStore((state) => state.appInFocus);

  const isCloseDisabled = !appInFocus || disabledButtons.includes("close");
  const isMinimizeDisabled = !appInFocus || disabledButtons.includes("minimize");
  const isMaximizeDisabled = !appInFocus || disabledButtons.includes("maximize");

  return (
    <div className="flex gap-2 px-2 items-center group">
      <Button
        onClick={() => appWindow.close()}
        disabled={isCloseDisabled}
        className={cn(
          commonButtonStyles,
          !isCloseDisabled ? "bg-[#ff5f57] border-[#e0443e]" : disabledBackground,
        )}
      >
        <span
          className={cn(
            "items-center justify-center text-[#4c0000]",
            isCloseDisabled ? "hidden" : "hidden group-hover:flex",
          )}
        >
          <X size={8} strokeWidth={4} />
        </span>
      </Button>

      <Button
        onClick={() => appWindow.minimize()}
        disabled={isMinimizeDisabled}
        className={cn(
          commonButtonStyles,
          !isMinimizeDisabled ? "bg-[#febc2e] border-[#d8a124]" : disabledBackground,
        )}
      >
        <span
          className={cn(
            "items-center justify-center text-[#5c3c00]",
            isMinimizeDisabled ? "hidden" : "hidden group-hover:flex",
          )}
        >
          <Minus size={8} strokeWidth={4} />
        </span>
      </Button>

      <Button
        onClick={() => appWindow.toggleMaximize()}
        disabled={isMaximizeDisabled}
        className={cn(
          commonButtonStyles,
          !isMaximizeDisabled ? "bg-[#28c840] border-[#1aab29]" : disabledBackground,
        )}
      >
        <span
          className={cn(
            "items-center justify-center text-[#006000]",
            isMaximizeDisabled ? "hidden" : "hidden group-hover:flex",
          )}
        >
          <Maximize2 size={7} strokeWidth={4} />
        </span>
      </Button>
    </div>
  );
};

export default MacHeaderButton;