
type ColorNameParams = {
  name: string;
};

const ColorName = ({ name }: ColorNameParams) => {
  return (
    <>
      <div className="text-sm font-mono absolute bottom-1 right-1  p-0.5 rounded-full">
        {name}
      </div>
    </>
  );
};

export default ColorName;
