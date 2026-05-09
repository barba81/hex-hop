import ColorListPage from "@/pages/colorList/colorListPage";
import { useState } from "react";

type PagesTypes = 'color-list' | 'gradient-creator' | 'color-contrast' | 'import-export' | 'settings' | 'palette-generator';
const HexHopNavigator = () => {
    const [activePage, setActivePage] = useState<PagesTypes>('color-list');
    
  return (
    <>
      <div>
        {activePage === 'color-list' && <ColorListPage/>}
        {activePage === 'gradient-creator' && <ColorListPage/>}
        {activePage === 'color-contrast' && <ColorListPage/>}
        {activePage === 'import-export' && <ColorListPage/>}
        {activePage === 'settings' && <ColorListPage/>}
        {activePage === 'palette-generator' && <ColorListPage/>}
      </div>
    </>
  );
};

export default HexHopNavigator;
