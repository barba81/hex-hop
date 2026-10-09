import FooterColorPicker from "@/app/routes/clipboard-page/footer-color-picker";
import ColorList from "@/features/block-list/ui/block-list";
import HeaderColorList from "@/features/block-list/search-block-list/clipboard-header";

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