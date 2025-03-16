import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DateDisplay = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.date}>20 Nov,2024</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  title: {
    color: 'rgba(4,37,88,1)',
    fontSize: 24,
    fontWeight: '600',
  },
  date: {
    color: 'rgba(4,37,88,1)',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 18,
  },
});
