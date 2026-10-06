import ColorList from "./color-block/color-list";
import FooterColorPicker from "./footer-clipboard/footer-color-picker";
import HeaderColorList from "./header-clipboard/clipboard-header";

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