import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-lg w-full">
        <div className="mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 text-xl font-bold absolute top-2 right-2"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
