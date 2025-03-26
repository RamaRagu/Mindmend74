// // Signup.tsx

// import React, { useState } from "react";
// import { SafeAreaView, StyleSheet, Alert, View, ActivityIndicator } from "react-native";
// import { RegisterForm } from "../components/auth/RegisterForm";
// import { useNavigation } from "@react-navigation/native";

// const Signup = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async (email, password, confirmPassword) => {
//     setLoading(true);

//     try {
//       const { auth, createUserWithEmailAndPassword } = require("../../FirebaseConfig");
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       if (user) {
//         const token = await user.getIdToken();
//         const AsyncStorage = require('@react-native-async-storage/async-storage').default;
//         await AsyncStorage.setItem('userToken', token);
//         Alert.alert("Success", "Account created successfully!");
//         navigation.navigate("DetailsCollection");
//       } else {
//         Alert.alert("Error", "User creation failed.");
//       }
//     } catch (error) {
//       Alert.alert("Signup Failed", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#0000ff" />
//         </View>
//       ) : (
//         <RegisterForm onSignup={handleSignup} loading={loading} setLoading={setLoading} navigation={navigation} />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f3f4f6",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Signup;

// Signup.tsx

import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Alert, View, ActivityIndicator } from "react-native";
import { RegisterForm } from "../components/auth/RegisterForm";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirestoreService } from "../../FirestoreService";

const Signup = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (email, password, confirmPassword) => {
    setLoading(true);

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await FirestoreService.addUser({ email: email });
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("DetailsCollection");
      } else {
        Alert.alert("Error", "User creation failed.");
      }
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <RegisterForm onSignup={handleSignup} loading={loading} setLoading={setLoading} navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Signup;