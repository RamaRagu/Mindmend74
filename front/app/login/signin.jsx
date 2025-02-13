import { SafeAreaView, StyleSheet } from "react-native";
import { RegisterForm } from "../components/auth/RegisterForm"; // Adjust the path as needed

const signin = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RegisterForm />
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