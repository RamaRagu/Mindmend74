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
    gap: 23,
    paddingHorizontal: 78,
    paddingVertical: 13,
    borderRadius: 10,
  },
  icon: {
    width: 19,
    height: 19,
    resizeMode: "contain",
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
});