import PreviewColorBox from "./preview-color-box";
import EyeDropButton from "./eye-drop-button";
import ColorInput from "./color-text-input";
import AddColorButton from "./add-color-button";
import { AddNewPalette } from "./add-new-palette";

const FooterColorPicker = () => {
  return (
    <div className="flex  items-center justify-between p-2 gap-2 bg-stone-50/50 dark:bg-stone-800">
      <AddNewPalette/>
      <EyeDropButton />
      <PreviewColorBox />
      <ColorInput />
      <AddColorButton/>
    </div>
  );
};

export default FooterColorPicker;
