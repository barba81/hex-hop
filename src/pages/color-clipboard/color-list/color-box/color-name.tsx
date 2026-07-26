import { updateColor } from "@/features/color/update-color";
import { ColorEntity } from "@/features/infrastructure/entity";
import { useState } from "react";

type ColorNameParams = {
  colorEntity: ColorEntity;
};

const ColorName = ({ colorEntity }: ColorNameParams) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [newName, setNewName] = useState(colorEntity.name);
  const handleSave = () => {
    colorEntity.name = newName;
    updateColor(colorEntity);
    setInputVisible(false);
  };

  return (
    <>
      {!inputVisible && (
        <div
          onDoubleClick={() => setInputVisible(true)}
          className="cursor-pointer text-sm font-mono  rounded-full"
        >
          {colorEntity.name}
        </div>
      )}
      {inputVisible && (
        <input
          className="bg-stone-600 rounded-sm w-30 h-6   text-sm font-mono   "
          placeholder={colorEntity.name}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleSave}
        />
      )}
    </>
  );
};

export default ColorName;
