import React from 'react';
import { Image, StyleSheet } from 'react-native';

export const StatsCard = () => {
  return (
    <Image
      source={{
        uri: 'https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/13dcaea7af5890093970a1ffb99c48d8e28900492176095f6f7cf20ef88a6d49'
      }}
      style={styles.statsImage}
    />
  );
};

const styles = StyleSheet.create({
  statsImage: {
    width: '100%',
    maxWidth: 370,
    height: 224, // Calculated based on aspect ratio 1.65
    aspectRatio: 1.65,
    borderRadius: 21,
  },
});
