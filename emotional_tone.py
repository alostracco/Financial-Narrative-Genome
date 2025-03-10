import csv
import json
from datetime import datetime
import google.generativeai as genai
import re
import os
from dotenv import load_dotenv

load_dotenv()

# Set your API key
ci_api_key = os.getenv("CI_API_KEY")

# Configure the API key
genai.configure(api_key=ci_api_key)

# Function to detect emotional tone and relevance to the company
def generate_emotion_and_relevance(text, company_name):
    model = genai.GenerativeModel("gemini-2.0-flash")  # Define the model

    # Define input text
    input_text = f"""
    Analyze the following financial article and determine whether it is relevant to the company named "{company_name}". 
    If the article is relevant to the company, please categorize the emotions that this article will evoke towards the company, 
    focusing on how the content affects the company's image or perception.
    Categorize these emotions into the following categories:
    optimism, anxiety, sadness, surprise, neutral, anger/disgust.
    Please output the emotion for each category, with a confidence score between 1 and 10 for each emotion.
    If the article is not relevant to the company, do not return emotional scores and simply state 'Not relevant to the company'.
    The text is:
    {text}

    The output should be in the following format:
    {{
        "relevant": true/false,  # Whether the article is relevant to the company
        "optimism": confidence_score (1-10),
        "anxiety": confidence_score (1-10),
        "sadness": confidence_score (1-10),
        "surprise": confidence_score (1-10),
        "neutral": confidence_score (1-10),
        "anger_disgust": confidence_score (1-10)
    }}
    """

    # Generate content from model
    try:
        response = model.generate_content(input_text)
        # Combine response text
        response_text = "".join([chunk.text for chunk in response])

        # Clean up the response
        cleaned_text = re.sub(r"```json|```", "", response_text).strip()

        # Convert response to JSON
        output_json = json.loads(cleaned_text)
        return output_json
    except Exception as e:
        print(f"Error occurred while processing article: {e}")
        return {"error": str(e)}

# Function to calculate average emotional scores for each year and fill the graph CSV
def process_articles_and_update_graph(csv_file, company_name, ticker_graph_csv, batch_size=10):
    # Dictionary to store the emotional scores for each year
    year_emotions = {}

    # Open the CSV file and read articles
    with open(csv_file, mode='r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        
        # Accumulate articles in a batch
        batch_articles = []
        
        # Process each article and calculate emotions
        for row in reader:
            title = row['Title']
            published_at = row['PublishedAt']
            full_content = row['FullContent']
            year = datetime.strptime(published_at, "%Y-%m-%dT%H:%M:%S%z").year
            month = datetime.strptime(published_at, "%Y-%m-%dT%H:%M:%S%z").month

            print(f"Processing article: {title}")
            
            # Add article to the current batch
            batch_articles.append((full_content, company_name, year, month))

            # If the batch size is reached, process the batch
            if len(batch_articles) == batch_size:
                print(f"Processing batch of {batch_size} articles...")
                
                # Process each article in the batch
                for article in batch_articles:
                    emotion_scores = generate_emotion_and_relevance(article[0], article[1])
                    
                    # If the article is relevant, update the emotional scores
                    if "relevant" in emotion_scores and emotion_scores["relevant"] == True:
                        optimism = emotion_scores.get('optimism', 0)
                        anxiety = emotion_scores.get('anxiety', 0)
                        sadness = emotion_scores.get('sadness', 0)
                        surprise = emotion_scores.get('surprise', 0)
                        neutral = emotion_scores.get('neutral', 0)
                        anger_disgust = emotion_scores.get('anger_disgust', 0)

                        # Add the scores to the corresponding year and month
                        if (article[2], article[3]) not in year_emotions:
                            year_emotions[(article[2], article[3])] = {
                                'optimism': [],
                                'anxiety': [],
                                'sadness': [],
                                'surprise': [],
                                'neutral': [],
                                'anger_disgust': []
                            }

                        year_emotions[(article[2], article[3])]['optimism'].append(optimism)
                        year_emotions[(article[2], article[3])]['anxiety'].append(anxiety)
                        year_emotions[(article[2], article[3])]['sadness'].append(sadness)
                        year_emotions[(article[2], article[3])]['surprise'].append(surprise)
                        year_emotions[(article[2], article[3])]['neutral'].append(neutral)
                        year_emotions[(article[2], article[3])]['anger_disgust'].append(anger_disgust)

                # Clear the batch after processing
                batch_articles.clear()

    # Read the existing CSV file into memory to modify it
    with open(ticker_graph_csv, mode='r', newline='', encoding='utf-8') as graph_file:
        reader = csv.DictReader(graph_file)
        rows = list(reader)

    # Update the rows with new emotional scores
    updated_rows = []
    for (year, month), emotions in year_emotions.items():
        avg_optimism = sum(emotions['optimism']) / len(emotions['optimism'])
        avg_anxiety = sum(emotions['anxiety']) / len(emotions['anxiety'])
        avg_sadness = sum(emotions['sadness']) / len(emotions['sadness'])
        avg_surprise = sum(emotions['surprise']) / len(emotions['surprise'])
        avg_neutral = sum(emotions['neutral']) / len(emotions['neutral'])
        avg_anger_disgust = sum(emotions['anger_disgust']) / len(emotions['anger_disgust'])

        # Update all rows that match the year
        for row in rows:
            if row['year'] == str(year):
                row['optimism'] = avg_optimism
                row['anxiety'] = avg_anxiety
                row['sadness'] = avg_sadness
                row['surprise'] = avg_surprise
                row['neutral'] = avg_neutral
                row['anger_disgust'] = avg_anger_disgust

    # Write the updated rows back to the CSV
    with open(ticker_graph_csv, mode='w', newline='', encoding='utf-8') as graph_file:
        fieldnames = ['date', 'stock_price', 'year', 'optimism', 'anxiety', 'sadness', 'surprise', 'neutral', 'anger_disgust']
        writer = csv.DictWriter(graph_file, fieldnames=fieldnames)

        writer.writeheader()
        writer.writerows(rows)

    print(f"Ticker graph updated with average emotional scores for each year in {ticker_graph_csv}.")