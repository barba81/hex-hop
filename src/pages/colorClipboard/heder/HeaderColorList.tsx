import HoldToClear from "./HoldToClearButton";

const HeaderColorList = () => {
  return (
    <div className="w-full px-2 p-1 bg-stone-800 flex gap-2 items-center justify-end ">
      <div
        className="
               flex 
               h-5 
               items-center 
               rounded-md 
               outline-2
               w-full 
               focus-within:ring-2 
               focus-within:ring-ring 
               focus-within:border-input "
      >
        <input
          className="
                 h-full 
                 w-full 
                 px-2 
                 outline-none 
                 rounded-md 
                 overflow-hidden
                 bg-stone-100 
                 dark:bg-stone-900  
                 text-sm 
                 placeholder:text-muted-foreground"
          placeholder="Search"
        />
      </div>
      <HoldToClear />
    </div>
  );
};

export default HeaderColorList;
