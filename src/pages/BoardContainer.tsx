import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import BoardList from "../components/board/BoardList";
import AddBoardModal from "../components/board/AddBoardModal";
import AddTaskModal from "../components/board/AddTaskModal";
import { SortableTaskOverlay } from "../components/board/SortableTaskOverlay";
import TaskDetailModal from "../components/board/TaskDetailModal";
import { LocalStorageKeys } from "../constants/keys";
import { Board } from "../types/Board";

const BoardContainer: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  // --- Modals for creation ---
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedBoardIdForTask, setSelectedBoardIdForTask] = useState<
    number | null
  >(null);

  // --- Modal for task details/editing ---
  const [selectedTaskBoardId, setSelectedTaskBoardId] = useState<number | null>(
    null
  );
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // --- For DragOverlay visual feedback ---
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  // -----------------------
  //   LOAD / SAVE localStorage
  // -----------------------

  useEffect(() => {
    const savedBoards = localStorage.getItem(LocalStorageKeys.board);

    if (savedBoards) {
      // If something is in localStorage
      const parsed = JSON.parse(savedBoards);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // If there's a non-empty array of boards saved, use that
        setBoards(parsed);
      } else {
        // If it's an empty array or invalid, use default boards
        setBoards(getDefaultBoards());
      }
    } else {
      // Nothing in localStorage => set default boards
      setBoards(getDefaultBoards());
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LocalStorageKeys.board, JSON.stringify(boards));
  }, [boards]);

  const getDefaultBoards = (): Board[] => {
    return [
      {
        id: 1,
        name: "Backlog",
        tasks: [],
      },
      {
        id: 2,
        name: "To-Do",
        tasks: [],
      },
      {
        id: 3,
        name: "In Progress",
        tasks: [],
      },
    ];
  };

  // -----------------------
  //  Create Board / Task
  // -----------------------
  const handleCreateBoard = (boardName: string) => {
    const newBoard: Board = {
      id: boards.length + 1,
      name: boardName,
      tasks: [],
    };
    setBoards((prev) => [...prev, newBoard]);
    setIsAddBoardOpen(false);
  };

  const handleCreateTask = (
    boardId: number,
    title: string,
    description: string
  ) => {
    setBoards((prev) =>
      prev.map((b) =>
        b.id === boardId
          ? {
              ...b,
              tasks: [
                ...b.tasks,
                {
                  id: `task-${Date.now()}`,
                  title,
                  description,
                },
              ],
            }
          : b
      )
    );
    setIsAddTaskOpen(false);
  };

  // -----------------------
  //  Update / Delete Task
  // -----------------------
  const handleUpdateTask = (
    originalBoardId: number,
    taskId: string,
    newBoardId: number,
    newTitle: string,
    newDescription: string
  ) => {
    if (originalBoardId !== newBoardId) {
      // Move task to another board
      const sourceIndex = boards.findIndex((b) => b.id === originalBoardId);
      if (sourceIndex < 0) return;

      const destIndex = boards.findIndex((b) => b.id === newBoardId);
      if (destIndex < 0) return;

      const sourceBoard = boards[sourceIndex];
      const destBoard = boards[destIndex];

      const taskToMoveIndex = sourceBoard.tasks.findIndex(
        (t) => t.id === taskId
      );
      if (taskToMoveIndex < 0) return;

      const [taskToMove] = sourceBoard.tasks.splice(taskToMoveIndex, 1);
      taskToMove.title = newTitle;
      taskToMove.description = newDescription;

      destBoard.tasks.push(taskToMove);

      const newBoards = [...boards];
      newBoards[sourceIndex] = { ...sourceBoard };
      newBoards[destIndex] = { ...destBoard };
      setBoards(newBoards);
    } else {
      // Same board => just update in place
      setBoards((prev) =>
        prev.map((b) => {
          if (b.id !== originalBoardId) return b;
          return {
            ...b,
            tasks: b.tasks.map((task) =>
              task.id === taskId
                ? { ...task, title: newTitle, description: newDescription }
                : task
            ),
          };
        })
      );
    }
    closeTaskDetailModal();
  };

  const handleDeleteTask = (boardId: number, taskId: string) => {
    setBoards((prev) =>
      prev.map((b) =>
        b.id === boardId
          ? {
              ...b,
              tasks: b.tasks.filter((t) => t.id !== taskId),
            }
          : b
      )
    );
    closeTaskDetailModal();
  };

  // -----------------------
  //  DnD: Drag & Drop
  // -----------------------
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    // track the task being dragged
    setActiveTaskId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTaskId(null); // clear the drag overlay

    if (!over) return;
    if (active.id === over.id) return;

    // 1) Source board
    const sourceBoardIndex = boards.findIndex((board) =>
      board.tasks.some((t) => t.id === active.id)
    );
    if (sourceBoardIndex < 0) return;

    // 2) Destination board
    let destinationBoardIndex = -1;
    if (typeof over.id === "string" && over.id.startsWith("board-")) {
      const boardId = parseInt(over.id.replace("board-", ""), 10);
      destinationBoardIndex = boards.findIndex((b) => b.id === boardId);
    } else {
      // on top of another task
      destinationBoardIndex = boards.findIndex((board) =>
        board.tasks.some((t) => t.id === over.id)
      );
    }
    if (destinationBoardIndex < 0) return;

    const sourceBoard = boards[sourceBoardIndex];
    const destinationBoard = boards[destinationBoardIndex];

    // 3) Indices
    const oldIndex = sourceBoard.tasks.findIndex((t) => t.id === active.id);
    const newIndex = destinationBoard.tasks.findIndex((t) => t.id === over.id);

    // same board reorder
    if (sourceBoardIndex === destinationBoardIndex) {
      const updatedTasks = arrayMove(sourceBoard.tasks, oldIndex, newIndex);
      const updatedBoard = { ...sourceBoard, tasks: updatedTasks };

      const updatedBoards = [...boards];
      updatedBoards[sourceBoardIndex] = updatedBoard;
      setBoards(updatedBoards);
    } else {
      // cross-board move
      const taskToMove = sourceBoard.tasks[oldIndex];
      // remove from source
      const newSourceTasks = [...sourceBoard.tasks];
      newSourceTasks.splice(oldIndex, 1);
      // insert into destination
      const newDestinationTasks = [...destinationBoard.tasks];
      const insertIndex = newIndex >= 0 ? newIndex : newDestinationTasks.length;
      newDestinationTasks.splice(insertIndex, 0, taskToMove);

      // update boards
      const updatedSourceBoard = { ...sourceBoard, tasks: newSourceTasks };
      const updatedDestinationBoard = {
        ...destinationBoard,
        tasks: newDestinationTasks,
      };

      const updatedBoards = [...boards];
      updatedBoards[sourceBoardIndex] = updatedSourceBoard;
      updatedBoards[destinationBoardIndex] = updatedDestinationBoard;
      setBoards(updatedBoards);
    }
  };
  // -----------------------
  //  TaskDetail Modal
  // -----------------------
  const openTaskDetailModal = (boardId: number, taskId: string) => {
    setSelectedTaskBoardId(boardId);
    setSelectedTaskId(taskId);
  };

  const closeTaskDetailModal = () => {
    setSelectedTaskBoardId(null);
    setSelectedTaskId(null);
  };

  // find the selected task data, if any
  let selectedTask = null;
  if (selectedTaskBoardId && selectedTaskId) {
    const board = boards.find((b) => b.id === selectedTaskBoardId);
    if (board) {
      selectedTask = board.tasks.find((t) => t.id === selectedTaskId) || null;
    }
  }

  // -----------------------
  //  RENDER
  // -----------------------
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
      <div className="top-0 w-full flex flex-row justify-between border-b border-gray-200 p-4 bg-white shdow-md">
        <h1 className="text-3xl font-semibold">Project Board</h1>

        {/* ACTION BUTTONS */}
        <div className="flex space-x-4">
          <button
            onClick={() => setIsAddBoardOpen(true)}
            className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded shadow"
          >
            + Add New Board
          </button>
          <button
            onClick={() => {
              setSelectedBoardIdForTask(null);
              setIsAddTaskOpen(true);
            }}
            className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* 
        Wrapping boards in DndContext so we can handle onDragStart & onDragEnd. 
        Then we add a <DragOverlay> to show a floating preview.
      */}
      <div className="flex-1 w-full f-full p-4">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <BoardList
            boards={boards}
            onAddTaskRequest={(boardId) => {
              setSelectedBoardIdForTask(boardId);
              setIsAddTaskOpen(true);
            }}
            onTaskClick={openTaskDetailModal}
          />

          {/* DragOverlay for visual feedback */}
          <DragOverlay>
            {activeTaskId ? (
              <SortableTaskOverlay taskId={activeTaskId} boards={boards} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Modals */}
      <AddBoardModal
        isOpen={isAddBoardOpen}
        onClose={() => setIsAddBoardOpen(false)}
        onCreateBoard={handleCreateBoard}
      />

      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        boards={boards}
        defaultBoardId={selectedBoardIdForTask ?? undefined}
        onCreateTask={handleCreateTask}
      />

      {/* Task Detail Modal */}
      {selectedTask && selectedTaskId && selectedTaskBoardId && (
        <TaskDetailModal
          isOpen={!!selectedTask}
          onClose={closeTaskDetailModal}
          boards={boards}
          task={selectedTask}
          boardId={selectedTaskBoardId}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default BoardContainer;
