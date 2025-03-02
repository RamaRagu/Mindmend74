import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";

interface InputFieldProps {
  icon: string;
  placeholder: string;
  type?: string;
  showPasswordToggle?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  icon,
  placeholder,
  type = "text",
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <View style={styles.container}>
      <Image source={{ uri: icon }} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        secureTextEntry={isPassword && !showPassword}
        style={styles.input}
        placeholderTextColor="#000"
      />
      {showPasswordToggle && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeButton}
        >
          {showPassword ? (
            <Feather name="eye-off" size={23} color="#666" />
          ) : (
            <Feather name="eye" size={23} color="#666" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(226,234,255,1)",
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
    paddingHorizontal: 27,
    paddingVertical: 11,
    borderRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    borderRadius: 10,
  },
  input: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  eyeButton: {
    padding: 5,
  },
});

