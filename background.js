let eventsData = [];

function ensureUserSignedIn() {
  chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
    if (chrome.runtime.lastError || !token) {
      console.error("Error getting token (non-interactive):", chrome.runtime.lastError);
      chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
        if (chrome.runtime.lastError || !token) {
          console.error("User is not signed in or didn't grant permission.");
        } else {
          console.log("Token obtained (interactive):", token);
          getTodayEvents(token);
        }
      });
    } else {
      console.log("Token obtained (non-interactive):", token);
      getTodayEvents(token);
    }
  });
}

function getTodayEvents(token) {
  const headers = new Headers({
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  });

  const today = new Date();
  const timeMin = new Date(today.setHours(0, 0, 0, 0)).toISOString();
  const timeMax = new Date(today.setHours(23, 59, 59, 999)).toISOString();

  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime`;

  console.log("Fetching today's events from URL:", url);

  fetch(url, { headers })
    .then((response) => response.json())
    .then(function(data) {
      eventsData = data.items || [];
      console.log("Fetched today's events:", eventsData);
    })
    .catch(error => {
      console.error("Error fetching calendar events:", error);
      eventsData = [];
    });
}

function getRecentEvents(token, sendResponse) {
  const headers = new Headers({
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  });

  const now = new Date();
  const timeMin = new Date(now.getTime() - 60 * 60 * 1000).toISOString(); // 1 hour ago
  const timeMax = now.toISOString();

  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?updatedMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime&showDeleted=false`;

  console.log("Fetching recent (non-deleted) events from URL:", url);

  fetch(url, { headers })
    .then((response) => response.json())
    .then(function(data) {
      const events = data.items || [];
      
      // Log the status and check for workingLocationProperties
      events.forEach(event => {
        const hasWorkingLocation = !!event.workingLocationProperties;
        console.log(`Event ID: ${event.id}, Status: ${event.status}, Has Working Location: ${hasWorkingLocation}`);
      });

      // Filter to exclude working location events and only include active events
      const recentActiveEvents = events.filter(event => 
        (event.status === 'confirmed' || event.status === 'tentative') &&
        !event.workingLocationProperties // Exclude events with workingLocationProperties
      );
      
      console.log("Filtered recent events (active and without working location):", recentActiveEvents);
      sendResponse(recentActiveEvents);
    })
    .catch(error => {
      console.error("Error fetching recent calendar events:", error);
      sendResponse([]);
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);
  if (message === 'getEvents') {
    sendResponse(eventsData);
  } else if (message === 'getRecentEvents') {
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
      if (chrome.runtime.lastError || !token) {
        console.error("User is not signed in or didn't grant permission.");
        sendResponse([]);
      } else {
        console.log("Token obtained for fetching recent events:", token);
        getRecentEvents(token, sendResponse);
      }
    });
    return true;
  }
});

chrome.runtime.onStartup.addListener(() => {
  console.log("Chrome extension startup: ensuring user is signed in");
  ensureUserSignedIn();
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Chrome extension installed: ensuring user is signed in");
  ensureUserSignedIn();
});
