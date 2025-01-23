import React from "react";
import { Board } from "../../pages/BoardContainer";

/**
 * A minimal overlay component that duplicates the style
 * of a SortableTask while dragging.
 */
interface SortableTaskOverlayProps {
  taskId: string;
  boards: Board[];
}

export const SortableTaskOverlay: React.FC<SortableTaskOverlayProps> = ({
  taskId,
  boards,
}) => {
  // find the task data
  let taskData = null;
  for (const board of boards) {
    const found = board.tasks.find((t) => t.id === taskId);
    if (found) {
      taskData = found;
      break;
    }
  }

  if (!taskData) {
    return null; // If somehow not found, render nothing
  }

  return (
    <div
      className="bg-white border rounded p-3 shadow-lg"
      style={{
        // Possibly bigger or tinted to stand out
        width: 200,
        opacity: 0.9,
      }}
    >
      <h4 className="font-semibold">{taskData.title}</h4>
      {taskData.description && (
        <p className="text-sm text-gray-600 mt-1">{taskData.description}</p>
      )}
    </div>
  );
};
