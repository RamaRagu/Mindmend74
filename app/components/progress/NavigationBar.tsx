import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

export const NavigationBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navButton}>
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/4d02e8fae834b0d9708455f700eb008018407a99de947994ec86ccb6879ff5f2'
          }}
          style={styles.homeIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.activeNavButton}>
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/99d2d1c2e90b64a22cdeb1cf6d89aa42e609939c62ad6fb348069e75c7763af8'
          }}
          style={styles.progressIcon}
        />
        <Text style={styles.navText}>Progress</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton}>
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/81e1111fd3c8076cf2806d1fb2cade23908bc1882bfa8811487ebd27d151a879'
          }}
          style={styles.calendarIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton}>
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/d82ddc60e092e570b591913bbbf115244c98a0e594d3af7acf07a06b54235522'
          }}
          style={styles.profileIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(4,37,88,1)',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 9,
    paddingHorizontal: 45,
  },
  navButton: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  activeNavButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: -16,
  },
  homeIcon: {
    width: 31,
    height: 27,
    aspectRatio: 1.15,
  },
  progressIcon: {
    width: 34,
    height: 34,
    aspectRatio: 1,
  },
  calendarIcon: {
    width: 32,
    height: 32,
    aspectRatio: 1,
  },
  profileIcon: {
    width: 34,
    height: 34,
    aspectRatio: 1,
  },
  navText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 33,
  },
});
