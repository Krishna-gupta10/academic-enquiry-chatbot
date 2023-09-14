import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
import json
import sys

# Load the training data
training_set = pd.read_excel('./routes/training_set.xlsx', sheet_name='Sheet1')
X_train = training_set['Questions']
y_train = training_set['Answers']

# Initialize TF-IDF vectorizer and train the Random Forest classifier
tfidf_vectorizer = TfidfVectorizer()
X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)
random_forest = RandomForestClassifier(n_estimators=100, random_state=42)
random_forest.fit(X_train_tfidf, y_train)

# Read user input from Express.js request
user_input = sys.argv[1]

if len(user_input.strip()) == 0:
    response = {"response": "Please enter a valid query."}
else:
    user_input_tfidf = tfidf_vectorizer.transform([user_input])
    predicted_answer = random_forest.predict(user_input_tfidf)
    
    # Format the predicted answer as a JSON response
    response = {"response": predicted_answer[0]}

# Print the JSON response to stdout
print(json.dumps(response))
