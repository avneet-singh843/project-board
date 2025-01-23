import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../../types/Task";

interface SortableTaskProps {
  task: Task;
  boardId: number;
  onClick?: () => void;
}

const SortableTask: React.FC<SortableTaskProps> = ({ task, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1, // Dim while dragging
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      // We keep the listeners for drag.
      // OnClick is separate so user can open the modal
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="bg-white border rounded p-3 mb-3 shadow hover:bg-gray-50 transition"
    >
      <h4 className="font-semibold">{task.title}</h4>
      {task.description && (
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      )}
    </div>
  );
};

export default SortableTask;
