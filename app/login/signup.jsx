import { SafeAreaView, StyleSheet } from "react-native";
import { RegisterForm2 } from "../components/auth2/RegisterForm2";

const signup = () => {
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

export default signup;