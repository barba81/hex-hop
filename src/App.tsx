import { useEffect } from "react";
import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import HeaderBar from "./components/header/header-bar";
import { initThemeListener } from "./pages/color-clipboard/features/init-theme-listner";

import "./App.css";
import HexHopNavigator from "./pages/navigator/hex-hop-navigator";
import { loadGradientData } from "./pages/color-clipboard/features/load-state";

function HexHopApp() {
  useEffect(() => {
    initThemeListener();
    moveWindow(Position.TopRight);
    loadGradientData();
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
