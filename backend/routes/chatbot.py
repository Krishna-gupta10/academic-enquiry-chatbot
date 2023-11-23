import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from xgboost import XGBClassifier
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import LabelEncoder
import json
import sys

training_set = pd.read_excel('./backend/routes/training_set.xlsx', sheet_name='Sheet1')
X_train = training_set['Questions']
y_train = training_set['Answers']

options_set = pd.read_excel('./backend/routes/options.xlsx', sheet_name='Sheet1')
X_options = options_set['Questions']
y_options = options_set['Answers']

label_encoder = LabelEncoder()
y_train_encoded = label_encoder.fit_transform(y_train)

tfidf_vectorizer = TfidfVectorizer()
X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)
xgb_classifier = XGBClassifier()
xgb_classifier.fit(X_train_tfidf, y_train_encoded)

def generate_options(user_input, options, tfidf_vectorizer):
    user_input_tfidf = tfidf_vectorizer.transform([user_input])
    options_tfidf = tfidf_vectorizer.transform(options)
    similarity_scores = cosine_similarity(user_input_tfidf, options_tfidf)[0]
    top_indices = similarity_scores.argsort()[-5:-2][::-1]
    generated_options = [options.iloc[i] for i in top_indices if options.iloc[i] != user_input]
    remaining_options = set(options) - set(generated_options + [user_input])
    generated_options.extend(list(remaining_options)[:3 - len(generated_options)])
    return generated_options[:3]

user_input = sys.argv[1]
selected_option = sys.argv[2] if len(sys.argv) > 2 else None

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

print(json.dumps(response))
