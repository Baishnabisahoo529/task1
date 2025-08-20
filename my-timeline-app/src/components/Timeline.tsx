import React from 'react';
import EventMarker from './EventMarker';
// import type { EventData } from '../types';

interface TimelineProps {
  events: EventData[];
  selectedEvent: EventData | null;
  onSelectEvent: (event: EventData) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, selectedEvent, onSelectEvent }) => {
  return (
    <div className="timeline">
      <div className="year-markers">
        {events.map((event) => (
          <EventMarker
            key={event.year}
            event={event}
            isSelected={selectedEvent?.year === event.year}
            onClick={() => onSelectEvent(event)}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;

export interface EventData {
  year: number;
  title: string;
  description?: string;
}
