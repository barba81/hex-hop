import { useEffect } from "react";
import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import HeaderBar from "./components/header/header-bar";
import { initThemeListener } from "./infrastructure/models/init-theme-listner";

import "./globals.css";
import HexHopNavigator from "./pages/navigator/hex-hop-navigator";
import { loadState } from "./infrastructure/utils/load-state";

function HexHopApp() {
  useEffect(() => {
    initThemeListener();
    moveWindow(Position.TopRight);
    loadState();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col  bg-stone-50/80 dark:bg-stone-800/80 ">
        <HeaderBar />
        <HexHopNavigator />
      </div>
  );
}

export default HexHopApp;
