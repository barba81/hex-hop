;
import { useClipboardStore } from "@/store/use-clipboard-store";
import { setColorValidityAndMode } from "../features/set-color-validity-and-mode";

const ColorInput = () => {
  const setInputColor = useClipboardStore((state) => state.setInputColor);
  const colorFormat = useClipboardStore((state) => state.colorFormat);
  const isColorValid = useClipboardStore((state) => state.isColorValid);
  const inputColor = useClipboardStore((state) => state.inputColor);

  const handleOnChange = (color: string) => {
    setInputColor(color);
    setColorValidityAndMode(color);
  };

  return (
    <div
      className="
          flex 
          h-6 
          items-center 
          rounded-md 
          flex-1
          outline-1
          w-full
          focus-within:ring-2 
          focus-within:ring-ring 
          focus-within:border-input overflow-hidden"
    >
      <input
        className="
            h-full 
            w-full 
            px-2 
            outline-none 
            overflow-hidden
            text-sm 
            placeholder:text-muted-foreground
              /* Appearance & Reset */
        appearance-none 
        
        /* Sizing & Typography */
        font-mono leading-none
        
        /* Colors & Borders */
        bg-muted text-foreground border border-input 
        rounded-l-md
        /* Focus States (Replaces OS focus rings everywhere) */
        focus:border-ring focus:ring-1 focus:ring-ring focus:bg-background
        
        /* Behavior */
        transition-colors select-text truncate
            
            "
        placeholder="Enter color"
        value={inputColor}
        onChange={(e) => {
          handleOnChange(e.target.value);
        }}
      />

      <div
        className={`${!isColorValid ? "hidden" : "flex"
          }
          h-full 
          items-center 
          border-l-2 
          bg-muted/50 
          px-2 
          font-mono 
          text-xs 
          font-semibold 
          uppercase 
          select-none
          overflow-hidden
          text-muted-foreground`}
      >
        {colorFormat}
      </div>
    </div>
  );
};

export default ColorInput;
