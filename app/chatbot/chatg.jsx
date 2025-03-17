import React, { useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import axios from "axios";

import { ChatHeader } from "../components/chat/ChatHeader";
import { ChatInput } from "../components/chat/ChatInput";
import { ChatSuggestion } from "../components/chat/ChatSuggestion";

const chatg = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    setMessages([...messages, { text: message, sender: "user" }]);

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
    "How do i set reminder ?",
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.mainColumn}>
            <View style={styles.chatContainer}>
            
              <ChatHeader />

              <Image
                source={{
                  uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/1303764f2957090f03233a3d698b3901a76a36664cd1debec4abd322f27664f1",
                }}
                style={styles.chatBackground}
              />

              <View style={styles.suggestionsContainer}>
                {suggestions.map((suggestion, index) => (
                  <ChatSuggestion
                    key={index}
                    text={suggestion}
                    onClick={() => handleSendMessage(suggestion)}
                  />
                ))}
              </View>

              <ChatInput onSend={handleSendMessage} />
              
            </View>

           
          </View>
        </View>
      </ScrollView>
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
    flexDirection: "row",
    width: 500,
    height: "100%",
    marginHorizontal: "auto",
    gap: 20,
  },
  mainColumn: {
    width: "78%",
    flexDirection: "row",
    gap: 20,
  },
  chatContainer: {
    width: "100%",
    backgroundColor: "rgba(4,37,88,1)",
    flexDirection: "column",
    overflow: "hidden",
    paddingTop: 10,
    paddingBottom: 0,
    paddingHorizontal: 9,
  },
  chatBackground: {
    width: "100%",
    aspectRatio: 1.3,
    resizeMode: "contain",
    marginTop: 131,
    borderRadius: 57,
  },
  suggestionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 11,
    marginTop: 148,
  },
  sideColumn1: {
    width: "26%",
    marginLeft: 20,
  },
  sideText1: {
    color: "rgba(4,37,88,1)",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 17,
    textAlign: "center",
    marginTop: 778,
  },
  sideColumn2: {
    width: "22%",
    marginLeft: 20,
  },
  sideContainer2: {
    backgroundColor: "white",
    width: "100%",
    marginTop: 757,
    paddingHorizontal: 9,
    paddingVertical: 30,
    borderRadius: 10,
  },
  sideText2: {
    color: "rgba(4,37,88,1)",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default chatg;