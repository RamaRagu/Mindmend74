import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { InputField } from "./InputField";
import { useNavigation } from "@react-navigation/native";
import { SocialButton } from "./SocialButton";
import { useRouter } from 'expo-router';
import { auth } from '../../../FirebaseConfig';
import { createUserWithEmailAndPassword } from '../../../AuthServices';

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const navigation = useNavigation();

  const handleSignup = async (email: string, password: string, confirmPassword: string) => {
    console.log(email, password, confirmPassword);
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`https://api.mindmend74.com/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const user = data.user;
        // Handle successful user creation
      } else {
        throw new Error(data.message || 'Failed to create user');
      }
    } catch (error) {
      Alert.alert("Signup Failed", (error as Error).message || "An unknown error occurred.");
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/login/onboard3')}>
        <Image
          source={require('../../../assets/images/back.png')}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Register</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/Register.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.formContainer}>
        <InputField
          icon="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/15622e48b465dbfb5a2d7f364aeb7f8ac34455f4216af26690cb589613e0b6e2"
          placeholder="Enter the email address"
          type="email"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          icon="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/5dc575503113dbb7dabaca762e741ff786c988745ee10cca20d683cbb08b2c2a"
          placeholder="Enter the password"
          type="password"
          showPasswordToggle
          value={password}
          onChangeText={setPassword}
        />
        <InputField
          icon="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/5dc575503113dbb7dabaca762e741ff786c988745ee10cca20d683cbb08b2c2a"
          placeholder="Re-enter the password"
          type="password"
          showPasswordToggle
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => handleSignup(email, password, confirmPassword)}
        activeOpacity={0.8}
      >

        <Text style={styles.signupButtonText}>Sign up</Text>
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
        <Text style={styles.footerText}>Already you have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/login/signin')}>
          <Text style={styles.signInText}>Sign In</Text>
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
    width: 200,
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

