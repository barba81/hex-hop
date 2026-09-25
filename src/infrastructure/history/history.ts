import type { HexHopStore, CommandScope} from "@/store/store";
import { useHexHopStore } from "@/store/store";
import type { Command } from "@/store/command-manager-state";

const MAX_HISTORY = 50;

export const selectCanUndo = (state: HexHopStore, scope: CommandScope): boolean => {
  return state.history[scope]?.undoStack.length > 0;
};

export const selectCanRedo = (state: HexHopStore, scope: CommandScope): boolean => {
  return state.history[scope]?.redoStack.length > 0;
};

export const pushCommand = async (scope: CommandScope, command: Command): Promise<void> => {
  useHexHopStore.setState((state) => {
    const scopeHistory = state.history[scope];
    const nextUndo = [...scopeHistory.undoStack, command];

    if (nextUndo.length > MAX_HISTORY) {
      nextUndo.shift();
    }

    return {
      history: {
        ...state.history,
        [scope]: {
          undoStack: nextUndo,
          redoStack: [],
        },
      },
    };
  });
};

export const undoCommand = async (scope: CommandScope): Promise<void> => {
  const state = useHexHopStore.getState();
  const scopeHistory = state.history[scope];

  if (scopeHistory.undoStack.length === 0) return;

  const command = scopeHistory.undoStack[scopeHistory.undoStack.length - 1];
  await command.undo();

  useHexHopStore.setState((state) => {
    const currentScope = state.history[scope];
    const nextUndo = currentScope.undoStack.slice(0, -1);
    const nextRedo = [...currentScope.redoStack, command];

    return {
      history: {
        ...state.history,
        [scope]: {
          undoStack: nextUndo,
          redoStack: nextRedo,
        },
      },
    };
  });
};

export const redoCommand = async (scope: CommandScope): Promise<void> => {
  const state = useHexHopStore.getState();
  const scopeHistory = state.history[scope];

  if (scopeHistory.redoStack.length === 0) return;

  const command = scopeHistory.redoStack[scopeHistory.redoStack.length - 1];
  await command.redo();

  useHexHopStore.setState((state) => {
    const currentScope = state.history[scope];
    const nextRedo = currentScope.redoStack.slice(0, -1);
    const nextUndo = [...currentScope.undoStack, command];

    return {
      history: {
        ...state.history,
        [scope]: {
          undoStack: nextUndo,
          redoStack: nextRedo,
        },
      },
    };
  });
};