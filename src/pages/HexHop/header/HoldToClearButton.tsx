import { Button } from "@/components/ui/button";
import { ColorPallet } from "@/service/colorPallet";
import {  Trash2 } from "lucide-react";
import { useRef, useState } from "react";

// TODO update this to create hold -> 


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
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      setIsHolding(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onPointerDown={startHold}
      onPointerUp={stopHold}
      onPointerLeave={stopHold}
      className="relative overflow-hidden transition-all active:scale-95 select-none hover:cursor-pointer"
    >
      <div
        className="absolute left-0 bottom-0 top-0 bg-red-500/60 transition-all ease-linear"
        style={{
          width: isHolding ? "100%" : "0%",
          transitionDuration: isHolding ? `${HOLD_DURATION}ms` : "150ms",
        }}
      />

      <div className={`relative flex items-center justify-center gap-1  }`}>
        <Trash2 className={isHolding ? "animate-pulse" : ""} />
        {isHolding ? "Hold..." : "Clear all"}
      </div>
    </Button>
  );
};


export default HoldToClear;