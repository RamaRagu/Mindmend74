import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ChatSuggestionProps {
  text: string;
  onClick?: () => void;
}

export const ChatSuggestion: React.FC<ChatSuggestionProps> = ({
  text,
  onClick,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 21,
    borderRadius: 10,
  },
  text: {
    color: "rgba(4,37,88,1)",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 18,
    textAlign: "center",
  },
});