import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export interface EventData {
  year: number;
  title: string;
  imageURL: string;
  description: string;
}

interface EventModalProps {
  event: EventData;
  onClose: () => void;
  isDark: boolean;
  triggerRef: React.RefObject<HTMLElement>;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose, isDark, triggerRef }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trapping inside modal
  useEffect(() => {
    const focusableElementsSelector =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    const modalNode = modalRef.current;
    if (!modalNode) return;

    const focusableElements = Array.from(
      modalNode.querySelectorAll<HTMLElement>(focusableElementsSelector)
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'Tab':
          if (focusableElements.length === 0) {
            e.preventDefault();
            break;
          }
          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            // Tab
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    }

    modalNode.addEventListener('keydown', handleKeyDown);

    // Focus first focusable element or modal container itself initially
    if (firstElement) {
      firstElement.focus();
    } else {
      modalNode.focus();
    }

    // Return focus to trigger on unmount
    return () => {
      modalNode.removeEventListener('keydown', handleKeyDown);
      triggerRef?.current?.focus();
    };
  }, [onClose, triggerRef]);

  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className={`modal-content ${isDark ? 'dark' : 'light'}`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={-1} // to make div focusable
      >
        <div id="modal-year">{event.year}</div>
        <h2 id="modal-title" className="modal-title">
          {event.title}
        </h2>
        <img src={event.imageURL} alt={event.title} className="modal-image" />
        <p id="modal-description" className="modal-description">
          {event.description}
        </p>
        <button onClick={onClose} className="modal-btn" aria-label="Close modal">
          Learn More
        </button>
      </div>
    </div>,
    document.body
  );
};

export default EventModal;
