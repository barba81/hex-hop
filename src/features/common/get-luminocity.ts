//   const getFontColor = (isDark: boolean, color: ColorData) => {
//     const { r, g, b } = color;
//     const a = color.a ?? 1;
//     const bgLuma = isDark ? 30 : 255;
//     const colorLuma = 0.299 * r + 0.587 * g + 0.114 * b;
//     const apparentLuma = colorLuma * a + bgLuma * (1 - a);

//     return apparentLuma > 150 ? "text-gray-900" : "text-gray-100";
//   };
