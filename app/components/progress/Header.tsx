import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>9:41</Text>
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/c8c582b2880584ef9aace8486a5ae4e8612ce5f8564ea61a39a89e70f3c7b8a5'
          }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.rightContent}>
          <TouchableOpacity accessibilityLabel="Add new item">
            <Text style={styles.addButton}>+</Text>
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <Image
              source={{
                uri: 'https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/cc1663ce7f10b629059dc9b4010964971049ed0d9a67c8c52d85f3abac330647'
              }}
              style={styles.notificationIcon}
            />
            <Image
              source={{
                uri: 'https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/1dee814d8252483a11e6f17a7dc123a48cff55fb461b3a063c3d6c24503b8571'
              }}
              style={styles.settingsIcon}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 383,
    justifyContent: 'space-between',
  },
  timeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 20,
    color: 'rgba(4,37,88,1)',
    fontWeight: '500',
    textAlign: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    aspectRatio: 1,
    marginTop: 48,
  },
  rightContainer: {
    flexDirection: 'column',
  },
  rightContent: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: 152,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    color: 'rgba(4,37,88,1)',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 9,
  },
  notificationIcon: {
    width: 24,
    height: 14,
    aspectRatio: 1.72,
  },
  settingsIcon: {
    width: 21,
    height: 14,
    aspectRatio: 1.5,
  },
});
