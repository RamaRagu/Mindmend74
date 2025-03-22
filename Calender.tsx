import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface DateItem {
  date: string;
  day: string;
}

const dates: DateItem[] = [
  { date: "20", day: "Mon" },
  { date: "02", day: "Tue" },
  { date: "03", day: "Wed" },
  { date: "04", day: "Fri" },
  { date: "05", day: "Sat" },
];

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState("03");

  return (
    <View style={styles.container}>
      {dates.map((item) => (
        <TouchableOpacity
          key={item.date}
          onPress={() => setSelectedDate(item.date)}
          style={[
            styles.dateButton,
            selectedDate === item.date && styles.selectedDateButton,
          ]}
        >
          <Text style={styles.dateText}>{item.date}</Text>
          <Text
            style={[
              styles.dayText,
              selectedDate === item.date && { color: "white" },
            ]}
          >
            {item.day}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    margin: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: "#042558",
  },
  dateButton: {
    width: 53,
    height: 60,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#042558",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedDateButton: {
    borderWidth: 2,
    borderColor: "#042558",
    backgroundColor: "#042558",
  },
  dateText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  dayText: {
    color: "#051F48",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
});
