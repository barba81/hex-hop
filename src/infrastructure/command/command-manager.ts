export interface Command {
  execute(): void;
  undo(): void;
}

export class CommandManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  constructor(private maxHistory = 50) {}

  execute(command: Command): void {
    command.execute();
    this.undoStack.push(command);
    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift(); 
    }
    this.redoStack = []; 
  }

  undo(): void {
    const command = this.undoStack.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }

  redo(): void {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.undoStack.push(command);
    }
  }

  get canUndo(): boolean { return this.undoStack.length > 0; }
  get canRedo(): boolean { return this.redoStack.length > 0; }
}

export const colorListCommands = new CommandManager();
export const imageEditorCommands = new CommandManager();