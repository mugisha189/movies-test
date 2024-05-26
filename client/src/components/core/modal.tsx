import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useModal } from "../../hooks/useModal";

const Modal: React.FC = () => {
  const { isOpen, closeModal, modalContent } = useModal();

  if (!isOpen || !modalContent) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className="relative bg-background2  rounded-lg overflow-hidden shadow-lg w-[90%] max-h-[90%]  md:w-[60%] lg:w-[40%] z-50 overflow-y-auto">
        <button
          className="absolute right-2 top-2  rounded-full p-1 bg-background  "
          onClick={closeModal}
        >
          <IoCloseCircle />
        </button>
        <div className="">{modalContent}</div>
      </div>
    </div>
  );
};

export default Modal;
