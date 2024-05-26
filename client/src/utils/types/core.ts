export interface IFile {
  name: string;
  result: string;
  type: string;
}

export interface ModalContextType {
  isOpen: boolean;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  modalContent: React.ReactNode | null;
}
