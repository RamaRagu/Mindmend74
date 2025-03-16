import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { StatusBar as CustomStatusBar } from '../components/schedule/StatusBar';
import { Header } from '../components/schedule/Header';
import { Profile } from '../components/schedule/Profile';
import { Calendar } from '../components/schedule/Calender'; 
import { Timeline } from '../components/schedule/Timeline';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <Header />
      <Profile
        name="Thenusha"
        age={5}
        imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/4ef4360dc8826d3a155b9cbc846af4e71d78c1fb"
      />
      <Calendar />
      <Timeline />
      <TouchableOpacity style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FCFCFC',
    position: 'relative',
  },
  doneButton: {
    width: 286,
    height: 48,
    backgroundColor: '#042558',
    borderRadius: 31.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default HomeScreen;