import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableBoardAreaProps {
  boardId: number;
  children: React.ReactNode;
}

const DroppableBoardArea: React.FC<DroppableBoardAreaProps> = ({
  boardId,
  children,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `board-${boardId}`,
  });

  const borderStyles = isOver
    ? "border-2 border-dashed border-blue-500 bg-blue-50"
    : "border border-gray-200 bg-gray-50";

  return (
    <div
      ref={setNodeRef}
      className={`rounded-lg w-72 flex-shrink-0 p-4 shadow-sm h-[500px] ${borderStyles}`}
    >
      {children}
    </div>
  );
};

export default DroppableBoardArea;
