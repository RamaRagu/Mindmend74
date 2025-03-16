import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface RatingProps {
  value: number;
}

export const Rating: React.FC<RatingProps> = ({ value }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/ebded867bd3df2c72c36f9088f21e13f1b8ada78cb0abeb2d7e22378a1814b65",
        }}
        style={styles.starIcon}
      />
      <Text style={styles.ratingText}>{value.toFixed(1)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  starIcon: {
    width: 18,
    height: 18,
    aspectRatio: 1.06,
  },
  ratingText: {
    fontSize: 13,
    color: "#333333",
    fontWeight: "normal",
  },
});
