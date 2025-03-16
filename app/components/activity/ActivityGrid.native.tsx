import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityCard } from "./ActivityCard.native";

export const ActivityGrid = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <TouchableOpacity onPress={() => console.log("Top Image Pressed")}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/0b23e9d0b2826e881fae9eddb09e5d1b3debf6bba20b7246ca8c739060318264"
            }}
            style={styles.topImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Bottom Image Pressed")}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/48d70afecbb0773a9be3c06907e5125bc798f162e8657cd1147ab951f40d371c"
            }}
            style={styles.bottomImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rightColumn}>
        <TouchableOpacity onPress={() => console.log("Meditation Pressed")}>
          <ActivityCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/303eab83b7037e5ce7a8cfd888fddc5ae142453ff3e63e18cc97963068a1d300"
            title="Meditation"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Word Game Pressed")}>
          <ActivityCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/8821cc1171c31e2c0ff485c55751a43df678dc07d0bd9d90505a89bbf102ed7a"
            title="Word Game"
            style={styles.bottomCard}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 384,
    alignItems: "stretch",
    gap: 70,
    marginTop: 30,
  },
  leftColumn: {
    flex: 1,
    marginTop: 16,
  },
  topImage: {
    width: 149,
    height: 138,
    borderRadius: 0,
  },
  bottomImage: {
    width: 148,
    height: 156,
    marginTop: 52,
    borderRadius: 0,
  },
  rightColumn: {
    flex: 1,
    flexDirection: "column",
    gap: 47,
  },
  bottomCard: {
    marginTop: 0,
  },
});