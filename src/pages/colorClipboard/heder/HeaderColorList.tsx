import { Plus } from "lucide-react";
import HoldToClear from "./HoldToClearButton";
import { Button } from "@/components/ui/button";
import { AddNewPalette } from "@/features/AddNewPalette/AddNewPalette";

const HeaderColorList = () => {
  return (
    <div className="w-full px-2 p-1 bg-stone-800 flex gap-2 items-center justify-end ">
      <Button className="p-1 cursor-pointer" variant="outline" size="sm" onClick={() => AddNewPalette()}>
        <Plus />
      </Button>
      <div
        className="
               flex 
               h-5 
               items-center 
               rounded-sm 
               outline-2
               w-full 
               focus-within:ring-2 
               focus-within:ring-ring 
               focus-within:border-input "
      >
        <input
          className="
                 h-full 
                 w-full 
                 px-2 
                 outline-none 
                 rounded-2xl 
                 overflow-hidden
                 bg-stone-100 
                 dark:bg-stone-900  
                 text-sm 
                 placeholder:text-muted-foreground"
          placeholder="Search"
        />
      </div>
      <HoldToClear />
    </div>
  );
};

export default HeaderColorList;
