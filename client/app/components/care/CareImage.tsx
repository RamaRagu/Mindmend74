import React, { FC } from "react";
import { Image, StyleSheet } from "react-native";

interface CareImageProps {
  src: string;
  alt: string; // Alt text is kept for accessibility documentation but not used in React Native
}

export const CareImage: FC<CareImageProps> = ({ src }) => {
  return (
    <Image 
      source={{ uri: src }} 
      style={styles.image}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    maxWidth: 354,
    aspectRatio: 1,
    borderRadius: 23,
  },
});
