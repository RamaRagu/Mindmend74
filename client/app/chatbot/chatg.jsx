import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from "react-native";
import axios from "axios";

import { ChatHeader } from "../components/chat/ChatHeader";

const Chatg = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);

  const OPENAI_API_KEY = "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"; // Replace with your actual API key

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async (message) => {
    if (message.trim() === "" || isLoading) {
      return; // Do not send an empty message or if already loading
    }

    setMessages([...messages, { text: message, sender: "user" }]);
    setInputMessage("");
    setHasSentMessage(true);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://ragur-m8600g6u-swedencentral.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2023-05-15",
        {
          messages: [
            {
              role: "system",
              content:
                "You are MindMend, a helpful AI assistant focused on providing support and information. Always respond like you are part of the MindMend application, refer to yourself as MindMend when appropriate. Be friendly, conversational, and helpful.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        },
        {
          headers: {
            "api-key": "2aoAYW6fvJUmEfFJnaZm4R1pTifkACcZ7o7XFqPhOugyp0JQ0QoOJQQJ99BCACfhMk5XJ3w3AAAAACOGAB0j",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}` //Add the new openAI api key
          },
        }
      );

      const reply = response.data.choices[0].message.content;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: reply, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error sending message to Azure OpenAI:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sorry, I couldn't process your request at the moment.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "What are the therapy options are there?",
    "Any resources to understand Autism?",
    "How do I set a reminder?",
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ChatHeader />
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.chatContainer}>
            {!hasSentMessage && (
              <Image
                source={require("../../assets/images/chat1.png")}
                style={styles.centerImage}
              />
            )}
            {messages.map((message, index) => (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  message.sender === "user"
                    ? styles.userBubble
                    : styles.botBubble,
                ]}
              >
                <Text
                  style={
                    message.sender === "user"
                      ? styles.userMessageText
                      : styles.botMessageText
                  }
                >
                  {message.text}
                </Text>
              </View>
            ))}
            {isLoading && (
              <View style={[styles.messageBubble, styles.botBubble]}>
                <Text style={styles.botMessageText}>Typing...</Text>
              </View>
            )}
          </View>
        </ScrollView>
        {!hasSentMessage && inputMessage === "" && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionsContainer}
          >
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
            style={[
              styles.sendButton,
              inputMessage.trim() === "" && styles.disabledButton,
            ]}
            onPress={() => handleSendMessage(inputMessage)}
            disabled={inputMessage.trim() === "" || isLoading}
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
    paddingVertical: 15,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  centerImage: {
    width: 600,
    height: 500,
    padding: 110,
    borderRadius: 60,
    alignSelf: "center",
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    marginVertical: 6,
    maxWidth: "80%",
    minWidth: 60,
  },
  userBubble: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
    marginRight: 10,
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: "#E5E5EA",
    alignSelf: "flex-start",
    marginLeft: 10,
    borderBottomLeftRadius: 4,
  },
  userMessageText: {
    color: "#fff",
    fontSize: 16,
  },
  botMessageText: {
    color: "#000",
    fontSize: 16,
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
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
    height: 70,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    minWidth: 150,
  },
  suggestionText: {
    color: "rgba(4,37,88,1)",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 30,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    color: "#000",
    fontSize: 16,
  },
  sendButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#007AFF",
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default Chatg;