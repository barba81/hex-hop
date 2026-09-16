import PreviewColorBox from "./preview-color-box";
import EyeDropButton from "./eye-drop-button";
import ColorInput from "./color-text-input";
import AddColorButton from "./add-color-button";
import AiColorButton from "./ai-color-button";

const FooterColorPicker = () => {
  return (
    <div className="flex  items-center justify-between p-2 gap-2 bg-zinc-100 dark:bg-zinc-900">
      <EyeDropButton />
      <PreviewColorBox />
      <ColorInput />
      <AddColorButton/>
      <AiColorButton/>
    </div>
  );
};

export default FooterColorPicker;
