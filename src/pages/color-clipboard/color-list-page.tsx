import ColorPicker from "./color-picker/color-picker";
import ColorList from "./color-list/color-list";
import HeaderColorList from "./heder/header-color-list";

const ColorListPage = () => {
  return (
    <>
        <HeaderColorList/>
        <ColorList />
        <ColorPicker />
    </>
  );
};

export default ColorListPage;