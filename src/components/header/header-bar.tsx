import { platform as getPlatform } from "@tauri-apps/plugin-os";
import MacHeaderButton from "./mac-header-button";
import WindowsHeaderButton from "./windows-header-button";
import DropDownHeader from "@/components/custom/drop-down-header";


const HeaderBar = () => {
  const platform =  getPlatform();
  
  return (
    <div
        data-tauri-drag-region
        className="flex bg-zinc-100 dark:bg-zinc-900 w-full justify-between items-center gap-2 p-2 select-none "
      >
        
        {platform === "macos" && <MacHeaderButton />}
        <div className=" flex justify-center" >
          <DropDownHeader />
        </div>
        {platform !== "macos" && <WindowsHeaderButton />}
      </div>
  );
};

export default HeaderBar;
