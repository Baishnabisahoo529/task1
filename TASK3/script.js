fetch('data/events.json')
.then(res => res.json())
.then(events => {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML= '';
  events.forEach(event => {
    
    const eventE1 =document.createElement('div');
    eventE1.classList.add('timeline-event');
    eventE1.innerHTML = `<span class="year">${event.year}</span><div class="event-content"><h2>${event.title}</h2><figure><img src="${event.imageURL}" alt="${event.title}"/></figure><button class="learn-more">Learn More</button></div>`;
     
    eventE1.querySelector('.learn-more').addEventListener('click',() =>{
      openModal(event);
    });
     timeline.appendChild(eventE1);

  });
})

.catch(err => console.error("Error loading events:",err) );
const modal = document.getElementById('modal');
function openModal(event) {
  modal.innerHTML= `<div class="modal-content"><span class="close">&times;</span><h2>${event.title}</h2><img src="${event.imageURL}" alt="${event.title}"/><p><strong>Year:</strong>${event.year}</p><p>${event.description}</p><p><em>Category: ${event.category}</em></p></div>`;
  modal.style.display ='block';
  modal.querySelector ('.close').addEventListener('click', closeModal); 
} 

function closeModal() {
modal.style.display = 'none';
}

window.addEventListener('click', (e) => { 
  if (e.target === modal) {
    closeModal();
  }
});

document.getElementById('theme-toggle').addEventListener('click',() =>{ document.body.classList.toggle('dark')}); 