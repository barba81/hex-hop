import FooterColorPicker from "./footer-color-picker/footer-color-picker";
import ColorList from "./color-list/color-list";
import HeaderColorList from "./clipboard-header";

const ColorListPage = () => {

  return (
    <>
    <div className="h-full flex flex-col gap-1 overflow-auto">
      <HeaderColorList />
      <ColorList />
      <FooterColorPicker />
    </div>
    </>
  );
};

export default ColorListPage;