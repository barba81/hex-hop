import SearchBar from "./search-bar";
import FilterPalette from "./filter-palette";
import FilterGradient from "./filter-gradient";
import ClearAllButton from "./clear-all-button";

const HeaderColorList = () => {
  return (
    <div className="w-full px-2 p-2 bg-stone-800 flex gap-2 items-center justify-end ">
      <FilterGradient selected={true} />
      <FilterPalette />
      
      <SearchBar />
      <ClearAllButton/>
    </div>
  );
};

export default HeaderColorList;
