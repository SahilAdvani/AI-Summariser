document.getElementById('summarizeButton').addEventListener('click', () => {
  // Query the currently active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      document.getElementById('summary').innerText = 'No active tab found.';
      return;
    }

    const activeTab = tabs[0]; // Get the first active tab

    // Inject a script into the active tab to extract page text
    chrome.scripting.executeScript(
      {
        target: { tabId: activeTab.id },
        func: () => {
          return document.body.innerText; // Extract text from the page
        },
      },
      (results) => {
        if (results && results[0].result) {
          const text = results[0].result;

          // Send the extracted text to the Flask backend
          fetch('http://127.0.0.1:5000/summarize', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.summary) {
                document.getElementById('summary').innerHTML = `<h3>Summary</h3><p>${data.summary}</p>`;;
              } else {
                document.getElementById('summary').innerText =
                  'Error: ' + data.error;
              }
            })
            .catch((error) => {
              document.getElementById('summary').innerText =
                'Error: ' + error.message;
            });
        } else {
          document.getElementById('summary').innerText =
            'Error: Unable to extract text.';
        }
      }
    );
  });
});
