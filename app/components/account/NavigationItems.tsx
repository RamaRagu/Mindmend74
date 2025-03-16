import React, { FC } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface NavigationItem {
  icon: string;
  label: string;
  onClick?: () => void;
}

interface NavigationItemsProps {
  items: NavigationItem[];
}

const NavigationItems: FC<NavigationItemsProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.itemContainer}
          onPress={item.onClick}
        >
          <Image source={{ uri: item.icon }} style={styles.icon} />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 30,
    marginTop: 60,
    paddingHorizontal: 48, // equivalent to px-12
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    width: 30,
    height: 30,
  },
  label: {
    color: '#042558',
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default NavigationItems;
