from flask import Flask, request, jsonify
import joblib
import numpy as np
import os
from flask_cors import CORS

# Get the current file directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load the trained model and scaler safely
model_path = os.path.join(BASE_DIR, "autism_rf_model.pkl")
scaler_path = os.path.join(BASE_DIR, "scaler.pkl")

if not os.path.exists(model_path) or not os.path.exists(scaler_path):
    raise FileNotFoundError("Model or scaler file is missing!")

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        if 'features' not in data:
            return jsonify({'error': "Missing 'features' key in request JSON"}), 400
        
        features = data['features']

        # Ensure features are a list
        if not isinstance(features, list):
            return jsonify({'error': "Invalid input: 'features' should be a list"}), 400

        features = np.array(features).reshape(1, -1)  # Convert to correct shape
        scaled_features = scaler.transform(features)  # Scale the input
        prediction = model.predict(scaled_features)  # Make prediction

        return jsonify({'prediction': int(prediction[0])})  # Return result
    except Exception as e:
        print(f"Error: {str(e)}")  # Log error in console
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
