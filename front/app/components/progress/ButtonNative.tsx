
import React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, Dimensions } from "react-native";

export interface ButtonNativeProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

export const ButtonNative: React.FC<ButtonNativeProps> = ({
  children,
  style,
  ...props
}) => {
  const isSmallScreen = Dimensions.get("window").width < 380;
  
  return (
    <TouchableOpacity
      style={[styles.button, isSmallScreen && styles.buttonSmall, style]}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 286,
    height: 48,
    backgroundColor: "#042558",
    borderRadius: 31.5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 30,
  },
  buttonSmall: {
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});