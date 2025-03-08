from flask import Flask, request, jsonify
from flask_cors import CORS
from stock_data import process_ticker  # Import the function to process ticker
from emotion_graph import generate_graph  # Import the function to generate the graph
from news_fetcher import fetch_and_save_news  # Import the function to fetch news
from narrative_graph import generate_narrative_graph  # Import the function to generate the narrative graph
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/ticker', methods=['POST'])
def handle_ticker():
    data = request.json  # Get the JSON data sent from the frontend
    ticker = data.get('ticker')  # Extract the ticker symbol

    # Dynamically name the CSV file based on the ticker symbol
    csv_filename = f"{ticker}_graph.csv"
    news_filename = f"{ticker}_news.csv"

    # Check if the CSV file already exists
    if not os.path.exists(csv_filename):
        # If it doesn't exist, process the ticker to create the CSV file
        process_ticker(ticker)

        # Fetch and save news articles
        fetch_and_save_news(ticker)

    # Generate the graph using the CSV file
    graph_json = generate_graph(csv_filename)

    # Check if the ticker is AMZN
    summary = None
    narrative_graph_json = None
    if ticker.upper() == "AMZN":
        # Load the Amazon summary text file
        try:
            with open("AMZN_summary.txt", "r") as file:
                summary = file.read()
        except Exception as e:
            print(f"Error loading Amazon summary: {e}")

        # Generate the narrative graph
        narrative_graph_json = generate_narrative_graph()

    # Return the graph JSON, summary, and narrative graph (if applicable) to the frontend
    return jsonify({
        "message": f"Ticker {ticker} processed successfully!",
        "graph": graph_json,
        "summary": summary,  # Send the summary text if the ticker is AMZN
        "narrative_graph": narrative_graph_json  # Send the narrative graph if the ticker is AMZN
    })

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask server