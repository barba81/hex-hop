import { useEffect } from "react";
import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import { ColorPallet } from "./service/colorPallet";
import HeaderBar from "./components/header/HeaderBar";
import { initThemeListener } from "./hooks/useTheme";
import "./App.css";
import HexHopNavigator from "./components/navigator/HexHopNavigator";

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
      <div className="w-screen h-screen flex flex-col  bg-stone-50/80 dark:bg-stone-800/80 ">
        <HeaderBar />
        <HexHopNavigator />
      </div>
    </>
  );
}

export default HexHopApp;
