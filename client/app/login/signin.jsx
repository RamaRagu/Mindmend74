import { SafeAreaView, StyleSheet, Alert } from "react-native";
import { RegisterForm2 } from "../components/auth2/RegisterForm2";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Track registration/login state
  const auth = FIREBASE_AUTH;

  const handleAuthentication = async () => {
    setLoading(true);
    setError(""); 
    try {
      if (isRegistering) {
        // Registration logic
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Registered with:", response.user.email);
        Alert.alert("Registration Successful", "You have been registered successfully!");
      } else {
        // Login logic
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in with:", response.user.email);
        Alert.alert("Login Successful", "You are logged in!");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message);
      Alert.alert("Authentication Failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <RegisterForm2
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        loading={loading}
        onPress={handleAuthentication}
        isRegistering={isRegistering}
        setIsRegistering={setIsRegistering}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
});

export default signin;

