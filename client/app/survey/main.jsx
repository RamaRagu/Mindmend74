import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

const MainScreen = () => {
  // Get the prediction from URL params
  const { prediction, description } = useLocalSearchParams();
  
  // Convert prediction to a number (default to 0 if not provided)
  const predictionNum = prediction ? parseInt(prediction) : 0;
  
  // Get appropriate risk level text and color
  const getLevelText = () => {
    switch(predictionNum) {
      case 0: return "Low risk of autism spectrum disorder";
      case 1: return "Medium risk of autism spectrum disorder";
      case 2: return "High risk of autism spectrum disorder";
      default: return "Assessment completed";
    }
  };
  
  const getLevelColor = () => {
    switch(predictionNum) {
      case 0: return "#4CAF50";  // Green
      case 1: return "#FF9800";  // Orange
      case 2: return "#F44336";  // Red
      default: return "#2196F3"; // Blue
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/Sucess.jpg")}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.checkmarkContainer}>
          <View style={[styles.checkmarkCircle, {backgroundColor: getLevelColor()}]}>
            <View style={styles.checkmark} />
          </View>
        </View>

        <Text style={styles.successText}>Successfully checked!</Text>
        
        {/* Display the predicted autism level */}
        <View style={[styles.resultContainer, {borderColor: getLevelColor()}]}>
          <Text style={[styles.resultTitle, {color: getLevelColor()}]}>
            Result
          </Text>
          <Text style={styles.resultText}>
            {description || getLevelText()}
          </Text>
          <Text style={styles.infoText}>
            This screening tool provides an initial assessment and is not a diagnostic tool. 
            Always consult with healthcare professionals for proper diagnosis and guidance.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {/* Try Again Button */}
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push("/survey/home")}
          >
            <Text style={styles.secondaryButtonText}>Try Again</Text>
          </TouchableOpacity>

          {/* Back to Home Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(tabs)")}
          >
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  checkmarkContainer: {
    marginBottom: 10,
  },
  checkmarkCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1a237e",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    width: 30,
    height: 15,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: "white",
    transform: [{ rotate: "-45deg" }],
  },
  successText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a237e",
    marginBottom: 20,
    textAlign: "center",
  },
  resultContainer: {
    width: "100%",
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 25,
    alignItems: "center",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1a237e",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "100%",
    maxWidth: 300,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#1a237e",
  },
  secondaryButtonText: {
    color: "#1a237e",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default MainScreen;
