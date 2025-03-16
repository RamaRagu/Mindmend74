import { SafeAreaView, StyleSheet } from "react-native";
import { RegisterForm2 } from "../components/auth2/RegisterForm2";
//import {auth} from './../../config/Firebaseconfig';
//import { createUserWithEmailAndPassword } from "firebase/auth";

const signup = () => {

  
  // const [email,setEmail]=useState('');
  // const [password,setPassword]=useState('');

  // const OnCreateAccount=()=>{
    
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed up 
  //       const user = userCredential.user;
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ..
  //     });
  // }
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