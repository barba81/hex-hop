import { DragDots } from "../drag-dots";

type PaletteBoxParams = {
  name: string;
  className: string;
};

export const PaletteBoxEmpty = ({className  }: PaletteBoxParams) => {

  return (
    <>
      <div
        className={`${className} h-7  ${ "rounded-md"}  w-full shrink-0 relative flex items-center justify-between overflow-hidden `}
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
