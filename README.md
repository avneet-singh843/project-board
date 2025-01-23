# Project Board with React + dnd-kit

A simple **Project Board** application built with **React**, **dnd-kit**, and **Tailwind CSS** that stores data locally in **browser `localStorage`**, so your changes persist on page reload. This board supports:

- **Drag and drop** of tasks **within** the same board or **across** different boards
- **Adding new boards** and tasks
- **Editing task details**, moving them between boards, or **deleting** tasks
- A **modal-based** UI for creating tasks/boards and editing/deleting task details

---

## Features

1. **Three Default Boards** on first load:

   - **Backlog**
   - **To-Do**
   - **In Progress**

2. **Task Management**

   - Add a new task (global or in a specific board)
   - View/edit a task’s **title** and **description**
   - **Reassign** a task to a different board directly from the task detail modal or drag n drop
   - **Delete** tasks altogether

3. **Drag-and-Drop**

   - Reorder tasks within the same board
   - Move tasks across boards
   - Visual feedback:
     - Original task dims while dragging
     - A floating **drag overlay** follows the cursor

4. **LocalStorage Persistence**
   - All boards and tasks are saved in `localStorage`, so refreshing the page **preserves** your changes in the same browser

---

## Installation

1. **Clone or Download** the Repository

   ```bash
   git clone https://github.com/avneet-singh843/board-flow.git
   cd board-flow
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   Or if you prefer Yarn:

   ```bash
   yarn
   ```

3. **Run the Development Server**
   ```bash
   npm start
   ```
   This will open the app in your browser at **[http://localhost:5174](http://localhost:5174)** (or another port if 3000 is in use).

---

## Usage

- On first load, you’ll see **Backlog**, **To-Do**, and **In Progress** boards (empty if no default tasks are set).
- **Add a Board**: Click “**+ Add New Board**” at the top to create another board.
- **Add a Task**:
  - **Global**: Click “**+ Add Task (Global)**” to open a modal where you can choose **any** board.
  - **Direct**: Click “**Add Task**” within a specific board to add it there immediately.
- **Drag and Drop**:
  - Click and **drag** a task card to reorder tasks within the board.
  - **Drag** tasks across boards to move them from one board to another.
  - A **floating overlay** shows the dragged task, while the original card dims.
- **View/Edit a Task**:
  - **Click** on a task to open its detail modal. You can then update the **title**, **description**, or **move** it to another board.
  - **Delete** a task from the detail modal with the **Delete** button.

---

## Project Structure

A typical **component structure** might look like:

```
src/
  ├─ assets/                    # Any static assets (images, icons, etc.)
  ├─ components/
  │   ├─ board/                 # All project board–related components
  │   │   ├─ AddBoardModal.tsx
  │   │   ├─ AddTaskModal.tsx
  │   │   ├─ BoardItem.tsx
  │   │   ├─ BoardList.tsx
  │   │   ├─ DroppableBoardArea.tsx
  │   │   ├─ SortableTask.tsx
  │   │   ├─ SortableTaskOverlay.tsx
  │   │   ├─ TaskDetailModal.tsx
  │   │   └─ TaskList.tsx
  │   └─ ui/
  │       └─ Modal.tsx          # A generic, reusable modal component
  │
  ├─ constants/
  │   └─ keys.ts                # Place app-wide string constants or keys here (optional)
  ├─ pages/
  │   └─ BoardContainer.tsx     # The main container (page) for the project board logic
  ├─ types/
  │   ├─ AddBoardModalProps.ts
  │   ├─ AddTaskModalProps.ts
  │   ├─ Board.ts
  │   ├─ ModalProps.ts
  │   ├─ Task.ts
  │   └─ TaskDetailModalProps.tsx
  │
  ├─ App.css
  ├─ App.tsx
  └─ index.css

```

Key highlights:

- **BoardContainer.tsx** handles:
  - Reading/writing `localStorage`
  - Default board setup
  - Modals for board/task creation
  - Task detail modal
  - **dnd-kit**’s **DndContext**, with `handleDragStart` and `handleDragEnd`

---

## Dependencies

- **React**
- **@dnd-kit/core** and **@dnd-kit/sortable** (for drag-and-drop)
- **Tailwind CSS** (for styling modals, buttons, layout)
- (Optional) **TypeScript** for strong typing (interfaces like `Board` and `Task`)

---

## Contributing

Feel free to **fork** this repo and submit pull requests if you want to improve the UI, add new features, or refactor code. Any contribution is welcome!

---

## License

[MIT](LICENSE) – You can freely modify and distribute this project.

---

**Enjoy your local Project Board!** If you have any questions or encounter issues, please open a GitHub issue or contact at singhavneet317@gmail.com

```

```
