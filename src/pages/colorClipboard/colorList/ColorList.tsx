import { useColorStore } from "@/store/useColorStore";
import EmptyDisplay from "./EmptyDisplay";
import { PaletteBox } from "./PaletteBox";
import ColorBlock from "../colorBoxes/ColorBlock";

const ColorList = () => {
  const colors = useColorStore().colors;

  return (
    <>
      <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-3 p-2">
        {colors.length === 0 && <EmptyDisplay />}
        <PaletteBox/>
        <PaletteBox/>
        {colors.map((color, ix) => (
          <ColorBlock color={color} key={ix} />
        ))}
      </div>
    </>
  );
};

export default ColorList;
