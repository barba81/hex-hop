import { useEffect } from "react";
import "./App.css";

import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import { useTheme } from "./hooks/useTheme";
import HeaderBar from "./components/core/HeaderBar";
import ColorList from "./components/core/ColorList";
import ColorPicker from "./components/core/ColorPicker";
import { ColorPallet } from "./service/colorPallet";

function HexHopApp() {
  const {} = useTheme();
  useEffect(() => {
    moveWindow(Position.TopRight);

    const fetchColors = async () => {
      try {
        await ColorPallet.LoadAllColor();
      } catch (error) {
        console.error("Failed to fetch colors:", error);
      }
    };

    fetchColors();
  }, []);
  return (
    <>
      <div className="w-screen h-screen flex flex-col gap-0.5 bg-stone-800/80">
        <HeaderBar />
        <ColorList />
        <ColorPicker />
      </div>
    </>
  );
}

export default HexHopApp;
