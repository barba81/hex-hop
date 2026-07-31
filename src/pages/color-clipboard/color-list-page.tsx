import ColorPicker from "./color-picker/color-picker";
import ColorList from "./color-list/color-list";
import HeaderColorList from "./color-llist-heder/header-color-list";
import { useEffect } from "react";

const ColorListPage = () => {

  useEffect(() => {

  }, []);

  return (
    <>
        <HeaderColorList/>
        <ColorList />
        <ColorPicker />
    </>
  );
};

export default ColorListPage;