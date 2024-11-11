import pandas as pd
import re
import ssl
import nltk
from nltk.corpus import stopwords

# I'm on macOS so i need this to bypass the ssl certificate error
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# Download the required nltk data
# nltk.download('stopwords')

# Using the kaggle dataset for the model
content = ['target', 'ids', 'date', 'flag', 'user', 'text']

# Need to read the data from the csv file
df = pd.read_csv('training.1600000.processed.noemoticon.csv', encoding='ISO-8859-1', names=content)


# Preprocess the data -> cleaning up the text a bit 

# Map sentiment labels (0 = Negative, 4 = Positive)
df['target'] = df['target'].map({0: 0, 4: 1})

# A function to clean up the text 
# stop_words = set(stopwords.words('english'))

def clean_text(text):
    # Remove URLs
    text = re.sub(r'http\S+', '', text) 

    # Remove mentions
    text = re.sub(r'@\S+', '', text)

    # Remove special characters and numbers
    text = re.sub(r'[^a-zA-Z\s]', '', text)

    # Convert to lowercase
    text = text.lower()

    # Remove stop words
    # text = ' '.join([word for word in text.split() if word not in stop_words])
    return text


# Apply the function to the text column of the dataframe
df['clean_text'] = df['text'].apply(clean_text)

sample = 5

print("\nRandom Negative Samples (0):")
print(df[df['target'] == 0][['target', 'clean_text']].sample(n=sample))

print("\nRandom Positive Samples (1):")
print(df[df['target'] == 1][['target', 'clean_text']].sample(n=sample))




