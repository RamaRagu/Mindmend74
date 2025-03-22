import { SafeAreaView, StyleSheet } from "react-native";
import { RegisterForm2 } from "../components/auth2/RegisterForm2"; 
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useState } from "react";
const signin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);    
  const auth = FIREBASE_AUTH; 
  return (
    <SafeAreaView style={styles.container}>
      <RegisterForm2 />
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

