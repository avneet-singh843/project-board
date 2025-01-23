import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DroppableBoardArea from "./DroppableBoardArea";
import TaskList from "./TaskList";
import { Board } from "../../types/Board";

interface BoardItemProps {
  board: Board;
  onAddTaskRequest: (boardId: number) => void;
  onTaskClick: (boardId: number, taskId: string) => void;
}

const BoardItem: React.FC<BoardItemProps> = ({
  board,
  onAddTaskRequest,
  onTaskClick,
}) => {
  return (
    <SortableContext
      id={`board-${board.id}`}
      items={board.tasks.map((t) => t.id)}
      strategy={verticalListSortingStrategy}
    >
      <DroppableBoardArea boardId={board.id}>
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-bold text-gray-700">{board.name}</h2>
          <button
            onClick={() => onAddTaskRequest(board.id)}
            className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
          >
            Add Task
          </button>
        </div>
        <p className="text-sm my-1 font-semibold text-gray-500">
          ongoing - {board.tasks.length}
        </p>

        <TaskList
          tasks={board.tasks}
          boardId={board.id}
          onTaskClick={onTaskClick}
        />
      </DroppableBoardArea>
    </SortableContext>
  );
};

export default BoardItem;
