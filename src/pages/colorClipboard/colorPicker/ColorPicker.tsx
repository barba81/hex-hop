import ColorBox from "./ColorBox";
import PipetButton from "./PipetButton";
import ColorInput from "./ColorInput";
import AddColorButton from "./AddColorButton";

const ColorPicker = () => {
  return (
    <div className="flex rounded-2xl items-center justify-between p-2 gap-1 bg-stone-50/50 dark:bg-black/50">
      <ColorBox />
      <PipetButton />
      <ColorInput />
      <AddColorButton/>
    </div>
  );
};

export default ColorPicker;
