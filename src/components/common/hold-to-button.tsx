import { Button } from "@/components/ui/button";
import type { JSX} from "react";
import { useRef, useState } from "react";

type HoldToButtonParams = {
  action: () => void;
  holdDuration?: number;
  text: JSX.Element;
  holdText: JSX.Element;
  className: string;
};

const HoldToButton = ({
  action,
  holdDuration,
  text,
  holdText,
  className,
}: HoldToButtonParams) => {
  const [isHolding, setIsHolding] = useState(false);
  const timerRef = useRef<number>(null);
  const HOLD_DURATION = holdDuration ?? 750;

  const startHold = () => {
    setIsHolding(true);
    timerRef.current = setTimeout(() => {
      action();
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
      onPointerDown={startHold}
      onPointerUp={stopHold}
      onPointerLeave={stopHold}
      className={`relative    select-none hover:cursor-pointer  ${className}`}
    >
      <div
        className="absolute left-0 bottom-0 top-0 bg-red-500/60  rounded-md"
        style={{
          width: isHolding ? "100%" : "0%",
          transitionDuration: isHolding ? `${HOLD_DURATION}ms` : "150ms",
        }}
      />

      <div className={`relative flex items-center justify-center gap-1  }`}>
        {isHolding ? holdText : text}
      </div>
    </Button>
  );
};

export default HoldToButton;
