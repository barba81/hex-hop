import { useHexHopStore } from "@/store/store-bundle";
import { Button } from "@base-ui/react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { cn } from "@/lib/utils"; // Make sure this points to your project's cn utility path

const MacHeaderButton = () => {
  const appWindow = getCurrentWindow();
  const appInFocus = useHexHopStore((state) => state.appInFocus);

  // Shared base styling matching your third button's clean aesthetic & interaction states
  const buttonBaseStyles = cn(
    "w-4 h-4 rounded-full flex items-center justify-center border-[0.5px] transition-all",
    "group relative overflow-hidden",
    appInFocus
      ? "cursor-pointer"
      : "opacity-40 cursor-default pointer-events-none"
  );

  return (
    <div className="flex gap-2 px-3 items-center">
      {/* Close Button */}
      <Button
        onClick={() => appWindow.close()}
        disabled={!appInFocus}
        className={cn(
          buttonBaseStyles,
          "bg-[#ff5f57] border-[#e0443e]"
        )}
      >
        <span className="hidden group-hover:block text-[8px] text-[#4c0000] font-bold">
          ✕
        </span>
      </Button>

      {/* Minimize Button */}
      <Button
        onClick={() => appWindow.minimize()}
        disabled={!appInFocus}
        className={cn(
          buttonBaseStyles,
          "bg-[#febc2e] border-[#d8a124]"
        )}
      >
        <span className="hidden group-hover:block text-[10px] text-[#5c3c00] font-bold mb-0.5">
          -
        </span>
      </Button>

      {/* Third/Placeholder Button */}
      <Button
        disabled={!appInFocus}
        className={cn(
          buttonBaseStyles,
          "bg-[#e6e6e6] dark:bg-[#3d3d3d] border-[#d1d1d1] dark:border-[#2b2b2b]"
        )}
      >
        {/* Optional icon or content for the third button can go here */}
      </Button>
    </div>
  );
};

export default MacHeaderButton;