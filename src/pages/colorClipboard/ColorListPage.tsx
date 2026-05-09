import ColorPicker from "./colorPicker/ColorPicker";
import ColorList from "./colorList/ColorList";
import HoldToClear from "@/pages/colorClipboard/heder/HoldToClearButton";
import HeaderColorList from "./heder/HeaderColorList";


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