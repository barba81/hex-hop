import { ColorPallet } from "@/service/colorPallet";
import { useColorStore } from "@/store/useColorStore";

const ColorInput = () => {
  const setColor = useColorStore().setInputColor;
  const inputFormat = useColorStore().inputFormat;
  const isColorValid = useColorStore().isColorValid;
  const inputColor = useColorStore().inputColor;

  return (
    <>
      <div className="flex h-8 shrink-0 items-center overflow-hidden rounded-md border-2 focus-within:ring-2 focus-within:ring-ring focus-within:border-input ">
        <input
          className="h-full w-full px-2 outline-none bg-stone-200 dark:bg-stone-900  text-sm placeholder:text-muted-foreground"
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
          } h-full items-center border-l-2 bg-muted/50 px-2 font-mono text-xs font-semibold uppercase text-muted-foreground`}
        >
          {inputFormat}
        </div>
      </div>
    </>
  );
};

export default ColorInput;
