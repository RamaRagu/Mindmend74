import React from "react";
import { View, StyleSheet } from "react-native";

export const StatusBar = () => {
  return (
    <View style={styles.container}>
      {/* Removed the time and battery icon */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
});