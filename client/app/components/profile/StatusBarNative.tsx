
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Svg, Path, Rect } from "react-native-svg";

export const StatusBarNative = () => {
  
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  time: {
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: -0.316,
    color: "black",
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});