import type { TimelineEvent } from './types';
import { renderTimeline } from './renderer';

fetch('./events.json')
  .then(res => res.json())
  .then((events: TimelineEvent[]) => {
    console.log('Events loaded:', events); // See if data loads
    renderTimeline(events);
  })
  .catch(err => {
    console.error('Failed to load events.json:', err);
  });
