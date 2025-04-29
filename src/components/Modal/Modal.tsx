// /Users/symonbaikov/Projects/alco-store/src/components/Modal/Modal.tsx
import React, { useEffect } from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Effect to handle body scroll lock using CSS class
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement; // Get the <html> element

    if (isOpen) {
      // Add class when modal opens
      body.classList.add("modal-open");
      html.classList.add("modal-open"); // Add to html as well
    } else {
      // Remove class when modal closes (handles direct state change)
      body.classList.remove("modal-open");
      html.classList.remove("modal-open");
    }

    // Cleanup function: This runs when the component unmounts
    // Ensures class is removed if modal is open during unmount
    return () => {
      body.classList.remove("modal-open");
      html.classList.remove("modal-open");
    };
  }, [isOpen]); // Only re-run the effect if isOpen changes

  // If the modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  // Render the modal
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
