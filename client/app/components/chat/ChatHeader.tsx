import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface ChatHeaderProps {
  greeting?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  greeting = "Good Morning",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/8c57fe758640357843e7d9425cb54cf80b55526ba5405468626423ad5f639cc6",
          }}
          style={styles.avatarImage}
        />
        <Text style={styles.greetingText}>
          {greeting},{"\n"}
        </Text>
      </View>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/49b635ab58300e9cfc3137f545b875ef0653985ba8d5445e2348184732056ea0",
        }}
        style={styles.profileImage}
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
    marginTop: 8,
    resizeMode: "contain",
  },
  greetingText: {
    color: "white",
    fontSize: 36,
    fontWeight: "500",
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 368,
    marginTop: 10,
    resizeMode: "contain",
    // Shadow properties for React Native
    shadowColor: "rgba(4,37,88,1)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 10,
  },
});