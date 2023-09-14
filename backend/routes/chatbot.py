import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier

training_set = pd.read_excel('./training_set.xlsx', sheet_name='Sheet1')
X_train = training_set['Questions']
y_train = training_set['Answers']

tfidf_vectorizer = TfidfVectorizer()
X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)

random_forest = RandomForestClassifier(n_estimators=100, random_state=42)
random_forest.fit(X_train_tfidf, y_train)

# Read user input from command line
user_input = input("Query: ")

if len(user_input.strip()) == 0:
    print("Please enter a valid query.")
else:
    user_input_tfidf = tfidf_vectorizer.transform([user_input])
    predicted_answer = random_forest.predict(user_input_tfidf)

    # Print the predicted answer (this will be sent to the Express API)
    print(predicted_answer[0])
