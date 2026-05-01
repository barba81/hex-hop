import { useEffect } from "react";
import "./App.css";
import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import { ColorPallet } from "./service/colorPallet";
import HeaderBar from "./pages/HexHop/header/HeaderBar";
import ColorList from "./pages/HexHop/colorList/ColorList";
import ColorPicker from "./pages/HexHop/colorPicker/ColorPicker";
import { initThemeListener } from "./hooks/useTheme";

function HexHopApp() {
  useEffect(() => {
    initThemeListener();
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
      <div className="w-screen h-screen flex flex-col gap-0.5 bg-stone-50/80 dark:bg-stone-800/80 ">
        <HeaderBar />
        <ColorList />
        <ColorPicker />
      </div>
    </>
  );
}

export default HexHopApp;
