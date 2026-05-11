import ColorPicker from "./colorPicker/ColorPicker";
import ColorList from "./colorList/ColorList";
import HeaderColorList from "./heder/HeaderColorList";

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