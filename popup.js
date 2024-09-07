document.addEventListener('DOMContentLoaded', function() {
  const tokensDiv = document.getElementById("tokens");
  const fetchRecentEventsButton = document.getElementById("fetchRecentEvents");

  // Display the existing events when the popup loads
  chrome.runtime.sendMessage('getEvents', (events) => {
      displayEvents(events, tokensDiv);
  });

  // Add an event listener for the "Fetch Recent Events" button
fetchRecentEventsButton.addEventListener('click', function() {
    // Check if the recent events section already exists, if so, remove it
    const existingRecentEventsDiv = document.querySelector('.recent-events');
    if (existingRecentEventsDiv) {
        existingRecentEventsDiv.remove(); // or clear the content
    }

    // Fetch recent events
    chrome.runtime.sendMessage('getRecentEvents', (events) => {
        // Create a new section for the newly added events
        const recentEventsDiv = document.createElement('div');
        recentEventsDiv.classList.add('recent-events');

        // Add a title to the new section
        const recentTitle = document.createElement('h2');
        recentTitle.textContent = 'Newly Added Events Within 1 hour';
        recentEventsDiv.appendChild(recentTitle);

        // Display the newly added events in the new section
        displayEvents(events, recentEventsDiv);

        // Add the new section below the existing events
        tokensDiv.appendChild(recentEventsDiv);
    });
});

// Function to display events in the specified container
function displayEvents(events, container) {
    if (events.length === 0) {
        const noEventsElement = document.createElement('p');
        noEventsElement.textContent = 'No events found.';
        container.appendChild(noEventsElement);
    } else {
        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('event');

            // Create the title element
            const title = document.createElement('h3');

            // Extract time from event start date
            const startDate = new Date(event.start.dateTime || event.start.date);
            const timeString = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

            // Set title text to include event summary and time
            title.textContent = `${event.summary || 'No Title'} ${timeString}`;

            const date = document.createElement('p');
            date.textContent = `Date: ${startDate.toLocaleString()}`;

            // Create the copy button
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copy';
            copyButton.classList.add('copy-button');

            // Add an event listener to copy the title to the clipboard
            copyButton.addEventListener('click', function() {
                navigator.clipboard.writeText(title.textContent)
            });

            eventElement.appendChild(title);
            eventElement.appendChild(date);
            eventElement.appendChild(copyButton);

            container.appendChild(eventElement);
        });
    }
}
}
);
