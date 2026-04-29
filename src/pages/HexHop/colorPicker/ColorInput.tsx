import { useColorStore } from "@/store/useColorStore";
import { useState } from "react";

const ColorInput = () => {
    const setColor = useColorStore().setColor;
    const inputFormat = useColorStore().inputFormat;
    const isColorValid = useColorStore().isColorValid;
   
   return <>
       <div className="flex h-8 items-center overflow-hidden rounded-md border-2 focus-within:ring-2 focus-within:ring-ring focus-within:border-input transition-colors">
        <input
          className="h-full w-full px-2 outline-none bg-stone-200 dark:bg-stone-900  text-sm placeholder:text-muted-foreground"
          placeholder="Enter color"
          value={inputColor}
          onChange={(e) => handleInputColor(e.target.value)}
        />

        <div
          className={`${
            !isColorValid ? "hidden" : "flex"
          } h-full items-center border-l-2 bg-muted/50 px-2 font-mono text-xs font-semibold uppercase text-muted-foreground`}
        >
          {inputFormat}
        </div>
      </div>
    </>
}

export default ColorInput;