import { useEffect } from "react";
import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import HeaderBar from "./components/header/header-bar";
import { initThemeListener } from "./hooks/use-theme";
import HexHopNavigator from "./components/navigator/hex-hop-navigator";
import { getAllData } from "./features/common/get-all-data";
import { initColorNameLookup } from "./features/colors/color-name-suggestion";

import "./App.css";

function HexHopApp() {
  useEffect(() => {
    initThemeListener();
    moveWindow(Position.TopRight);
    const fetchColors = async () => {
      await getAllData();
      await initColorNameLookup();
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
