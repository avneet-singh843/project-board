import { Board } from "./Board";
import { Task } from "./Task";

export interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  boards: Board[];
  boardId: number; // The board the task currently belongs to
  task: Task; // The selected task
  onUpdateTask: (
    originalBoardId: number,
    taskId: string,
    newBoardId: number,
    newTitle: string,
    newDescription: string
  ) => void;
  onDeleteTask: (boardId: number, taskId: string) => void;
}
