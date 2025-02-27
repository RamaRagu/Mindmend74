import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="Doctor"
        options={{
          tabBarLabel: 'Doctor',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="doctor" size={24} color="#042558" />
          ),
        }}
      />
      <Tabs.Screen
        name="Progress"
        options={{
          tabBarLabel: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="gauge" size={24} color="#042558" />
          ),
        }}
      />
      <Tabs.Screen
        name="Activities"
        options={{
          tabBarLabel: 'Activities',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="puzzle-piece" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}