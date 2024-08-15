document.addEventListener('DOMContentLoaded', function() {
    const tokensDiv = document.getElementById("tokens");
  
    chrome.runtime.sendMessage('getEvents', (events) => {
      if (events.length === 0) {
        const noEventsElement = document.createElement('p');
        noEventsElement.textContent = 'No events found for today.';
        tokensDiv.appendChild(noEventsElement);
      } else {
        events.forEach(event => {
          const eventElement = document.createElement('div');
          eventElement.classList.add('event');
  
          const title = document.createElement('h3');
          title.textContent = event.summary || 'No Title';
  
          const date = document.createElement('p');
          const startDate = new Date(event.start.dateTime || event.start.date);
          date.textContent = `Date: ${startDate.toLocaleString()}`;
  
          const location = document.createElement('p');
          location.textContent = `Location: ${event.location || 'No Location'}`;
  
          eventElement.appendChild(title);
          eventElement.appendChild(date);
          eventElement.appendChild(location);
  
          tokensDiv.appendChild(eventElement);
        });
      }
    });
  });
  