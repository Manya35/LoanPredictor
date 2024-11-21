# Research Project
## Python and Machine Learning Internship, IGDTUW
### Prediction for Loan Approval using Machine Learning Algorithms

# Loan Predictor

Loan Predictor is a web-based application that predicts loan approval status based on user input. It uses a machine learning model deployed through a Flask API and provides an interactive frontend built with React.

## Features

- **Machine Learning Model**: A Random Forest Classifier trained on a labeled dataset to predict loan approval.
- **Backend**: Flask API for handling predictions.
- **Frontend**: A React application with a responsive form for user input.
- **Real-time Prediction**: Input data is processed and sent to the backend, which returns the prediction instantly.
- **Easy-to-Use Interface**: Intuitive form with dropdowns and text fields.

## Tech Stack

- **Frontend**: React.js, Material-UI for form and layout.
- **Backend**: Flask with RESTful API, Flask-CORS for frontend-backend communication.
- **Machine Learning**: Scikit-learn for training and deploying the model.
- **Model Storage**: Pickle for saving and loading the model.

## How It Works

1. Users fill out the loan application form with details such as income, marital status, credit history, etc.
2. The form data is sent to the Flask backend through a POST request.
3. The backend loads the pre-trained Random Forest model and makes predictions.
4. The prediction result (Approved or Rejected) is displayed on the frontend.

## Setup and Installation

### Prerequisites

- Python 3.7+
- Node.js and npm

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install required Python libraries:
   ```bash
   pip install flask flask-cors pandas scikit-learn
   ```
3. Start the Flask server:
   ```bash
   python app.py
   ```
### Frontend Setup

1. Navigate to the frontend directory:
```bash
   cd frontend
```
2. Install dependencies:
```bash
   npm install
```
3. Start the React app:
```bash
   npm start
```
4. Accessing the Application
 Open your web browser and navigate to http://localhost:3000.
### File Structure
```bash
.
├── backend/
│   ├── app.py           # Flask API code
│   ├── loan_model.pkl   # Pre-trained machine learning model
│   └── loan_data_set.csv # Dataset (optional, for retraining)
├── frontend/
│   ├── src/
│   │   └── App.js        # Main React component
│   └── public/
│       └── index.html    # Entry point for the React app
└── README.md            # Project documentation
