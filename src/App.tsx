import { useEffect } from "react";
import "./App.css";

import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import { useTheme } from "./hooks/useTheme";
import HeaderBar from "./components/core/HeaderBar";
import ColorList from "./components/core/ColorList";
import ColorPicker from "./components/core/ColorPicker";


function HexHopApp() {
  const {} = useTheme();

  useEffect(() => {
    moveWindow(Position.TopRight);
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex flex-col gap-1">
        <HeaderBar />
        <ColorList/>
        <ColorPicker />
      </div>
    </>
  );
}

export default HexHopApp;
