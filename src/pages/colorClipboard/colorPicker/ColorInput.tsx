import { ColorPallet } from "@/features/Colors/colorPallet";
import { useColorStore } from "@/store/useColorStore";

const ColorInput = () => {
  const setColor = useColorStore().setInputColor;
  const inputFormat = useColorStore().inputFormat;
  const isColorValid = useColorStore().isColorValid;
  const inputColor = useColorStore().inputColor;

  return (
    <>
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
            ColorPallet.ValidateColor(e.target.value);
            setColor(e.target.value);
          }}
        />

        <div
          className={`${
            !isColorValid ? "hidden" : "flex"
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
          {inputFormat}
        </div>
      </div>
    </>
  );
};

export default ColorInput;
