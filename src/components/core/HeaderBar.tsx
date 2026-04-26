import { ColorPallet } from "@/service/colorPallet";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minus, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";
import { useRef, useState } from "react";

const HoldToClear = () => {
  const [isHolding, setIsHolding] = useState(false);
  const timerRef = useRef<number>(null);
  const HOLD_DURATION = 750;

  const startHold = () => {
    setIsHolding(true);
    timerRef.current = setTimeout(() => {
      ColorPallet.ClearAll();
      setIsHolding(false);
    }, HOLD_DURATION);
  };

  const stopHold = () => {
    if (timerRef.current){
      clearTimeout(timerRef.current);
      setIsHolding(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      // Use Pointer events to support both Mouse and Touch
      onPointerDown={startHold}
      onPointerUp={stopHold}
      onPointerLeave={stopHold}
      className="relative overflow-hidden transition-all active:scale-95 select-none hover:cursor-pointer"
    >
      {/* The Visual Fill Layer */}
      <div
        className="absolute left-0 bottom-0 top-0 bg-red-500/60 transition-all ease-linear"
        style={{
          width: isHolding ? "100%" : "0%",
          transitionDuration: isHolding ? `${HOLD_DURATION}ms` : "150ms",
        }}
      />

      {/* The Content */}
      <div className={`relative flex items-center justify-center gap-1  }`}>
        <Trash2 className={isHolding ? "animate-pulse" : ""} />
        {isHolding ? "Hold..." : "Clear all"}
      </div>
    </Button>
  );
};

const ClipboardPalletDecorator = () => {
  return (
    <div
      data-tauri-drag-region
      className="fixed left-1/2 -translate-x-1/2 
        h-3.5 w-35 
        bg-stone-600 
        rounded-b-2xl cursor-pointer "
    />
  );
};

const HeaderBar = () => {
  return (
    <>
      <ClipboardPalletDecorator />

      <div className="flex bg-black/50 w-full justify-between gap-2 px-2 py-1">
        <div className="flex items-center justify-center ">
          <HoldToClear />
        </div>
        <div className="flex gap-2">
          <div
            className="text-gray-900 dark:text-white cursor-pointer hover:bg-gray-400/50 dark:hover:bg-gray-500/50 p-1 rounded-md"
            onClick={() => {
              getCurrentWindow().minimize();
            }}
          >
            <Minus />
          </div>
          <div
            className="text-gray-900 dark:text-white cursor-pointer  hover:bg-red-400/50 p-1 rounded-md"
            onClick={() => {
              getCurrentWindow().close();
            }}
          >
            <X />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderBar;
