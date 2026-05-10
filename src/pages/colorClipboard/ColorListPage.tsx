import ColorPicker from "./colorPicker/ColorPicker";
import ColorList from "./colorList/ColorList";


const ColorListPage = () => {
  return (
    <>
        {/* <HeaderColorList/> */}
        <ColorList />
        <ColorPicker />
    </>
  );
};

export default ColorListPage;