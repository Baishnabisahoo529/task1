import React from 'react';

interface EventMarkerProps {
  event: EventData;
  isSelected: boolean;
  onClick: () => void;
}

const EventMarker: React.FC<EventMarkerProps> = ({ event, isSelected, onClick }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={`event-marker ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      title={`${event.year}`}
      aria-current={isSelected ? 'true' : undefined}
      aria-label={`${event.year}${event.title ? `: ${event.title}` : ''}`}
    >
      <div className="dot" aria-hidden="true" />
      <div className="year">{event.year}</div>
    </div>
  );
};

export default EventMarker;

export interface EventData {
  year: number;
  // add event properties as needed like title, description, etc.
  title?: string;
}
