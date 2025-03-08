# stock_data.py
import yfinance as yf
import pandas as pd
import os

def fetch_stock_data(ticker, start_date, end_date):
    # Fetch stock data
    stock_data = yf.download(ticker, start=start_date, end=end_date)
    # Return only the "Close" prices and the Date
    stock_data = stock_data[['Close']].reset_index()
    return stock_data

def process_ticker(ticker):
    # Define start and end dates
    start_date = '2010-01-01'
    end_date = '2025-03-01'

    # Dynamically name the CSV file based on the ticker symbol
    csv_filename = f"{ticker}_graph.csv"

    # Check if the file already exists
    if not os.path.exists(csv_filename):
        stock_data = fetch_stock_data(ticker, start_date, end_date)

        # Add year and stock price
        stock_data['year'] = stock_data['Date'].dt.year
        stock_data['stock_price'] = stock_data['Close']  # Renaming Close to stock_price

        # Initialize all emotion values to 0
        emotion_columns = ['optimism', 'anxiety', 'sadness', 'surprise', 'neutral', 'anger_disgust']
        for col in emotion_columns:
            stock_data[col] = 0  # Set all emotions to 0 initially

        # Resample to get only the first trading day of each month
        stock_data_monthly = stock_data.resample('MS', on='Date').first()  # 'MS' stands for Month Start

        # Reset the index to bring the 'Date' back as a column
        stock_data_monthly = stock_data_monthly.reset_index()

        # Rename 'Date' to 'date'
        stock_data_monthly = stock_data_monthly.rename(columns={'Date': 'date'})

        # Select the columns to match the required format
        final_data = stock_data_monthly[['date', 'stock_price', 'year'] + emotion_columns]

        # Save the data to a CSV file
        final_data.to_csv(csv_filename, index=False)

        # Print confirmation
        print(f"Saved to {csv_filename}")
        print(final_data.head())
    else:
        print(f"{csv_filename} already exists. No new data was fetched.")

    return csv_filename