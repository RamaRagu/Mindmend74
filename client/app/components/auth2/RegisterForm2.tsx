import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { InputField } from "./InputField";
import { SocialButton } from "./SocialButton";
import { useRouter } from 'expo-router';
import { RegisterForm } from "../auth2/RegisterForm3";

export const RegisterForm2: React.FC = () => {
  const router = useRouter();

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/login/signin')}>
        <Image
          source={require('../../../assets/images/back.png')}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Welcome Back</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/welcome.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.formContainer}>
        <InputField
          icon="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/15622e48b465dbfb5a2d7f364aeb7f8ac34455f4216af26690cb589613e0b6e2"
          placeholder="Enter the email address"
          type="email"
        />
        <InputField
          icon="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/5dc575503113dbb7dabaca762e741ff786c988745ee10cca20d683cbb08b2c2a"
          placeholder="Enter the password"
          type="password"
          showPasswordToggle
        />
        <TouchableOpacity onPress={() => router.push('../auth2/RegisterForm3')}>
          <Text style={styles.orText2}>Forgot password ?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => router.push('/(tabs)')}
        activeOpacity={0.8}
      >
        <Text style={styles.signupButtonText}>Sign in</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or continue with</Text>

      <View style={styles.socialButtons}>
        <SocialButton
          icon="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/c4ffed4be25f3eb1d7912de37b330ef3a97ad8a30709aad78c2646525a7d9882"
          label="Continue with Google"
        />
        <SocialButton
          icon="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/778f2beb291de330a13a5fb15c8a921194344cbf18624ad2a7402f4787459639"
          label="Continue with Apple"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account ? </Text>
        <TouchableOpacity onPress={() => router.push('/login/signup')}>
          <Text style={styles.signInText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    left: 5,
    position: 'absolute',
    marginTop: -20,
  },
  title: {
    fontSize: 32,
    color: "rgba(4,37,88,1)",
    fontWeight: 'bold',
    textAlign: "center",
    justifyContent: 'center',
    marginTop: -20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 20,
  },
  formContainer: {
    marginTop: 25,
    gap: 20,
  },
  signupButton: {
    backgroundColor: "rgba(4,37,88,1)",
    alignSelf: "center",
    width: "100%",
    maxWidth: 366,
    paddingHorizontal: 70,
    paddingVertical: 19,
    borderRadius: 20,
    marginTop: 20,
  },
  signupButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
  },
  orText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 15,
  },
  orText2: {
    fontSize: 16,
    color: "#B50000",
    fontWeight: "400",
    textAlign: "center",
    marginTop: 5,
  },
  socialButtons: {
    marginTop: 14,
    gap: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#000",
  },
  signInText: {
    fontSize: 15,
    color: "rgba(5,31,72,1)",
    fontWeight: "700",
  },
});