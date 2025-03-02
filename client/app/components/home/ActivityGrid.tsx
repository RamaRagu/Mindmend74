import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useRouter } from 'expo-router'; // Import useRouter hook

export const ActivityGrid: React.FC = () => {
  const router = useRouter(); // Initialize router

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/chatbot/chatg')} // Correct the navigation path
      >
        <Image 
          source={require('../../../assets/images/spt.png')} 
          style={{ width: 100, height: 100, justifyContent: "center", left: 10 }} 
        />
        <Text style={styles.buttonText}>Speech Therapy</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/chatbot/chatg')} // Correct the navigation path
      >
        <Image 
          source={require('../../../assets/images/games.png')} 
          style={{ width: 120, height: 100, justifyContent: "center", left: 10 }} 
        />
        <Text style={styles.buttonText}>Games</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 350, 
    justifyContent: "space-between",
    gap: 5,
  },
  button: {
    backgroundColor: "#042558",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 10,
  },
});