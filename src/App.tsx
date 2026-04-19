import { useEffect, useState } from "react";
import "./App.css";

import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import { Pipette, X } from "lucide-react";
import { getCurrentWindow } from '@tauri-apps/api/window';

const CloseBar = () => {
  return (
    <>
      <div className="flex  w-full justify-end ">
        <div className="cursor-pointer hover:bg-red-900 p-1 rounded-md" onClick={() => {
          getCurrentWindow().close();
        }}>
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
          <input/>
        </div>
      </div>
    </>
  )
}
 
function HexHopApp() {
  useEffect(() => {
    moveWindow(Position.BottomRight);
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <CloseBar /> 
        <ColorPicker/>
      </div>
    </>
  );
}

export default HexHopApp;
