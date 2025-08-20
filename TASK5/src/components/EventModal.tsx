import React from 'react';
import ReactDOM from 'react-dom';
// import type { EventData } from '../types';

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
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose, isDark }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${isDark ? 'dark' : 'light'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-year">{event.year}</div>
        <h2 className="modal-title">{event.title}</h2>
        <img src={event.imageURL} alt={event.title} className="modal-image" />
        <p className="modal-description">{event.description}</p>
        <button onClick={onClose} className="modal-btn">
          Learn More
        </button>
      </div>
    </div>,
    document.body
  );
};

export default EventModal;
