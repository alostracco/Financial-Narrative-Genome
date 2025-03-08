from flask import Flask, request, jsonify
from flask_cors import CORS
from stock_data import process_ticker  # Import the function

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/ticker', methods=['POST'])
def handle_ticker():
    data = request.json  # Get the JSON data sent from the frontend
    ticker = data.get('ticker')  # Extract the ticker symbol

    # Call the function to process the ticker
    csv_filename = process_ticker(ticker)

    # For now, just print the ticker and send a response
    print(f"Received ticker: {ticker}")
    return jsonify({
        "message": f"Ticker {ticker} received successfully!",
        "csv_filename": csv_filename
    })

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask server