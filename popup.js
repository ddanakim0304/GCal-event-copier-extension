chrome.runtime.onMessage.addListener((message) => {
    const tokensDiv = document.getElementById("tokens");

    if (message.token) {
        const tokenElement = document.createElement('p');
        tokenElement.textContent = message.token;
        tokensDiv.appendChild(tokenElement);
    }

    if (message.error) {
        const errorElement = document.createElement('p');
        errorElement.textContent = `Error: ${message.error}`;
        errorElement.style.color = 'red';
        tokensDiv.appendChild(errorElement);
    }});