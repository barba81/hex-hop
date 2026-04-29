import { useEffect } from "react";
import "./App.css";
import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import { useTheme } from "./hooks/useTheme";
import { ColorPallet } from "./service/colorPallet";
import { Toaster } from "sonner";
import HeaderBar from "./pages/HexHop/header/HeaderBar";
import ColorList from "./pages/HexHop/colorList/ColorList";
import ColorPicker from "./pages/HexHop/colorPicker/ColorPicker";

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
