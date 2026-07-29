export type ColorData =  {
    r: number;
    g: number;
    b: number;
    a?: number;
}

declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}