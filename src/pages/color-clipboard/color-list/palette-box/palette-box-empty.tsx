import { DragDots } from "../../../../components/common/drag-dots";

type PaletteBoxParams = {
  name: string;
  className: string;
};

export const PaletteBoxEmpty = ({className  }: PaletteBoxParams) => {

  return (
    <div
        className={`h-10 bg-amber-100   shrink-0 `}
      >
      </div>
  );
};
