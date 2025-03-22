import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground, Image } from "react-native";
import axios from "axios";

import { ChatHeader } from "../components/chat/ChatHeader";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [hasSentMessage, setHasSentMessage] = useState(false);

  const handleSendMessage = async (message) => {
    if (message.trim() === "") {
      return; // Do not send an empty message
    }

    setMessages([...messages, { text: message, sender: "user" }]);
    setInputMessage("");
    setHasSentMessage(true);

    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": "You are a helpful assistant. This is a Chatbot for Autism so you can ask anything related to Autism."
            },
            {
                "role": "user",
                "content": message
            }
        ]
      }, {
        headers: {
          "Authorization": `Bearer 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`,
          "Content-Type": "application/json"
        }
      });

      const reply = response.data.choices[0].message.content;
      setMessages((prevMessages) => [...prevMessages, { text: reply, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending message to OpenAI:", error);
    }
  };

  const suggestions = [
    "What are the therapy options are there?",
    "Any resources to understand Autism ?",
    "How do I set a reminder?",
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
       
          <ChatHeader />
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.chatContainer}>
              {!hasSentMessage && (
                <Image
                  source={require('../../assets/images/chat1.png')} // Correct path to your image
                  style={styles.centerImage}
                />
              )}
              {messages.map((message, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageBubble,
                    message.sender === "user" ? styles.userBubble : styles.botBubble,
                  ]}
                >
                  <Text style={message.sender === "user" ? styles.userMessageText : styles.botMessageText}>
                    {message.text}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
          {!hasSentMessage && inputMessage === "" && (
            <ScrollView horizontal contentContainerStyle={styles.suggestionsContainer}>
              {suggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionBox}
                  onPress={() => handleSendMessage(suggestion)}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputMessage}
              onChangeText={setInputMessage}
              placeholder="Type a message..."
              placeholderTextColor="#888"
              onSubmitEditing={() => handleSendMessage(inputMessage)}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => handleSendMessage(inputMessage)}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "rgba(4,37,88,1)",
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  scrollView: {
    flexGrow: 1,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center", 
    alignItems: "center", 
  },
  centerImage: {
    width: 600, 
    height: 500, 
    padding: 110,
    borderRadius: 60,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "#E5E5EA",
    alignSelf: "flex-start",
  },
  userMessageText: {
    color: "#fff",
  },
  botMessageText: {
    color: "#000",
  },
  suggestionsContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10, 
  },
  suggestionBox: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    marginRight: 10,
    height: 70, 
    justifyContent: "center", 
  },
  suggestionText: {
    color: "rgba(4,37,88,1)",
    fontSize: 14,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: "#000",
  },
  sendButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
  },
});

export default Chatbot;