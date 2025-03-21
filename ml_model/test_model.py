import requests
import json
# Example 1: Low Risk
low_risk_data = {
    "features": [
        # 10 screening questions (A1-A10 scores) - mostly 0s indicating low risk
        0, 0, 0, 1, 0, 0, 0, 1, 0, 0,
        
        # Additional 11 features
        30.0,                 # age
        1,                    # gender (male)
        2,                    # ethnicity 
        0,                    # no jaundice
        0,                    # no family autism
        1,                    # country
        0,                    # not used app before
        2,                    # relation
        0,                    # no family history
        2,                    # low screening score (sum of A1-A10)
        0                     # result (no ASD)
    ]
}

# Example 2: Medium Risk
medium_risk_data = {
    "features": [
        # 10 screening questions (A1-A10 scores) - mix of 0s and 1s
        1, 0, 1, 0, 1, 1, 0, 1, 0, 1,
        
        # Additional 11 features
        22.0,                 # age
        0,                    # gender (female)
        1,                    # ethnicity
        1,                    # jaundice
        0,                    # no family autism
        3,                    # country
        1,                    # used app before
        1,                    # relation
        1,                    # family history
        6,                    # medium screening score
        0                     # result (borderline)
    ]
}

# Example 3: High Risk
high_risk_data = {
    "features": [
        # 10 screening questions (A1-A10 scores) - mostly 1s indicating high risk
        1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
        
        # Additional 11 features
        5.0,                  # age (young child)
        1,                    # gender (male)
        1,                    # ethnicity
        1,                    # jaundice
        1,                    # family autism
        1,                    # country
        0,                    # not used app before
        3,                    # relation
        1,                    # family history
        9,                    # high screening score
        1                     # result (ASD)
    ]
}


# API endpoint
API_URL = "http://localhost:5000/predict"

try:
    # Send request to your local API
    print(f"Sending data: {json.dumps(high_risk_data, indent=2)}")
    response = requests.post(
        API_URL, 
        headers={"Content-Type": "application/json"},
        json=high_risk_data,
        timeout=10
    )
    
    # Check if response is valid
    response.raise_for_status()
    
    # Print results
    print("\n--- API RESPONSE ---")
    print(f"Status Code: {response.status_code}")
    
    result = response.json()
    print("\nPrediction Result:")
    print(json.dumps(result, indent=2))
    
    # Display more user-friendly output
    if 'prediction' in result:
        risk_level = {0: "Low", 1: "Medium", 2: "High"}.get(result['prediction'], "Unknown")
        print(f"\n🔍 AUTISM RISK ASSESSMENT: {high_risk_data} Risk")
        print(f"📋 Description: {result.get('description', 'No description available')}")
        
        if 'probability' in result:
            probs = result['probability'][0]
            print(f"\nConfidence Percentages:")
            risk_levels = ["Low Risk", "Medium Risk", "High Risk"]
            for i, prob in enumerate(probs):
                if i < len(risk_levels):
                    print(f"  {risk_levels[i]}: {prob*100:.1f}%")
    else:
        print("\n❌ No prediction returned!")
except requests.exceptions.RequestException as e:
    print(f"\n❌ Error connecting to API: {e}")
    print("\nMake sure the model API is running with: python model_api.py")
except json.JSONDecodeError:
    print("\n❌ Error: Invalid JSON response from API")
except Exception as e:
    print(f"\n❌ Unexpected error: {e}")
