import React, { useState } from "react";
import Modal from "../ui/Modal";
import { TaskDetailModalProps } from "../../types/TaskDetailModalProps";

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  isOpen,
  onClose,
  boards,
  boardId,
  task,
  onUpdateTask,
  onDeleteTask,
}) => {
  // We'll allow editing title / description in this modal
  const [tempTitle, setTempTitle] = useState(task.title);
  const [tempDescription, setTempDescription] = useState(
    task.description ?? ""
  );
  const [tempBoardId, setTempBoardId] = useState(boardId);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTask(
      boardId,
      task.id,
      tempBoardId,
      tempTitle.trim(),
      tempDescription.trim()
    );
  };

  const handleDelete = () => {
    onDeleteTask(boardId, task.id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details">
      <form onSubmit={handleSave} className="space-y-4">
        {/* Title */}
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Title</span>
          <input
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            className="mt-1 w-full border rounded p-2"
          />
        </label>

        {/* Description */}
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Description</span>
          <textarea
            className="mt-1 w-full border rounded p-2"
            rows={3}
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
          />
        </label>

        {/* Board Dropdown - to move the task */}
        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Move to Board
          </span>
          <select
            className="mt-1 w-full border rounded p-2"
            value={tempBoardId}
            onChange={(e) => setTempBoardId(Number(e.target.value))}
          >
            {boards.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex justify-between items-center pt-4">
          {/* Delete button */}
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>

          {/* Update button */}
          <div className="space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default TaskDetailModal;
