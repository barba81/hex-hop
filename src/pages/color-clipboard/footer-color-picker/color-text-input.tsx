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
          h-7 
          items-center 
          rounded-md 
          outline-2
          w-57
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
            rounded-md 
            overflow-hidden
            bg-stone-100 
            dark:bg-stone-900  
            text-sm 
            placeholder:text-muted-foreground"
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
          text-muted-foreground`}
      >
        {colorFormat}
      </div>
    </div>
  );
};

export default ColorInput;
