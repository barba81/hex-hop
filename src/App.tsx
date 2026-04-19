import { useEffect } from "react";
import "./App.css";

import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import { Minus, Pipette, X } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useTheme } from "./hooks/useTheme";

const CloseBar = () => {
  return (
    <>
      <div className="flex  w-full justify-end gap-2 p-1">
        <div
          className="text-gray-900 dark:text-white cursor-pointer hover:bg-gray-400/50 dark:hover:bg-gray-800/50 p-1 rounded-md"
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
    </>
  );
};

const ColorPicker = () => {
  return (
    <>
      <div className="flex p-3 justify-end bg-amber-50">
        <div className="outline-2 p-2 rounded-2xl bg-white">
          <Pipette />
        </div>
        <div>
          <input />
        </div>
      </div>
    </>
  );
};

function HexHopApp() {
  const {} = useTheme();

  useEffect(() => {
    moveWindow(Position.BottomRight);
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex flex-col  ">
        <CloseBar />
      </div>
    </>
  );
}

export default HexHopApp;
