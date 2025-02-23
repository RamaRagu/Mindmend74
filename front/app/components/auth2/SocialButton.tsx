import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

interface SocialButtonProps {
  icon: string;
  label: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ icon, label }) => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8}>
      <Image source={{ uri: icon }} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(226,234,255,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 19,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    color: "black",
    fontWeight: "500",
  },
});