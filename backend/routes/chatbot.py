import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics.pairwise import cosine_similarity
import json
import sys

training_set = pd.read_excel('./backend/routes/training_set.xlsx', sheet_name='Sheet1')
X_train = training_set['Questions']
y_train = training_set['Answers']

tfidf_vectorizer = TfidfVectorizer()
X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)
random_forest = RandomForestClassifier(n_estimators=100, random_state=42)
random_forest.fit(X_train_tfidf, y_train)


def generate_options(user_input, all_questions, tfidf_vectorizer):
    
    user_input_tfidf = tfidf_vectorizer.transform([user_input])

    all_questions_tfidf = tfidf_vectorizer.transform(all_questions)

    similarity_scores = cosine_similarity(user_input_tfidf, all_questions_tfidf)[0]

    top_indices = similarity_scores.argsort()[-3:][::-1]

    options = [all_questions[i] for i in top_indices if all_questions[i] != user_input]

    remaining_options = set(all_questions) - set(options + [user_input])
    options.extend(list(remaining_options)[:3 - len(options)])

    return options[:3]


user_input = sys.argv[1]
selected_option = sys.argv[2] if len(sys.argv) > 2 else None

if len(user_input.strip()) == 0:
    response = {"response": "Please enter a valid query."}
else:
    if selected_option and selected_option in X_train.tolist():
        predicted_answer = y_train[X_train[X_train == selected_option].index[0]]
        response = {"response": predicted_answer}
    else:
        user_input_tfidf = tfidf_vectorizer.transform([user_input])
        predicted_answer = random_forest.predict(user_input_tfidf)
        
        if selected_option:
            response = {"response": selected_option}
        else:
            options = generate_options(user_input, X_train, tfidf_vectorizer)
            
            response = {"response": predicted_answer[0], "options": options}

print(json.dumps(response))
