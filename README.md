# GCAL Event Copier Extension
![Gcal_demo_final](https://github.com/user-attachments/assets/b041e84f-5723-44b1-a885-6e5026946b2e)



## Overview
**GCAL Event Copier Extension** is a Google Chrome extension that allows you to easily fetch and copy your Google Calendar events for pasting into your to-do lists or task management apps. This extension simplifies the process of transferring event information such as titles and times from your Google Calendar to your preferred to-do list or productivity tool.

With just a click, you can copy the details of your scheduled events directly to your clipboard, ready to be pasted into any other app. Perfect for users who manage their tasks across different tools but want to centralize their workflow by copying calendar events into to-do apps.

## Features
- **Fetch Today's Events:** Display and copy all Google Calendar events scheduled for today.
- **Fetch Recent Events:** Get newly added events within the last hour.
- **Copy Events:** Quickly copy the title and time of any event with a single click, making it easy to transfer to other apps.

## How It Works
1. **Authentication:** The extension automatically uses your Google account credentials to access your Google Calendar events. It handles user authentication using OAuth2.
2. **Event Fetching:** It fetches events either for the current day or the most recent events added in the last hour.
3. **Copy Functionality:** Each event is presented with a "Copy" button, which copies the event title and time to your clipboard for easy transfer to other apps.

## Files Overview
- **background.js:** Handles authentication, fetching calendar events, and managing user sessions.
- **popup.js:** Manages the user interface, displaying events and providing the copy functionality.
- **popup.html:** The extension's user interface, where users can view and interact with their events.
- **styles.css (optional):** Contains styles for the popup interface (currently part of HTML).

## Key Skills Used
- **JavaScript (ES6+):** Core language used for Chrome extension logic.
- **Chrome Extensions API:** Used for background scripts, messaging, and interacting with Chrome.
- **Google Calendar API:** To fetch calendar events via OAuth2.
- **HTML/CSS:** For structuring and styling the popup interface.
- **OAuth2 Authentication:** Handling secure user authentication with Google Calendar.
- **Clipboard API:** For copying event details to the clipboard.

## How to Build Locally
1. Clone this repository:
    ```bash
    git clone https://github.com/ddanakim0304/GCal-event-copier-extension.git
    ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer Mode" at the top-right of the page.
4. Click **"Load unpacked"** and select the folder where you cloned the repo.
5. The extension will appear in your Chrome toolbar. Click the icon to start using it!

## Permissions
- **Google Calendar API:** Required to fetch events from your Google Calendar.
- **Clipboard:** Used for copying event details to your clipboard.

## Contributing
Feel free to submit issues or pull requests if you'd like to contribute to this project. Feedback and improvements are welcome!

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
