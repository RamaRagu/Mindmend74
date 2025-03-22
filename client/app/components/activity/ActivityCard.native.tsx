import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface ActivityCardProps {
  imageSrc: string;
  title: string;
  style?: object;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  imageSrc,
  title,
  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={{ uri: imageSrc }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(226,234,255,1)",
    flexDirection: "column",
    alignItems: "stretch",
    width: 160,
    height: 160,
    paddingHorizontal: 4,
    paddingVertical: 14,
    borderRadius: 16,
  },
  image: {
    width: 153,
    height: 125,
    zIndex: 10,
    borderRadius: 309,
  },
  title: {
    fontSize: 16,
    color: "rgb(255,255,255)",
    fontWeight: "500",
    alignSelf: "center",
    marginTop: 8,
    zIndex: 20,
  },
});
