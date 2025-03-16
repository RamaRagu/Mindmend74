import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface TimeSlotProps {
  time: string;
  imageUrl: string;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({ time, imageUrl }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.line} />
      <View style={styles.appointmentContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  time: {
    color: "#051F48",
    fontSize: 20,
    fontWeight: "bold",
    width: 50,
  },
  line: {
    width: 55,
    height: 1,
    backgroundColor: "#042558",
  },
  appointmentContainer: {
    width: 311,
    height: 68,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 64,
    borderColor: "#042558",
  },
  image: {
    width: 60,
    height: 56,
    borderRadius: 30,
  },
});