import { useState, useEffect } from "react";
import { platform as getPlatform } from "@tauri-apps/plugin-os";
import MacHeaderButton from "./MacHeaderButton";
import WindowsHeaderButton from "./WindowsHeaderButton";
import ClipboardPalletDecorator from "./ClipboardPalletDecorator";
import HoldToClear from "./HoldToClearButton";
import HoldToButton from "@/components/common/HoldToButton";
import { ColorPallet } from "@/service/colorPallet";
import HexHopNavigator from "../navigator/HexHopNavigator";
import { Clipboard, Eye, Import, Settings, SwatchBook } from "lucide-react";
import { useAppStore } from "@/store/useThemeStore";
import MyCustomIcon from "../icons/MyIcon";

const navItems = [
    { id: "color-list", icon: <Clipboard /> },
    { id: "palette-generator", icon: <SwatchBook /> },
    { id: "import-export", icon: <Import /> },
    { id:  "color-contrast", icon: <Eye /> },
    { id: "settings", icon: <Settings /> },
    { id: "settings", icon: <MyCustomIcon /> },
  ];
const HeaderBar = () => {
  const [platform, setPlatform] = useState<string>("");
  const setActivePage = useAppStore().setActivePage;

  useEffect(() => {
    const currentPlatform = getPlatform();
    setPlatform(currentPlatform);
  }, []);

  return (
    <>

      <div
        data-tauri-drag-region
        className="flex bg-stone-50 dark:bg-black/50 w-full justify-between items-center gap-2 px-2 py-1 select-none"
      >
        {platform === "macos" && <MacHeaderButton />}

        <div className="flex items-center justify-center  ">
         <div className="flex w-full gap-4 p-1 justify-center items-center">
                {navItems.map((element, index) => (
                  <div
                    key={index}
                    onClick={()=>setActivePage(element.id as PagesTypes)}
                    className="cursor-pointer text-stone-400  hover:text-white hover:brightness-150 "
                  >
                    {element.icon}
                  </div>
                ))}
              </div>
        </div>

        {platform !== "macos" && <WindowsHeaderButton />}
      </div>
    </>
  );
};

export default HeaderBar;
