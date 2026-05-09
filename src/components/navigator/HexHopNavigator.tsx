import ColorListPage from "@/pages/colorClipboard/ColorListPage";
import { PagesTypes, useAppStore } from "@/store/useThemeStore";
import { Clipboard, Eye, Import, Settings, SwatchBook } from "lucide-react";

const navItems = [
    { id: "color-list", icon: <Clipboard /> },
    { id: "palette-generator", icon: <SwatchBook /> },
    { id: "import-export", icon: <Import /> },
    { id: "preview", icon: <Eye /> },
    { id: "settings", icon: <Settings /> },
  ];

const HexHopNavigator = () => {
  const activePage = useAppStore().activePage;
  const setActivePage = useAppStore().setActivePage;
  return (
    <>
      <div className="flex w-full gap-10 bg-stone-800 p-1 justify-center items-center">
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

      {activePage === "color-list" && <ColorListPage />}
      {activePage === "palette-generator" && <ColorListPage />}
      {activePage === "import-export" && <ColorListPage />}
      {activePage === "settings" && <ColorListPage />}
      {activePage === "gradient-creator" && <ColorListPage />}
      {activePage === "color-contrast" && <ColorListPage />}
    </>
  );
};

export default HexHopNavigator;
