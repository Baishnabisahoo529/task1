export function renderTimeline(events) {
    const container = document.getElementById('timeline');
    if (!container)
        return;
    container.innerHTML = '';
    let selectedIndex = 0;
    // Create dots row
    const dotsRow = document.createElement('div');
    dotsRow.className = 'timeline-row';
    events.forEach((event, i) => {
        const dot = document.createElement('span');
        dot.className = 'timeline-dot' + (i === selectedIndex ? ' active' : '');
        dot.onclick = () => {
            selectedIndex = i;
            update();
        };
        dotsRow.appendChild(dot);
        // Year label below each dot
        const yearLabel = document.createElement('div');
        yearLabel.className = 'year-label';
        yearLabel.textContent = event.year.toString();
        yearLabel.style.left = `calc(${i * 32}px + 7px)`;
        dotsRow.appendChild(yearLabel);
    });
    // Card area
    const cardArea = document.createElement('div');
    cardArea.className = 'event-card-area';
    container.appendChild(dotsRow);
    container.appendChild(cardArea);
    function update() {
        Array.from(dotsRow.children)
            .forEach((dot, i) => {
            if (dot.classList)
                dot.className = 'timeline-dot' + (i === selectedIndex ? ' active' : '');
        });
        const event = events[selectedIndex];
        if (!event)
            return;
        cardArea.innerHTML = `
      <div class="event-card">
        <div class="event-year">${event.year}</div>
        <div class="event-title">${event.title}</div>
        <img src="${event.imageURL}" alt="${event.title}" class="event-image"/>
        <div class="event-description">${event.description}</div>
        <button class="event-btn">Learn More</button>
      </div>
    `;
    }
    update();
}
//# sourceMappingURL=renderer.js.map