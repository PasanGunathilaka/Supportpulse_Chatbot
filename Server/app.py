from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# Azure OpenAI configuration
openai.api_type = "azure"
openai.api_base = os.getenv("AZURE_OPENAI_ENDPOINT")
openai.api_version = "2025-01-01-preview"
openai.api_key = os.getenv("AZURE_OPENAI_KEY")
DEPLOYMENT_NAME = os.getenv("AZURE_OPENAI_DEPLOYMENT")

@app.route('/api/v1/sentiment', methods=['POST'])
def classify():
    data = request.get_json()
    ticket_text = data.get("message", "")

    if not ticket_text:
        return jsonify({"error": "No message provided"}), 400

    messages = [
        {"role": "system", "content": "You are a sentiment classifier for support tickets. Classify each as Positive, Neutral, or Negative."},
        {"role": "user", "content": ticket_text}
    ]

    try:
        response = openai.ChatCompletion.create(
            engine=DEPLOYMENT_NAME,
            messages=messages
        )
        result = response['choices'][0]['message']['content'].strip()
        return jsonify({"sentiment": result})

    except Exception as e:
        print("❌ Error:", str(e))  # Log error to console
        return jsonify({"error": f"Error communicating with OpenAI: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
