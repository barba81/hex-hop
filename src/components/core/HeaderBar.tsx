import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minus, X } from "lucide-react";


const HeaderBar = () => {
  return (
    <>
    <div data-tauri-drag-region className="fixed left-1/2 -translate-x-1/2 h-5 w-40 bg-stone-600 dark:bg-stone-100 rounded-b-2xl cursor-pointer " />
      <div data-tauri-drag-region  className="flex border-b-2 bg-black/20 w-full justify-end gap-2 p-1">
        <div
          className="text-gray-900 dark:text-white cursor-pointer hover:bg-gray-400/50 dark:hover:bg-gray-800/50 p-1 rounded-md"
          onClick={() => {
            getCurrentWindow().minimize();
          }}
        >
          <Minus />
        </div>
        <div
          className="text-gray-900 dark:text-white cursor-pointer  hover:bg-red-400/50 p-1 rounded-md"
          onClick={() => {
            getCurrentWindow().close();
          }}
        >
          <X />
        </div>
      </div>
    </>
  );
};

export default HeaderBar;