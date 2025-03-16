import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TimeSlot } from "./TimeSlot";

const timeSlots = ["1pm", "2pm", "3pm", "4pm"];

export const Timeline = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <TouchableOpacity>
          <Text style={styles.addButton}>+Add Schedule</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.timelineContainer}>
        {timeSlots.map((time) => (
          <TimeSlot
            key={time}
            time={time}
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/f160afeb0b68dd29c16f6e7d94cf22199f10cfcc"
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  title: {
    color: "#051F48",
    fontSize: 20,
    fontWeight: "500",
  },
  addButton: {
    color: "#051F48",
    fontSize: 20,
    fontWeight: "500",
  },
  timelineContainer: {
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});