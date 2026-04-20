import { useEffect, useState } from "react";
import "./App.css";

import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import { Minus, Pipette, X } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useTheme } from "./hooks/useTheme";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}

const CloseBar = () => {
  return (
    <>
    <div data-tauri-drag-region className="fixed left-1/2 -translate-x-1/2 h-5 w-40 bg-stone-600 dark:bg-stone-100 rounded-b-2xl cursor-pointer " />
      <div data-tauri-drag-region  className="flex border-b-2 bg-black/20 w-full justify-end gap-2 p-1">
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
    /* 1. overflow-y-auto: adds scrollbar if needed
       2. flex-1: tells this div to take up all remaining space between top/bottom bars
    */
    <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-2">
    
    </div>
  );
};


const ColorPicker = () => {
  const [, setSelectedColor] = useState('#ffffff');

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
    <div className="flex items-center p-2 gap-2 border-t-2 bg-black/20">
      <Button  onClick={handlePickColor} >  <Pipette size={24} /></Button>
      <Input placeholder="Enter text" />
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
      <div className="w-screen h-screen flex flex-col overflow-hidden gap-1">
        <CloseBar />
        <ColorList/>
        <ColorPicker />
      </div>
    </>
  );
}

export default HexHopApp;
