import ColorList from "@/features/clipboard-page/ui/color-block/color-list";
import FooterColorPicker from "@/app/routes/clipboard/footer-color-picker";
import HeaderColorList from "@/features/clipboard-page/ui/header-clipboard/clipboard-header";

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