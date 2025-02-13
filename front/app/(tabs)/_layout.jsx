import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function TabLayout() {
  return (
    
    <Tabs >
        <Tabs.Screen name='index'
          options={{
            tabBarLabel : 'Home',
            tabBarIcon:({Color,size})=>(
              <FontAwesome name="home" size={24} color="black" />
            )
          }}
        />
        <Tabs.Screen name='Doctor'
          options={{
            tabBarLabel : 'Doctor',
            tabBarIcon:({Color,size})=>(
              <Fontisto name="doctor" size={24} color="black" />
            )
          }}/>
        <Tabs.Screen name="Activites"

      />
        <Tabs.Screen name='Progress'/>
    </Tabs>
  )
}