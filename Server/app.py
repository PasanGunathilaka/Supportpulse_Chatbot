from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Azure OpenAI config
openai.api_type = "azure"
openai.api_base = "https://firstprojct-resource.cognitiveservices.azure.com/"
openai.api_version = "2025-01-01-preview"
openai.api_key = "CLCajVeVhr7WKiOB1AsPnz2SL9zq7zOkZkXWicfVq6Np4UygsyXKJQQJ99BEACHYHv6XJ3w3AAAAACOGR80k"

DEPLOYMENT_NAME = "gpt-4.1"

@app.route('/api/v1/sentiment', methods=['POST'])
def classify():
    data = request.get_json()
    ticket_text = data.get("message", "")

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
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
