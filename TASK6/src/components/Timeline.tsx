import React, { useEffect, useRef } from 'react';
import type { EventData } from '../types'; // Adjust path as needed

import EventMarker from './EventMarker';

interface TimelineProps {
  events: EventData[];
  selectedEvent: EventData | null;
  onSelectEvent: (event: EventData) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, selectedEvent, onSelectEvent }) => {
  const markersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (selectedEvent) {
      const index = events.findIndex(e => e.year === selectedEvent.year);
      markersRef.current[index]?.focus();
    }
  }, [selectedEvent, events]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    let nextIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (index + 1) % events.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (index - 1 + events.length) % events.length;
    } else {
      return;
    }
    e.preventDefault();
    onSelectEvent(events[nextIndex]);
    markersRef.current[nextIndex]?.focus();
  };

  return (
    <div className="timeline">
      <div className="year-markers" role="list" aria-label="Timeline events">
        {events.map((event, idx) => (
          <div
            key={event.year}
            role="listitem"
            ref={el => {
              markersRef.current[idx] = el;
            }}
            tabIndex={selectedEvent?.year === event.year ? 0 : -1}
            onKeyDown={e => handleKeyDown(e, idx)}
          >
            <EventMarker
              event={event}
              isSelected={selectedEvent?.year === event.year}
              onClick={() => onSelectEvent(event)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
