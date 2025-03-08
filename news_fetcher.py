# news_fetcher.py
import yfinance as yf
import requests
import time
import csv
import os
from datetime import datetime
from newspaper import Article
from urllib.parse import quote_plus

# Set GNews API key
GNEWS_API_KEY = "9150bf2961a14544346706caf3a1df58"

# List of common suffixes to remove
SUFFIXES = [' Inc.', ' Ltd.', ' LLC', ' Corp.', ' Corporation', ' Co.', ' Group']

# List of domain-like suffixes to remove
DOMAIN_SUFFIXES = ['.com', '.org', '.net', '.co', '.edu']

# Function to get company name from ticker symbol using Yahoo Finance
def get_company_name_from_ticker(ticker):
    try:
        stock = yf.Ticker(ticker)
        company_name = stock.info['longName']
        
        # Remove common corporate suffixes from the company name
        for suffix in SUFFIXES:
            if company_name.endswith(suffix):
                company_name = company_name.replace(suffix, '').strip()

        # Remove domain-like suffixes (e.g., .com, .org, .net) anywhere in the company name
        for suffix in DOMAIN_SUFFIXES:
            company_name = company_name.lower().replace(suffix, '').strip()
        
        print(f"Processed Company Name: {company_name}")  # Debugging line to check the final name
        return company_name
    except KeyError:
        print(f"Error: Company name not found for ticker {ticker}. Using fallback name.")
        return None
    except Exception as e:
        print(f"Error fetching data for {ticker}: {e}. Using fallback name.")
        return None

# Function to fetch articles for a given year
def fetch_articles_for_year(api_key, company_name, year):
    start_date = f'{year}-01-01T00:00:00Z'
    end_date = f'{year}-12-31T23:59:59Z'
    query = quote_plus(f'"{company_name}"')  # URL encode the company name for exact match
    url = f'https://gnews.io/api/v4/search?q={query}&from={start_date}&to={end_date}&lang=en&max=10&token={api_key}&in=title,description'
    
    print(f"Requesting URL: {url}")  # Debugging line to print the URL
    for _ in range(3):  # Retry up to 3 times
        response = requests.get(url)
        print(f"Response status: {response.status_code}")  # Debugging line to print the response status
        if response.status_code == 200:
            return response.json().get('articles', [])
        else:
            print(f"Error fetching articles for {year} (Status {response.status_code}). Retrying...")
            time.sleep(2)
    return []

# Function to fetch articles across multiple years
def fetch_articles(api_key, company_name):
    current_year = datetime.now().year
    all_articles = []
    for year in range(2010, current_year + 1):
        print(f"Fetching articles for {year}...")
        articles = fetch_articles_for_year(api_key, company_name, year)
        if articles:
            all_articles.extend(articles)
        else:
            print(f"No articles found for {year}.")
        time.sleep(2)
    return all_articles

def scrape_full_content(url):
    # List of domains to skip
    skip_domains = ['androidpolice.com', 'bgr.com', 'gadgetsnow.com', 'techradar.com']
    
    # Check if the URL contains any of the skip domains
    if any(domain in url.lower() for domain in skip_domains):
        print(f"Skipping {url} as it belongs to a problematic domain.")
        return f"URL skipped due to domain: {url}"
    
    # Otherwise, continue scraping the content
    article = Article(url)
    for _ in range(3):  # Retry up to 3 times
        try:
            article.download()
            article.parse()
            return article.text
        except Exception as e:
            print(f"Error scraping {url}: {e}. Retrying...")
            time.sleep(2)
    return "Error fetching full content."

# Function to save articles to CSV with full content
def save_articles_to_csv_with_full_content(articles, filename):
    headers = ['Title', 'PublishedAt', 'FullContent', 'URL']
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(headers)
        for article in articles:
            title = article['title']
            published_at = article['publishedAt']
            url = article['url']
            full_content = scrape_full_content(url)
            if full_content:
                writer.writerow([title, published_at, full_content, url])
    print(f"Articles saved to {filename}")

# Function to fetch and save news articles
def fetch_and_save_news(ticker):
    # Dynamically name the CSV file based on the ticker symbol
    filename = f"{ticker}_news.csv"
    
    # Check if the file already exists
    if os.path.exists(filename):
        print(f"{filename} already exists. No new data was fetched.")
        return filename
    
    # Get company name using Yahoo Finance API 
    company_name = get_company_name_from_ticker(ticker) 
    
    if not company_name:
        print(f"Could not fetch company name for ticker {ticker}.")
        return None
    
    print(f"Fetching news articles for {company_name} ({ticker})...")
    
    articles_data = fetch_articles(GNEWS_API_KEY, company_name)
    
    if articles_data:
        # Save articles to CSV with the ticker symbol in the filename
        save_articles_to_csv_with_full_content(articles_data, filename)
        
        # Display the first 5 articles for confirmation
        for article in articles_data[:5]:
            print(f"Title: {article['title']}")
            print(f"PublishedAt: {article['publishedAt']}")
            print(f"URL: {article['url']}")
            print(f"Full Content: {scrape_full_content(article['url'])}\n")
        
        return filename
    else:
        print(f"No articles found for {company_name}.")
        return None