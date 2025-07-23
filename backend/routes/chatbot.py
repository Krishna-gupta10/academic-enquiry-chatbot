import pandas as pd
import json
import sys
from sklearn.feature_extraction.text import TfidfVectorizer
from xgboost import XGBClassifier
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import LabelEncoder

# Load training data
training_set = pd.read_excel('./backend/routes/training_set.xlsx', sheet_name='Sheet1')
X_train = training_set['Questions']
y_train = training_set['Answers']

# Load options set
options_set = pd.read_excel('./backend/routes/options.xlsx', sheet_name='Sheet1')
X_options = options_set['Questions']
y_options = options_set['Answers']

# Encode labels
label_encoder = LabelEncoder()
y_train_encoded = label_encoder.fit_transform(y_train)

# TF-IDF vectorization
tfidf_vectorizer = TfidfVectorizer()
X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)

# Train XGBoost classifier
xgb_classifier = XGBClassifier()
xgb_classifier.fit(X_train_tfidf, y_train_encoded)

# Function to generate top 3 options
def generate_options(user_input, all_questions, tfidf_vectorizer):
    user_input_tfidf = tfidf_vectorizer.transform([user_input])
    all_questions_tfidf = tfidf_vectorizer.transform(all_questions)
    similarity_scores = cosine_similarity(user_input_tfidf, all_questions_tfidf)[0]
    top_indices = similarity_scores.argsort()[-3:][::-1]
    options = [all_questions.iloc[i] for i in top_indices if all_questions.iloc[i] != user_input]
    remaining_options = set(all_questions) - set(options + [user_input])
    options.extend(list(remaining_options)[:3 - len(options)])
    return options[:3]

# Get user input
user_input = sys.argv[1]
selected_option = sys.argv[2] if len(sys.argv) > 2 else None

# Prepare response
if len(user_input.strip()) == 0:
    response = {"response": "Please enter a valid query."}
else:
    user_input_tfidf = tfidf_vectorizer.transform([user_input])
    predicted_answer_encoded = xgb_classifier.predict(user_input_tfidf)[0]
    predicted_answer = label_encoder.inverse_transform([predicted_answer_encoded])[0]
    confidence_score = xgb_classifier.predict_proba(user_input_tfidf).max() * 100

    if confidence_score >= 15:
        response = {"response": predicted_answer}
    else:
        response = {"response": "We are not confident in our answer. Please contact the helpline for assistance."}

    if selected_option:
        response["selected_option"] = selected_option

    options = generate_options(user_input, X_options, tfidf_vectorizer)
    response["options"] = options

# Print final response as JSON
print(json.dumps(response))
