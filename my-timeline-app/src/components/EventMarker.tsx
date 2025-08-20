import React from 'react';

interface EventMarkerProps {
  event: EventData;
  isSelected: boolean;
  onClick: () => void;
}

const EventMarker: React.FC<EventMarkerProps> = ({ event, isSelected, onClick }) => {
  return (
    <div
      className={`event-marker ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      title={`${event.year}`}
    >
      <div className="dot" />
      <div className="year">{event.year}</div>
    </div>
  );
};

export default EventMarker;

export interface EventData {
  year: number;
  // add event properties as needed like  title, description, etc.
  title?: string;
}
