import React from "react";
import SortableTask from "./SortableTask";
import { Task } from "../../types/Task";

interface TaskListProps {
  tasks: Task[];
  boardId: number;
  onTaskClick: (boardId: number, taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, boardId, onTaskClick }) => {
  return (
    <div
      className="mt-4 overflow-y-auto"
      style={{ height: "calc(100% - 80px)" }}
    >
      {tasks.map((task) => (
        <SortableTask
          key={task.id}
          task={task}
          boardId={boardId}
          onClick={() => onTaskClick(boardId, task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
