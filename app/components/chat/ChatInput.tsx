import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Ask your question....."
        placeholderTextColor="rgba(4,37,88,0.7)"
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.sendButton}>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/6f8a4ae13d73799b258bd7fdba53886f0ab1f4b4d5de2b3724b10f31c006828d",
          }}
          style={styles.sendIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    width: 416,
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 37,
    paddingLeft: 47,
    paddingRight: 6,
    paddingVertical: 7,
    borderRadius: 22,
  },
  input: {
    backgroundColor: "transparent",
    flex: 1,
    color: "rgba(4,37,88,1)",
    fontSize: 16,
    fontWeight: "500",
  },
  sendButton: {
    padding: 5,
    backgroundColor: "#042558",
    borderRadius: 17,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sendIcon: {
    width: 34,
    height: 34,
    resizeMode: "contain",
  },
});