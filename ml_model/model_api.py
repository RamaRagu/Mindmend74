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
        
        # Extract features - handle both basic and full format cases
        if 'features' in data:
            # Simple case with just the 10 question answers
            features = np.array(data['features']).reshape(1, -1)
        else:
            # Full case with all parameters from the dataset
            features_dict = {
                'A1_Score': data.get('A1_Score', 0),
                'A2_Score': data.get('A2_Score', 0),
                'A3_Score': data.get('A3_Score', 0),
                'A4_Score': data.get('A4_Score', 0),
                'A5_Score': data.get('A5_Score', 0),
                'A6_Score': data.get('A6_Score', 0),
                'A7_Score': data.get('A7_Score', 0),
                'A8_Score': data.get('A8_Score', 0),
                'A9_Score': data.get('A9_Score', 0),
                'A10_Score': data.get('A10_Score', 0),
                'age': data.get('age', 0),
                'gender': 1 if data.get('gender') == 'm' else 0,  # Convert to numeric
                'jaundice': 1 if data.get('jaundice') == 'yes' else 0,
                'austim': 1 if data.get('austim') == 'yes' else 0,
                'used_app_before': 1 if data.get('used_app_before') == 'yes' else 0,
                'result': data.get('result', 0)
            }
            
            # Create a DataFrame with the features in the correct order
            features_df = pd.DataFrame([features_dict])
            
            # Select only the columns the model was trained on
            # This will need to match the columns used during training
            model_columns = ['A1_Score', 'A2_Score', 'A3_Score', 'A4_Score', 'A5_Score', 
                             'A6_Score', 'A7_Score', 'A8_Score', 'A9_Score', 'A10_Score']
            features = features_df[model_columns].values

        prediction = model.predict(features)  # Make prediction
        probability = model.predict_proba(features).tolist()  
        
        # Map prediction to autism level description
        level_descriptions = {
            0: "Low risk of autism spectrum disorder",
            1: "Medium risk of autism spectrum disorder",
            2: "High risk of autism spectrum disorder"
        }
        
        result = {
            'prediction': int(prediction[0]), 
            'probability': probability,
            'description': level_descriptions.get(int(prediction[0]), "Unknown risk level")
        }
        return jsonify(result)  

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({'error': str(e)})  

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
