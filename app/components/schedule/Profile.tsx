import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface ProfileProps {
  name: string;
  age: number;
  imageUrl: string;
}

export const Profile: React.FC<ProfileProps> = ({ name, age, imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.age}>Age {age}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    paddingHorizontal: 90,
    paddingVertical: 20,
  },
  image: {
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 1,
    borderColor: "#042558",
  },
  infoContainer: {
    flexDirection: "column",
  },
  name: {
    color: "#051F48",
    fontSize: 24,
    fontWeight: "bold",
  },
  age: {
    color: "#051F48",
    fontSize: 16,
  },
});