import React, { createContext, useState } from "react";
import Modal from "../components/core/modal";
import { ModalContextType } from "../utils/types/core";

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, modalContent }}
    >
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};
