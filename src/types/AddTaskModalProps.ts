import { Board } from "./Board";

export interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  boards: Board[];
  defaultBoardId?: number; // If user triggered from a specific board
  onCreateTask: (boardId: number, title: string, description: string) => void;
}
