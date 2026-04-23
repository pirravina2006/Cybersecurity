import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score

# Load dataset
data = pd.read_csv("spam1.csv")

# Check column names
print(data.columns)

# Use correct columns from your CSV
data = data[['label', 'message']]

# Convert text labels into numbers
data['label'] = data['label'].map({'ham': 0, 'spam': 1})

# Split data
X = data['message']
y = data['label']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Convert text into numbers using TF-IDF
vectorizer = TfidfVectorizer()
X_train = vectorizer.fit_transform(X_train)
X_test = vectorizer.transform(X_test)

# Train model
model = MultinomialNB()
model.fit(X_train, y_train)

# Predict test data
predictions = model.predict(X_test)

# Show accuracy
print("Accuracy:", accuracy_score(y_test, predictions))

# Test your own message
msg = ["Congratulations! You won a free iPhone"]
msg_vector = vectorizer.transform(msg)

result = model.predict(msg_vector)

if result[0] == 1:
    print("Spam Email")
else:
    print("Not Spam Email")
