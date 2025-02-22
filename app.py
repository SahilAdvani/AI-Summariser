import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai  
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
CORS(app)
api_key_ = os.getenv("GEMINI_API_KEY")
gemini = genai.Client(api_key=api_key_) # Initialize Gemini

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/summarize', methods=['POST'])
def summarize_text():
    try:
        data = request.get_json()
        text = data.get('text')

        if not text:
            return jsonify({'error': 'No text provided'}), 400

        response = gemini.models.generate_content( 
            model="gemini-2.0-flash",  
            contents=f'''Extract the main news from the following webpage text. Ignore navigation bars, sidebars, advertisements, and irrelevant details. Provide a **short, concise summary** in 3-4 sentences. Focus on breaking news, match results, and key events. : \n{text}'''
        )
        summary = response.text # Extract the summary

        return jsonify({'summary': summary}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()