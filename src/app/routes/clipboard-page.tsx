
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