import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={24} color="#042558" />
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
      name="parentsSupport"
      options={{
        tabBarLabel: 'parentsSupport',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="human-male-female-child" size={24} color="#042558" />
    ),
  }}
/>
      <Tabs.Screen
        name="Activities"
        options={{
          tabBarLabel: 'Activities',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="puzzle-piece" size={24} color="#042558" />
          ),
        }}
      />
    </Tabs>
  );
}