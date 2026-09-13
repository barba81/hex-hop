import CSSLogo from "@/assets/icons/Official_CSS_Logo.svg";
import Blender from "@/assets/icons/Blender_logo_no_text.svg";


export const CSSIcon = ({ size = 24 }: { size?: number }) => {
  return (
    <img src={CSSLogo} alt="CSS" />
  );
}

export const BlenderIcon = ({ size = 24 }: { size?: number }) => {
  return (
    <img src={Blender} alt="CSS" />
  );
}