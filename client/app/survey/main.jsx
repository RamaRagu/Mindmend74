import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/Sucess.jpg")}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.checkmarkContainer}>
          <View style={styles.checkmarkCircle}>
            <View style={styles.checkmark} />
          </View>
        </View>

        <Text style={styles.successText}>Successfully checked!</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/home")}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
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
    marginBottom: 40,
  },
  checkmarkContainer: {
    marginBottom: 20,
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
    marginBottom: 40,
    textAlign: "center",
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
});

export default MainScreen;
