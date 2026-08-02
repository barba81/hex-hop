const Dot = () => {
  return <span className="h-0.75 w-0.75 rounded-full bg-current" />;
};
export const DragDots = () => {
  return (
    <div className="relative cursor-pointer h-full w-4 gap-0.5 flex items-center justify-center bg-foreground/20 mr-1 px-1 ">
        <div className="w-2  flex flex-col items-center justify-center gap-1">
          <Dot />
          <Dot />
          <Dot />
        </div>
        <div className=" w-2 flex flex-col items-center justify-center gap-1">
          <Dot />
          <Dot />
          <Dot />
        </div>
      </div>
  );
};
