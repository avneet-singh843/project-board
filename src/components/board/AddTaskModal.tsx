import React, { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { AddTaskModalProps } from "../../types/AddTaskModalProps";

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  boards,
  defaultBoardId,
  onCreateTask,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBoardId, setSelectedBoardId] = useState<number | undefined>(
    defaultBoardId
  );

  // If defaultBoardId changes while the modal is open, reset the selection
  useEffect(() => {
    setSelectedBoardId(defaultBoardId);
  }, [defaultBoardId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBoardId) return;

    if (title.trim()) {
      onCreateTask(selectedBoardId, title.trim(), description.trim());
      setTitle("");
      setDescription("");
      setSelectedBoardId(undefined);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* Task Title */}
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700 mb-1">Title</span>
          <input
            type="text"
            className="border rounded p-2"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        {/* Description */}
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700 mb-1">
            Description
          </span>
          <textarea
            className="border rounded p-2"
            placeholder="Task Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        {/* Board Selector */}
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700 mb-1">
            Select Board
          </span>
          <select
            className="border rounded p-2"
            value={selectedBoardId ?? ""}
            onChange={(e) => setSelectedBoardId(Number(e.target.value))}
          >
            <option value="" disabled>
              -- Choose Board --
            </option>
            {boards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.name}
              </option>
            ))}
          </select>
        </label>

        {/* Buttons */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
