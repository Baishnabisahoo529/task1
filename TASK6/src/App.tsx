import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import EventModal from './components/EventModal';
import type { EventData } from '../types';

import './App.css';


const App: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  // Ref to the element that triggered the modal (for returning focus)
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const data: EventData[] = [
      {
        year: 1977,
        title: 'Introduction of the First Personal Computer',
        description:
          'The first personal computer, introduced in 1977, revolutionized the way people interacted with technology. These early systems were more affordable and paving the way for the digital age and transforming various industries.',
        imageURL:
          'https://www.zdnet.com/a/img/resize/a8dc3d972aa80f7054cd1fa9137a79f64eb5f4cb/2014/09/05/3177816a-34e6-11e4-9e6a-00505685119a/my-first-personal-computer-the-apple-ii.jpg?auto=webp&fit=crop&height=1200&width=1200',
        category: 'Technology',
      },
      {
        year: 1981,
        title: 'Launch of IBM PC',
        description:
          'IBM launched their first personal computer, shaping the modern computing industry.',
        imageURL:
          'https://static.ffx.io/images/$zoom_0.334%2C$multiply_0.7725%2C$ratio_1.5%2C$width_756%2C$x_20%2C$y_207/t_crop_custom/q_86%2Cf_auto/1441b183162a906e5f9a7fd505ce3d760183a857',
        category: 'Technology',
      },
      {
        year: 1991,
        title: 'Launch of the World Wide Web',
        description: 'The World Wide Web was launched to the public, making the Internet accessible globally.',
        imageURL: 'https://cds.cern.ch/images/CERN-GE-9407011-31/file?size=large',
        category: 'Internet',
      },
      {
        year: 2007,
        title: 'Introduction of the iPhone',
        description: 'Apple introduced the iPhone, revolutionizing mobile technology.',
        imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgFvP-k4i2t-cpPjdj1PretSNShzwnMiNtVg&s',
        category: 'Mobile',
      },
      {
        year: 2010,
        title: 'Launch of Instagram',
        description: 'Instagram was launched, changing social media and photo sharing.',
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
        category: 'Social',
      },
      {
        year: 2015,
        title: 'Rise of AI',
        description: 'Artificial Intelligence technologies started booming across industries.',
        imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToQFiYOgyUO1xx2z7umpczwvmIa5nIQLmQbw&s',
        category: 'Technology',
      },
    ];
    setEvents(data);
    setSelectedEvent(data[0]);
  }, []);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const openModal = (event: EventData, triggerElement: HTMLElement | null) => {
    setSelectedEvent(event);
    triggerRef.current = triggerElement;
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Focus will be returned by EventModal's useEffect cleanup
  };

  return (
    <div className={`app-container ${isDark ? 'dark' : 'light'}`}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      <Timeline
        events={events}
        selectedEvent={selectedEvent}
        onSelectEvent={(event) => setSelectedEvent(event)}
      />

      {/* Show a "Learn More" button to open modal */}
      {selectedEvent && (
        <div className="event-detail-card" aria-live="polite" aria-atomic="true">
          <div className="event-year">{selectedEvent.year}</div>
          <div className="event-title">{selectedEvent.title}</div>
          <img src={selectedEvent.imageURL} alt={selectedEvent.title} className="event-image" />
          <p className="event-description">{selectedEvent.description}</p>
          <button
            className="learn-more-btn"
            onClick={(e) => openModal(selectedEvent, e.currentTarget)}
            aria-haspopup="dialog"
            aria-expanded={isModalOpen}
            aria-controls="event-modal"
          >
            Learn More
          </button>
        </div>
      )}

      {isModalOpen && selectedEvent && (
        <EventModal
          event={selectedEvent as EventData}
          onClose={closeModal}
          isDark={isDark}
          triggerRef={triggerRef}
        />
      )}
    </div>
  );
};

export default App;
