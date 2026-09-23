import { create } from "zustand/react";
import { appStateSlice, AppStatusSlice } from "./app-ui-slice";

export const useHexHopStore = create<AppStatusSlice>((...a) => ({
  ...appStateSlice(...a),
}))