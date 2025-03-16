import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const CircularProgress = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/b90fffc388c0b29b2f60c27996e1b49c0deb007a8ea16a8f988cabbcdd084665'
        }}
        style={styles.progressImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  progressImage: {
    width: 259,
    height: 259,
    aspectRatio: 1,
  },
});