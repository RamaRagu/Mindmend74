from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from other domains (React Native frontend)

# Load the trained model
model = joblib.load("Level_Detaction_model.joblib")

@app.route('/')
def home():
    return 'Model API'

# Define the API route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json  # Get JSON data from request
        features = np.array(data['features']).reshape(1, -1)  # Convert list to NumPy array

        prediction = model.predict(features)  # Make prediction
        probability = model.predict_proba(features).tolist()  # Get probabilities

        result = {'prediction': int(prediction[0]), 'probability': probability}
        return jsonify(result)  # Return response as JSON

    except Exception as e:
        return jsonify({'error': str(e)})  # Handle errors

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
