import React from "react";
import { Image, StyleSheet } from "react-native";

interface UserAvatarProps {
  src: string;
  alt?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ src }) => {
  return (
    <Image
      source={{ uri: src }}
      style={styles.avatar}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    shadowColor: "#042558",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
  }
});