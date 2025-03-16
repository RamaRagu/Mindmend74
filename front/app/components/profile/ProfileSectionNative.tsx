
import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

interface ProfileSectionNativeProps {
  imageUrl: string;
}

export const ProfileSectionNative: React.FC<ProfileSectionNativeProps> = ({ imageUrl }) => {
  return (
    <View style={styles.section}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 124,
    height: 110,
    borderRadius: 368,
    ...(Dimensions.get("window").width < 380 && {
      width: 100,
      height: 90,
    }),
  },
});