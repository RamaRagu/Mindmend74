import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CarePointsProps {
  points: Array<{ text: string }>;
}

export const CarePoints: FC<CarePointsProps> = ({ points }) => {
  return (
    <View style={styles.container}>
      {points.map((point, index) => (
        <View key={index} style={styles.pointContainer}>
          <Text style={styles.pointText}>{point.text}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  pointContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  pointText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  }
});