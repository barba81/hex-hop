
type PaletteBoxParams = {
  name: string;
  className: string;
};

export const PaletteBoxEmpty = ({}: PaletteBoxParams) => {

  return (
    <div
        className={`h-10 bg-amber-100   shrink-0 `}
      >
      </div>
  );
};
