import PreviewColorBox from "./preview-color-box";
import EyeDropButton from "./eye-drop-button";
import ColorInput from "./color-text-input";
import AddColorButton from "./add-color-button";
import AiColorButton from "./ai-color-button";

const FooterColorPicker = () => {
  return (
    <div className="flex  items-center justify-between p-2 gap-2 bg-stone-50/50 dark:bg-stone-800">
      <EyeDropButton />
      <PreviewColorBox />
      <ColorInput />
      <AddColorButton/>
      <AiColorButton/>
    </div>
  );
};

export default FooterColorPicker;
