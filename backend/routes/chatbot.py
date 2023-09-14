import sys
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier

def chatbot(user_input):
    training_set = pd.read_excel('./training_set.xlsx', sheet_name='Sheet1')
    X_train = training_set['Questions']
    y_train = training_set['Answers']

    tfidf_vectorizer = TfidfVectorizer()
    X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)

    random_forest = RandomForestClassifier(n_estimators=100, random_state=42)
    random_forest.fit(X_train_tfidf, y_train)

    if len(user_input.strip()) == 0:
        return "Please enter a valid query."

    user_input_tfidf = tfidf_vectorizer.transform([user_input])
    predicted_answer = random_forest.predict(user_input_tfidf)

    return predicted_answer[0]

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: chatbot.py <user_input>")
    else:
        user_input = sys.argv[1]
        response = chatbot(user_input)
        print("Chatbot's Response:", response)
