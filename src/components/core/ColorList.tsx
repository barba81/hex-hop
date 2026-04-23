import { ColorPallet } from "@/service/colorPallet";
import { useColorStore } from "@/store/useColorStore";
import {  Pin, X } from "lucide-react";

const ColorList = () => {
  const colors = useColorStore().colors;

  return (
    <>
      <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-2 bg-stone-900/50">
        {colors.map((color, ix) => {
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
                  ColorPallet.PinFlipColor(color);
                }}
                className="absolute bottom-1 left-1 hover:cursor-pointer
                text-sm
              "
              >
                {color.r}, {color.g}, {color.b}, {color.a}
              </div>
              {/* <div
              onClick={() => {
                ColorPallet.DeleteById(color);
              }}
            >
              <Grab />
            </div> */}

              <div className="flex absolute top-1 left-1 items-center gap-1">
                {/* Tailwind Icon as a Stencil */}
                <div
                  className="w-[20px] h-[20px] bg-black dark:bg-white"
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
                <div
                  className="w-[20px] h-[20px] bg-black dark:bg-white"
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
                <div
                  className="w-[20px] h-[20px] bg-black dark:bg-white"
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
                <div
                  className="w-[20px] h-[20px] bg-black dark:bg-white"
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
                {/* Your Pin Component */}
                <div
                  onClick={() => ColorPallet.PinFlipColor(color)}
                  className="hover:cursor-pointer transition hover:-translate-x-0.5 hover:translate-y-0.5"
                >
                  <Pin className="rotate-30" size={18} />
                </div>
              </div>

              <div
                onClick={() => {
                  ColorPallet.DeleteById(color);
                }}
                className="absolute top-1 right-1 hover:cursor-pointer
      
              "
              >
                <X size={13} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ColorList;
