// Check whether the user gave permission to access Google Calendar when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  ensureUserSignedIn();
});

function ensureUserSignedIn() {
  chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
    if (chrome.runtime.lastError || !token) {
      // If there's an error (user not signed in), we request interactively
      chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
        if (chrome.runtime.lastError || !token) {
          console.error("User is not signed in or didn't grant permission.");
        } else {
          console.log("User signed in and permission granted. Token:", token);
          getTodayEvents(token);
        }
      });
    } else {
      console.log("Token retrieved silently:", token);
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
  const timeMin = new Date(today.setHours(0, 0, 0, 0)).toISOString(); // Start of today
  const timeMax = new Date(today.setHours(23, 59, 59, 999)).toISOString(); // End of today

  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime`;

  fetch(url, { headers })
    .then((response) => response.json())
    .then(function(data) {
      console.log("Today's events:", data.items);
      sendMessageToPopup({ events: data.items });
    })
    .catch(error => {
      console.error("Error fetching calendar events:", error);
      sendMessageToPopup({ error: "Error fetching calendar events." });
    });
}


// Send message to the popup
function sendMessageToPopup(message) {
  chrome.runtime.sendMessage(message);
}

// Trigger ensureUserSignedIn on startup
chrome.runtime.onStartup.addListener(() => {
  ensureUserSignedIn();
});

// Trigger ensureUserSignedIn on installation
chrome.runtime.onInstalled.addListener(() => {
  ensureUserSignedIn();
});