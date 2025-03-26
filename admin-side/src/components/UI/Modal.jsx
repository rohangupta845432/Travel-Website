import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("popup-root")
  );
};

export default Modal;
