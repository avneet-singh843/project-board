import React, { useState } from "react";
import Modal from "../ui/Modal";
import { AddBoardModalProps } from "../../types/AddBoardModalProps";

const AddBoardModal: React.FC<AddBoardModalProps> = ({
  isOpen,
  onClose,
  onCreateBoard,
}) => {
  const [boardName, setBoardName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (boardName.trim()) {
      onCreateBoard(boardName.trim());
      setBoardName("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Board">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700 mb-1">
            Board Name
          </span>
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="e.g. 'To-Do'"
          />
        </label>
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
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBoardModal;
