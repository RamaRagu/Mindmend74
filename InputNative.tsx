import React, { forwardRef } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

export interface InputNativeProps extends TextInputProps {}

const InputNative = forwardRef<TextInput, InputNativeProps>((props, ref) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#666"
      {...props}
      ref={ref}
    />
  );
});

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

export default InputNative;