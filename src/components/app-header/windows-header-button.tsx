import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minus, X } from "lucide-react";
import { Button } from "../ui/button";

const WindowsHeaderButton = () => {
  return (
    <div className="flex gap-1 items-center justify-center ">
        <Button
          variant='ghost'
          size='icon-sm'
          className="hover:bg-gray-400 dark:hover:bg-gray-800/50"
          onClick={() => {
            getCurrentWindow().minimize();
          }}
        >
           <span className="sr-only">Minimize app</span>
          <Minus />
        </Button>
        <Button
           variant='ghost'
          size='icon-sm'
          className="hover:bg-red-700 dark:hover:bg-red-400/50"
          onClick={() => {
            getCurrentWindow().close();
          }}
        >
           <span className="sr-only">Close app</span>
          <X size={18}/>
        </Button>
      </div>
  );
};

export default WindowsHeaderButton;
