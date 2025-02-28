from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the Stock Sentiment Analysis API!"

# analyze sentiment 
# @app.route('/analyze', methods=['POST'])
# def analyze_sentiment():
#     data = request.get_json()  # if getting json data from the frontend
#     text = data.get('text')    # gets the 'text' field from input data

#     if not text:
#         return jsonify({"error": "No text provided"}), 400

#     sentiment = analyze_stock_sentiment(text)  # function from backend to do sentiment analysis

#     return jsonify({"sentiment": sentiment})  # returns json sentiment analysis result back to frontend

# run flask
if __name__ == '__main__':
    app.run(debug=True)
