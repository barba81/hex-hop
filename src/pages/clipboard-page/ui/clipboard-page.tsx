import ColorList from "./color-list/color-list";
import HeaderColorList from "./clipboard-header";
import FooterColorPicker from "./footer-color-picker/footer-color-picker";

const ColorListPage = () => {

  return (
    <div className="h-full flex flex-col  overflow-auto">
      <HeaderColorList />
      <ColorList />
      <FooterColorPicker />
    </div>
  );
};

export default ColorListPage;