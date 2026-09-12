import CSSLogo from "@/assets/icons/Official_CSS_Logo.svg";


export const CSSIcon = ({ size = 24 }: { size?: number }) => {
  return (
    <img src={CSSLogo} alt="CSS" />
  );
}