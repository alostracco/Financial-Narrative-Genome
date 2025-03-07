# pip install -q -U google-generativeai
import google.generativeai as genai
import json
import re
import os
from dotenv import load_dotenv


load_dotenv()

er_api_key = os.getenv("API_KEY")

genai.configure(api_key=er_api_key)

model = genai.GenerativeModel('gemini-2.0-flash')

def extract_entities_relationships(financial_text):
    """
    Extracts entities and relationships from financial text using Gemini.

    Args:
        financial_text: The financial text to analyze.

    Returns:
        A dictionary containing extracted entities and relationships, or None if an error occurs.
    """
    try:
        prompt = f"""
        Analyze the following financial text and extract the key entities (companies, people, organizations) and their relationships.

        Financial Text:
        {financial_text}

        Output the results in JSON format with the following structure:
        {{
          "entities": [
            {{
              "name": "Entity Name",
              "type": "Entity Type (Company, Person, Organization)"
              "importance": "(1-10)"
            }},
            // ... more entities
          ],
          "relationships": [
            {{
              "subject": "Entity Name",
              "relation": "Relationship Type (e.g., works at, is a subsidiary of, invested in)",
              "object": "Entity Name"
            }},
            // ... more relationships
          ]
        }}

        JSON:
        """

        response = model.generate_content(prompt)

        #a ttempt to load the json, and catch errors.
        response_text = "".join([chunk.text for chunk in response])
        cleaned_text = re.sub(r"```json|```", "", response_text).strip()

        try:
          data = json.loads(cleaned_text)
          return data
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            print(f"Problematic JSON string: {cleaned_text}") #print the problem json.
            return None


    except Exception as e:
        print(f"An error occurred: {e}")
        return None