;
import { useClipboardStore } from "@/pages/color-clipboard/store/clipboard-store";
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
          w-full
          outline-1
          focus-within:ring-2 
          focus-within:ring-ring 
          focus-within:border-input overflow-hidden"
    >
      <input
        className={`
            ${!isColorValid ? "rounded-md" : "rounded-l-md"}
            h-full 
            w-full 
            px-2 
            overflow-hidden
            text-sm 
            placeholder:text-muted-foreground
            /* Appearance & Reset */
            appearance-none o
            
            /* Sizing & Typography */
            font-mono leading-none
            
            /* Colors & Borders */
            bg-muted text-foreground 
            
            /* Focus States (Replaces OS focus rings everywhere) */
            focus:border-ring focus:ring-1 focus:ring-ring focus:bg-background
            
            /* Behavior */
            transition-colors select-text truncate
            `}
        placeholder="Enter color"
        value={inputColor}
        onChange={(e) => {
          handleOnChange(e.target.value);
        }}
      />

      <div
        className={`${isColorValid ? "flex" : "hidden"}
          h-full 
          items-center 
          bg-muted/50 
          px-2 
          text-xs 
          font-semibold 
          uppercase 
          select-none
          border-l
          text-muted-foreground`}
      >
        {colorFormat}
      </div>
    </div>
  );
};

export default ColorInput;
