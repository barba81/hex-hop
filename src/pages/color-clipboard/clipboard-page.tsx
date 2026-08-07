import FooterColorPicker from "./footer-color-picker/footer-color-picker";
import ColorList from "./color-list/color-list";
import HeaderColorList from "./header-color-list/header-color-list";

const ColorListPage = () => {

  return (
    <>
        <HeaderColorList/>
        <ColorList />
        <FooterColorPicker />
    </>
  );
};

export default ColorListPage;