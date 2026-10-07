import PreviewColorBox from "../../../color-block/ui/creating-color/preview-color-box";
import EyeDropButton from "../../../color-block/ui/creating-color/eye-drop-button";
import ColorInput from "../../../color-block/ui/creating-color/color-text-input";
import AddColorButton from "../../../color-block/ui/creating-color/add-color-button";
import AiColorButton from "../../../color-block/ui/creating-color/ai-color-button";

const FooterColorPicker = () => {
  return (
    <div className="flex  items-center justify-between p-1 gap-1 bg-background dark:background">
      <EyeDropButton />
      <PreviewColorBox />
      <ColorInput />
      <AddColorButton/>
      <AiColorButton/>
    </div>
  );
};

export default FooterColorPicker;
