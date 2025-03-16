import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type TimeRange = "Day" | "Week" | "Month" | "Year";

export const TabSelector = () => {
  const [selectedTab, setSelectedTab] = useState<TimeRange>("Day");

  const tabs: TimeRange[] = ["Day", "Week", "Month", "Year"];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setSelectedTab(tab)}
          style={[
            styles.tabButton,
            selectedTab === tab && styles.selectedTabButton
          ]}
          accessibilityState={{ selected: selectedTab === tab }}
        >
          <Text style={styles.tabButtonText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 376,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabButton: {
    backgroundColor: 'rgba(4,37,88,1)',
    paddingHorizontal: 23,
    paddingVertical: 5,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedTabButton: {
    borderWidth: 2,
    borderColor: 'rgba(4,37,88,1)',
    borderStyle: 'solid',
  },
  tabButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
