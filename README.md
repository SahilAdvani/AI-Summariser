# 🔍 AI Summarizer Chrome Extension

AI Summarizer is a Chrome extension that extracts and summarizes webpage content using Google's Gemini API. This tool helps users get concise summaries of articles, news, and other web content instantly.

## 🚀 Features
- Extracts text from any webpage
- Summarizes content using the Gemini API
- Displays the summary within the extension popup
- Simple and easy-to-use interface

## 📂 Project Structure
```
AI-Summarizer/
|-- Screenshots
│-- manifest.json
│-- popup.html
│-- popup.js
│-- background.js
│-- styles.css
│-- app.py (Flask backend)
│-- requirements.txt
│-- README.md
```

## 🛠️ Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/AI-Summarizer.git
   ```
2. Install dependencies for the Flask backend:
   ```sh
   pip install -r requirements.txt
   ```
3. Run the Flask backend:
   ```sh
   python app.py
   ```
4. Load the Chrome extension:
   - Open `chrome://extensions/`
   - Enable Developer Mode
   - Click "Load Unpacked" and select the project folder

## 📝 Usage
1. Open any webpage you want to summarize.
2. Click the AI Summarizer extension icon.
3. Click "Summarize" to generate a concise summary.
4. View the summary within the extension popup.

## 🛡️ API Key Security
Each user must generate their own API key to use the Gemini API. To do this:
1. Visit **Google AI Studio** or **Google Cloud Console**.
2. Create a new API key.
3. Store your API key in a `.env` file:
   ```sh
   GEMINI_API_KEY=your_api_key_here
   ```
4. Ensure the key is loaded in `app.py` using `dotenv`:
   ```python
   from dotenv import load_dotenv
   load_dotenv()
   api_key = os.getenv("GEMINI_API_KEY")
   ```

## 🤝 Contributing
Feel free to contribute! Fork the repo, create a new branch, and submit a pull request.


---
✨ **Happy Summarizing!** ✨
