import React, { useEffect, useState } from "react";
import { ModalProps } from "../../types/ModalProps";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const [show, setShow] = useState(isOpen);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10); // Trigger animation after mounting
    } else {
      setAnimate(false);
      setTimeout(() => setShow(false), 300); // Delay unmount for smooth exit animation
    }
  }, [isOpen]);

  return (
    <>
      {show && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
            animate ? "opacity-100" : "opacity-0"
          } duration-300 ease-in-out`}
        >
          <div
            className={`fixed inset-0 bg-gray-900 transition-all ${
              animate ? "opacity-50" : "opacity-0"
            } duration-300 ease-in-out`}
            onClick={onClose}
          />

          {/* Modal Container with smooth scale effect */}
          <div
            className={`bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative transform transition-transform duration-300 ease-in-out ${
              animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>

            {title && (
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                {title}
              </h2>
            )}

            {/* Modal Content */}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
