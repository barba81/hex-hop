const InputBar = () => {
  return (
    <div
        className="
              flex 
              h-7 
              items-center 
              rounded-md 
              outline-2
              w-57
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
          placeholder="Enter color"
        />
      </div>
  );
};

export default InputBar;
