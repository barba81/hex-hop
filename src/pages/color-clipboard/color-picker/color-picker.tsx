import ColorBox from "./color-box";
import PipetButton from "./pipet-button";
import ColorInput from "./color-input";
import AddColorButton from "./add-color-button";

const ColorPicker = () => {
  return (
    <div className="flex  items-center justify-between p-2 gap-1 bg-stone-50/50 dark:bg-black/50">
      <ColorBox />
      <PipetButton />
      <ColorInput />
      <AddColorButton/>
    </div>
  );
};

export default ColorPicker;
