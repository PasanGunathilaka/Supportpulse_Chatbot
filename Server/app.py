from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/classify', methods=['POST'])
def classify():
    data = request.get_json()
    ticket_text = data.get("message", "")

    # Hardcoded logic: always returns "Neutral"
    return jsonify({
        "sentiment": "Neutral",
        "message": f"Mocked response for: {ticket_text}"
    })

if __name__ == '__main__':
    app.run(debug=True)
