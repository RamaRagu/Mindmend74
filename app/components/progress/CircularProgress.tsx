import React from 'react';
import { View, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

export const CustomCircularProgress = () => {
  return (
    <View style={styles.container}>
      <CircularProgress
        value={60}
        radius={120}
        progressValueColor={'#ecf0f1'}
        activeStrokeColor={'#f39c12'}
        inActiveStrokeColor={'#9b59b6'}
        inActiveStrokeOpacity={0.5}
        inActiveStrokeWidth={20}
        activeStrokeWidth={40}
      />
      <CircularProgress
        value={60}
        radius={120}
        progressValueColor={'#ecf0f1'}
        activeStrokeColor={'#f39c12'}
        inActiveStrokeColor={'#9b59b6'}
        inActiveStrokeOpacity={0.5}
        inActiveStrokeWidth={40}
        activeStrokeWidth={20}
      />
      <CircularProgress
        value={60}
        radius={120}
        inActiveStrokeOpacity={0.5}
        activeStrokeWidth={20}
        inActiveStrokeWidth={20}
        progressValueStyle={{ fontWeight: '100', color: 'yellow' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});