export interface AddBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBoard: (boardName: string) => void;
}
