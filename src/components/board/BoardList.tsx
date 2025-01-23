import React from "react";
import BoardItem from "./BoardItem";
import { Board } from "../../types/Board";

interface BoardListProps {
  boards: Board[];
  onAddTaskRequest: (boardId: number) => void;
  onTaskClick: (boardId: number, taskId: string) => void;
}

const BoardList: React.FC<BoardListProps> = ({
  boards,
  onAddTaskRequest,
  onTaskClick,
}) => {
  return (
    <div className="flex h-full mt-20 w-full space-x-6 overflow-x-auto">
      {boards.map((board) => (
        <BoardItem
          key={board.id}
          board={board}
          onAddTaskRequest={onAddTaskRequest}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  );
};

export default BoardList;
