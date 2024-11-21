# "D:\loan_approval\backend\loan_data_set.csv"
import pickle
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow communication with the React frontend

# Home Route (fixes 404 for '/')
@app.route('/')
def home():
    return 'Welcome to the Loan Approval Prediction API!'

# Favicon Route (fixes 404 for '/favicon.ico')
@app.route('/favicon.ico')
def favicon():
    return '', 204  # No content for favicon

# Load and preprocess the dataset (you should use the same dataset you had in the notebook)
def load_and_preprocess_data():
    # Load dataset (replace with the actual path to your dataset)
    data = pd.read_csv('LoanPredictor/backend/loan_data_set.csv')
    
    # Data Preprocessing (same as in the notebook)
    data['Gender'] = data['Gender'].fillna('Male')
    data['Married'] = data['Married'].fillna('Married')
    data['Dependents'] = data['Dependents'].replace('3+', '3').astype(float)
    data['Self_Employed'] = data['Self_Employed'].fillna('No')
    data['Credit_History'] = data['Credit_History'].fillna(1.0)
    
    # Label Encoding for categorical features
    label_encoders = {}
    for column in ['Gender', 'Married', 'Education', 'Self_Employed', 'Property_Area']:
        le = LabelEncoder()
        data[column] = le.fit_transform(data[column])
        label_encoders[column] = le
    
    # Separate features and target
    X = data.drop(columns=['Loan_ID', 'Loan_Status'])
    y = data['Loan_Status']
    
    return X, y

# Train the RandomForest model
def train_model():
    X, y = load_and_preprocess_data()
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    
    # Train RandomForest model (same as in the notebook)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Save the trained model to a file
    with open('loan_model.pkl', 'wb') as file:
        pickle.dump(model, file)
    
    return model

# Load the model if it's already trained
def load_model():
    try:
        with open('loan_model.pkl', 'rb') as file:
            model = pickle.load(file)
    except FileNotFoundError:
        model = train_model()
    return model

model = load_model()  # Load the model (train if not found)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Receive JSON input
    
    # Extract features from the input
    features = [
        data.get('Gender'),
        data.get('Married'),
        data.get('Dependents'),
        data.get('Education'),
        data.get('Self_Employed'),
        data.get('ApplicantIncome'),
        data.get('CoapplicantIncome'),
        data.get('LoanAmount'),
        data.get('Loan_Amount_Term'),
        data.get('Credit_History'),
        data.get('Property_Area'),
    ]
    
    # Make prediction using the trained model
    prediction = model.predict([features])
    result = 'Approved' if prediction[0] == 1 else 'Rejected'
    return jsonify({'loan_status': result})

if __name__ == '__main__':
    app.run(debug=True)
