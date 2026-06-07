import ColorBox from "./color-box";
import PipetButton from "./pipet-button";
import ColorInput from "./color-input";
import AddColorButton from "./add-color-button";
import { AddNewPalette } from "./add-new-palette";

const ColorPicker = () => {
  return (
    <div className="flex  items-center justify-between p-2 gap-2 bg-stone-50/50 dark:bg-black/50">
      <AddNewPalette/>
      <PipetButton />
      <ColorBox />
      <ColorInput />
      <AddColorButton/>
    </div>
  );
};

export default ColorPicker;
