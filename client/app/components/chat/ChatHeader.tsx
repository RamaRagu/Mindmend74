import { router } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface ChatHeaderProps {
  greeting?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  greeting = "Welcome to Mindy",
}) => {
  const handleAvatarPress = () => {
    router.push("/(tabs)");
    // Add your navigation or other action here
  };

  const handleSurveyPress = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={handleAvatarPress}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/8c57fe758640357843e7d9425cb54cf80b55526ba5405468626423ad5f639cc6",
            }}
            style={styles.avatarImage}
          />
        </TouchableOpacity>
        <Text style={styles.greetingText}>
          {greeting},{"\n"}
        </Text>
      </View>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/49b635ab58300e9cfc3137f545b875ef0653985ba8d5445e2348184732056ea0",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    flex: 1,
  },
  avatarImage: {
    width: 52,
    height: 52,
    marginTop: -40,
    resizeMode: "contain",
  },
  greetingText: {
    color: "white",
    fontSize: 36,
    fontWeight: "500",
    textAlign: "center",
  },
});
