import { DragDots } from "../drag-dots";

type PaletteBoxParams = {
  name: string;
};

export const PaletteBoxEmpty = ({ name }: PaletteBoxParams) => {

  return (
    <>
      <div
        className={`h-7  ${ "rounded-md"}  w-full shrink-0 relative flex items-center justify-between overflow-hidden `}
      >
        <div className="absolute inset-0 bg-checkerboard flex"></div>

        <div
          className={` h-full flex items-center justify-start overflow-hidden ${ "rounded-md"} `}
        >
          <DragDots />
        
        </div>
      </div>
    </>
  );
};
