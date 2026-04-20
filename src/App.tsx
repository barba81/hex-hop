import { useEffect, useState } from "react";
import "./App.css";

import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import { Minus, Pipette, X } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useTheme } from "./hooks/useTheme";

const CloseBar = () => {
  return (
    <>
    <div data-tauri-drag-region className="fixed left-1/2 -translate-x-1/2 h-5 w-40 bg-stone-600 dark:bg-stone-100 rounded-b-2xl cursor-pointer " />
      <div className="flex  w-full justify-end gap-2 px-1">
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

const ColorList = () => {
  return (
    <>
      <div className="flex flex-1 px-2 flex-col gap-2">
        <div className="h-12 rounded-md w-full bg-rose-500" />
        <div className="h-12 rounded-md w-full bg-sky-400" />
        <div className="h-12 rounded-md w-full bg-emerald-500" />
        <div className="h-12 rounded-md w-full bg-indigo-500" />
        <div className="h-12 rounded-md w-full bg-indigo-500" />
        <div className="h-12 rounded-md w-full bg-indigo-500" />
      </div>
    </>
  );
};


const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const handlePickColor = async () => {
    // 1. Check if the browser supports the EyeDropper API
    if (!window.EyeDropper) {
      alert("Your browser does not support the EyeDropper API.");
      return;
    }

    const eyeDropper = new window.EyeDropper();

    try {
      // 2. Open the pipette tool
      const result = await eyeDropper.open();
      // 3. The result returns an object: { sRGBHex: '#000000' }
      setSelectedColor(result.sRGBHex);
    } catch (e) {
      console.log("Color selection cancelled or failed");
    }
  };

  return (
    <div className="flex items-center p-3 gap-4">
      <button 
        onClick={handlePickColor}
        className="p-2 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors"
        title="Pick a color"
      >
        <Pipette size={24} color={selectedColor} />
      </button>

      {/* Visual indicator of the selected color */}
      <div className="flex items-center gap-2">
        <div 
          className="w-8 h-8 rounded-full border border-gray-300" 
          style={{ backgroundColor: selectedColor }}
        />
        <span className="font-mono uppercase">{selectedColor}</span>
      </div>
    </div>
  );
};

function HexHopApp() {
  const {} = useTheme();

  useEffect(() => {
    moveWindow(Position.TopRight);
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex flex-col  gap-2">
        <CloseBar />
        <ColorList/>
        <ColorPicker />
      </div>
    </>
  );
}

export default HexHopApp;
