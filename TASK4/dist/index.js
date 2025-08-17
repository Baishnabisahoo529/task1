import { renderTimeline } from './renderer';
fetch('./events.json')
    .then(res => res.json())
    .then((events) => {
    console.log('Events loaded:', events); // See if data loads
    renderTimeline(events);
})
    .catch(err => {
    console.error('Failed to load events.json:', err);
});
//# sourceMappingURL=index.js.map