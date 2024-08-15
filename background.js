let eventsData = [];

function ensureUserSignedIn() {
  chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
    if (chrome.runtime.lastError || !token) {
      chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
        if (chrome.runtime.lastError || !token) {
          console.error("User is not signed in or didn't grant permission.");
        } else {
          getTodayEvents(token);
        }
      });
    } else {
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

  fetch(url, { headers })
    .then((response) => response.json())
    .then(function(data) {
      eventsData = data.items || [];
    })
    .catch(error => {
      console.error("Error fetching calendar events:", error);
      eventsData = [];
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'getEvents') {
    sendResponse(eventsData);
  }
});

chrome.runtime.onStartup.addListener(() => {
  ensureUserSignedIn();
});

chrome.runtime.onInstalled.addListener(() => {
  ensureUserSignedIn();
});
