import { AddNewPalette } from "./add-new-palette";
import HoldToClear from "./hold-to-clear-button";

const HeaderColorList = () => {
  return (
    <div className="w-full px-2 p-1 bg-stone-800 flex gap-2 items-center justify-end ">
      <AddNewPalette/>
      <HoldToClear />
    </div>
  );
};

export default HeaderColorList;
