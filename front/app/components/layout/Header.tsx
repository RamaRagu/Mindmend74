import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// Import the local image using a relative path
import profileImage from "../../../assets/images/ak.jpg";

export const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}></View>
      <View style={styles.profile}>
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image
            source={profileImage}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.greeting}>Hello Akaash!</Text>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/300235d2b93791f88e427ce4439bc9ae22dca8b564e6279daced03c73ec1aab9",
          }}
          style={styles.menuIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 10,
  },
  statusBar: {
    flexDirection: "row",
    maxWidth: 328,
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 12,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 60,
  },
  profileImageContainer: {
    width: 66,
    height: 66,
    borderRadius: 33,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#042558",
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 5,
  },
  profileImage: {
    width: 57,
    height: 57,
    borderRadius: 28.5,
  },
  greeting: {
    flex: 1,
    color: "#042558",
    fontSize: 32,
    fontWeight: "500",
    letterSpacing: -0.32,
  },
  menuIcon: {
    width: 34,
    height: 34,
    aspectRatio: 1,
  },
});