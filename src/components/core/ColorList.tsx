import { ColorPallet } from "@/service/colorPallet";
import { useColorStore } from "@/store/useColorStore";
import { Grab, Pin } from "lucide-react";

const ColorList = () => {
  const colors = useColorStore().colors;

  return (
    <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-2 bg-stone-900/50">
      {colors.map((color, ix) => {
        return (
          <>
            <div
              key={ix}
              className="h-12 rounded-md w-full shrink-0 relative"
              style={{ background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }}
            >
              <div onClick={() => {
                  ColorPallet.DeleteById(color);
                }}>
                    <Grab/>
              </div>

              {true && (
                <div
                onClick={() => {
                  ColorPallet.PinFlipColor(color);
                }}
                  className="absolute bottom-1 right-1 hover:cursor-pointer
                transition 
                hover:-translate-x-0.5
                hover:translate-y-0.5
              "
                >
                  <Pin className="rotate-30" size={18} />
                </div>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ColorList;
