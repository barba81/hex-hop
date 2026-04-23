import { ColorPallet } from "@/service/colorPallet";
import { useColorStore } from "@/store/useColorStore";
import { Clipboard, X } from "lucide-react";

const EmptyDisplay = () => {
  return (
    <>
      <div className="h-full w-full flex items-center justify-center flex-col gap-5 opacity-[0.07] dark:opacity-[0.15]">
        <Clipboard size={120} strokeWidth={1} />
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight">Color Clipboard</h2>
          <p className="text-lg mt-2">Press check box to add color</p>
        </div>
      </div>
    </>
  );
};


const ColorList = () => {
  const colors = useColorStore().colors;

  return (
    <>
      <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-2 p-2">
        {colors.length === 0 && <EmptyDisplay />}
        {colors.length > 0 &&
          colors.map((color, ix) => {
            return (
              <div
                key={ix}
                className="h-12 rounded-md w-full shrink-0 relative "
                style={{
                  background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                }}
              >
                <div
                  onClick={() => {
                  }}
                  className="absolute bottom-1 left-1 hover:cursor-pointer
                text-sm
              "
                >
                  {color.r}, {color.g}, {color.b}, {color.a}
                </div>

                <div className="flex absolute top-1 left-1 items-center gap-1">
                  {/* Tailwind Icon as a Stencil */}
                  <div
                    onClick={() =>
                      ColorPallet.CopyToClipboard(color, "Tailwind")
                    }
                    className="w-[20px] h-[20px] bg-black dark:bg-white hover:cursor-pointer"
                    style={{
                      maskImage: 'url("/tailwind-icon.svg")',
                      maskRepeat: "no-repeat",
                      maskSize: "contain",
                      maskPosition: "center",
                      WebkitMaskImage: 'url("/tailwind-icon.svg")', // Required for Safari
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskSize: "contain",
                      WebkitMaskPosition: "center",
                    }}
                  />
                </div>

                <div
                  onClick={() => {
                    ColorPallet.DeleteById(color);
                  }}
                  className="absolute top-1 right-1 hover:cursor-pointer"
                >
                  <X size={15} />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ColorList;
