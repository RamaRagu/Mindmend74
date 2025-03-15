
import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

export interface InputNativeProps extends TextInputProps {}

export const InputNative: React.FC<InputNativeProps> = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#666"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 36,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
    