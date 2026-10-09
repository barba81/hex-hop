import AddColorButton from "@/features/create-color-block/creating-color/add-color-button";
import AiColorButton from "@/features/create-color-block/creating-color/ai-color-button";
import ColorInput from "@/features/create-color-block/creating-color/color-text-input";
import EyeDropButton from "@/features/create-color-block/creating-color/eye-drop-button";
import ColorBoxPicker from "@/features/create-color-block/creating-color/preview-color-box";

const FooterColorPicker = () => {
  return (
    <div className="flex  items-center justify-between p-1 gap-1 bg-background dark:background">
      <EyeDropButton />
      <ColorBoxPicker />
      <ColorInput />
      <AddColorButton/>
      <AiColorButton/>
    </div>
  );
};

export default FooterColorPicker;
