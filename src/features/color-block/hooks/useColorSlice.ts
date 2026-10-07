import { IColorBlockInitialState, TColorBlockActions } from "@/features/color-block/store/color-block-slice";
import { useAppStore } from "@/shared/store/app-store";


export const useColorBlockAction = <K extends keyof TColorBlockActions>(
  actionName: K
) => {
  const action = useAppStore((state) => state[actionName]);
  return action;
};

export const useColorBlockState = <K extends keyof IColorBlockInitialState>(
  stateName: K
) => {
  const state = useAppStore((state) => state[stateName]);
  return state;
};
