import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface CarePoint {
  text: string;
}

interface CarePointsProps {
  points: CarePoint[];
}

export const CarePoints: FC<CarePointsProps> = ({ points }) => {
  return (
    <View style={styles.container}>
      {points.map((point, index) => (
        <View key={index} style={styles.pointContainer}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.pointText}>{point.text}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 46,
  },
  pointContainer: {
    flexDirection: "row",
    marginBottom: 24,
    alignItems: "flex-start",
    marginLeft: 20,
  },
  checkmark: {
    fontSize: 20,
    marginRight: 20,
    color: "black",
    fontWeight: "600",
  },
  pointText: {
    fontSize: 20,
    color: "black",
    fontWeight: "600",
    flex: 1,
    marginRight: 20,
  },
});
