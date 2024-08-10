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
          // Save the token or use it as needed
        }
      });
    } else {
      console.log("Token retrieved silently:", token);
      // Use the token as needed
    }
  });
}


// Check whether the user gave permission to access Google Calendar when the extension is opened
chrome.runtime.onStartup.addListener(() => {
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
          // Save the token or use it as needed
        }
      });
    } else {
      console.log("Token retrieved silently:", token);
      // Use the token as needed
    }
  });
}

function sendMessageToPopup(message) {
  chrome.runtime.sendMessage(message);
}

chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
    console.log(token);
    sendMessageToPopup({ token });

    const headers = new Headers({
        'Authorization' : 'Bearer ' + token,
        'Content-Type': 'application/json'
    })
  
    const queryParams = { headers };
  
    fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', queryParams)
    .then((response) => response.json()) // Transform the data into json
    .then(function(data) {
        console.log(data);
        sendMessageToPopup({ events: data.items });
    })
    .catch(error => {
      console.error("Error fetching calendar events:", error);
      sendMessageToPopup({ error: "Error fetching calendar events." });
    });
});