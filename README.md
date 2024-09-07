# GCAL Event Copier Extension
![Convert to GIF project Sep 07](https://github.com/user-attachments/assets/168d60fb-4285-47ac-b847-e8bb86b51807)

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
   
## Installation
1. Download the extension from the Chrome Web Store (link to be added).
2. Once installed, click the extension icon in the Chrome toolbar.
3. Sign in with your Google account to grant access to your Google Calendar.
4. Start fetching events and copy them to your clipboard!

## Usage
- After installing, open the extension and allow access to your Google Calendar.
- **To fetch today's events:** Click the extension icon, and it will display a list of today's events.
- **To fetch recent events:** Click the “Fetch Recent Events” button to get events added within the past hour.
- Use the **Copy** button next to any event to quickly copy it to your clipboard.

## Demo
![Demo GIF](demo.gif) _(Add your GIF demonstrating the extension)_

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
