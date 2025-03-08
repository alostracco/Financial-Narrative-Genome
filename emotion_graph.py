# emotion_graph.py
import pandas as pd
import plotly.graph_objects as go
from plotly.subplots import make_subplots

def generate_graph(csv_filename):
    # Load your dataset
    df = pd.read_csv(csv_filename)

    # Convert date column to datetime format
    df["date"] = pd.to_datetime(df["date"])

    # Extract year and month
    df["year"] = df["date"].dt.year
    df["year_month"] = df["date"].dt.to_period("M")  # For monthly aggregation

    # Aggregate emotions by year
    df_emotions = df.groupby("year")[["optimism", "anxiety", "sadness", "surprise", "neutral", "anger_disgust"]].mean().reset_index()

    # Aggregate stock prices by month
    df_stock = df.groupby("year_month")["stock_price"].mean().reset_index()
    df_stock["year_month"] = df_stock["year_month"].astype(str)  # Convert for plotting

    # Create figure
    fig = make_subplots(specs=[[{"secondary_y": True}]])

    # Add stock price line (thicker, green)
    fig.add_trace(
        go.Scatter(x=df_stock["year_month"], y=df_stock["stock_price"], mode='lines',
                   name="Stock Price", line=dict(color='green', width=3)),
        secondary_y=False
    )

    # Add emotion lines (thinner, different colors)
    colors = ["blue", "red", "purple", "orange", "gray", "brown"]
    emotions = ["optimism", "anxiety", "sadness", "surprise", "neutral", "anger_disgust"]

    for emotion, color in zip(emotions, colors):
        fig.add_trace(
            go.Scatter(x=df_emotions["year"], y=df_emotions[emotion], mode='lines',
                       name=emotion.capitalize(), line=dict(color=color, width=1)),
            secondary_y=True
        )

    # Layout
    fig.update_layout(
        title="Stock Prices & Emotional Tone Over Time",
        xaxis_title="Time",
        yaxis=dict(title="Stock Price"),
        yaxis2=dict(title="Emotion Score (1-10)", overlaying='y', side='right'),
        legend_title="Legend",
        template="plotly_white"
    )

    # Return the Plotly figure as JSON
    return fig.to_json()