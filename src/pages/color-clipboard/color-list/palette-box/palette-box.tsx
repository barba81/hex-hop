import { DragDots } from "@/components/common/drag-dots";

type PaletteBoxParams = {
};

export const PaletteBox = ({ }: PaletteBoxParams) => {
  return (
    <div
      className={`h-14 rounded-md w-full shrink-0 relative flex items-center justify-between   outline-1 overflow-hidden `}
    >
      <div className="absolute inset-0 bg-checkerboard  rounded-md overflow-hidden">
        <div
          className="w-full h-full"
          style={{
          }}
        />
      </div>

      <DragDots />

      <div className=" w-full h-full  relative ">

      </div>
    </div>
  );
};
