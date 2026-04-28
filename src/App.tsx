import { useEffect } from "react";
import "./App.css";

import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import { useTheme } from "./hooks/useTheme";
import HeaderBar from "./components/core/HeaderBar";
import ColorList from "./components/core/ColorList";
import ColorPicker from "./components/core/ColorPicker";
import { ColorPallet } from "./service/colorPallet";
import { Toaster } from "sonner";

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
      <div className="w-screen h-screen flex flex-col gap-0.5 dark:bg-stone-800/80 bg-stone-200/80">
      <Toaster 
          theme="dark" 
          position="bottom-center"
          toastOptions={{
            className: " text-xs py-2 px-3 flex justify-center",
          }}
        />
        <HeaderBar />
        <ColorList />
        <ColorPicker />
      </div>
    </>
  );
}

export default HexHopApp;
