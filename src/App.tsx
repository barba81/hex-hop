import { useEffect } from "react";
import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import { ColorPallet } from "./features/Colors/colorPallet";
import HeaderBar from "./components/header/HeaderBar";
import { initThemeListener } from "./hooks/useTheme";
import "./App.css";
import HexHopNavigator from "./components/navigator/HexHopNavigator";
import { ColorLookupName } from "./features/Colors/colorLookup";
import { GetAllData } from "./features/GetAllData/GetAllData";

function HexHopApp() {

  useEffect(() => {
    initThemeListener();
    moveWindow(Position.TopRight);
    const fetchColors = async () => {
      await GetAllData();
      await ColorLookupName.addColorNameLookup();
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



