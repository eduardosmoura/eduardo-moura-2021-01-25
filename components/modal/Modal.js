import React, { useState, useEffect, useCallback } from 'react';

const Modal = ({ open, size, onClose, children }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [modalSize, setModalSize] = useState(size);
  const closeModal = useCallback(() => {
    onClose && onClose();
    setIsOpen(false);
  }, [onClose]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    setModalSize(size);
  }, [size]);

  return (
    <div
      className={`modal-container fixed top-0 left-0 right-0 bottom-0  flex-1 items-center justify-center ${
        isOpen ? 'active' : ''
      }`}
    >
      <div
        className={`bg-white border border rounded-md relative max-h-full overflow-y-auto modal ${modalSize}`}
      >
        <span
          className="absolute top-4 right-4 cursor-pointer"
          onClick={closeModal}
        >
          &#10006;
        </span>

        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  isOpen: false,
  size: 'sm',
};

export default Modal;
