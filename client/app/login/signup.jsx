import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import { RegisterForm } from "../components/auth/RegisterForm";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const auth = getAuth();
  const navigation = useNavigation();

  const handleSignup = async () => {
    const { email, password } = userData;
    
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created successfully!");
      
      // Redirect to the details collection page
      navigation.navigate("DetailsCollection");  
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <RegisterForm setUserData={setUserData} onSignup={handleSignup} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
});

export default Signup;
