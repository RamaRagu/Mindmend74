import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Image style={styles.statusIcon} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Activities</Text>
      </View>
      <View style={styles.iconsContainer}>
        <Image
          source={{
            uri: "",
          }}
          style={styles.icon1}
        />
        <Image
          source={{
            uri: "",
          }}
          style={styles.icon2}
        />
        <Image
          source={{
            uri: "",
          }}
          style={styles.icon3}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 383,
    justifyContent: "space-between",
  },
  timeContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  timeText: {
    fontSize: 20,
    color: "rgba(4,37,88,1)",
    fontWeight: "500",
    marginLeft: 11,
  },
  statusIcon: {
    width: 26,
    height: 28,
    marginTop: 19,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: 5,
  },
  plusSign: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgba(4,37,88,1)",
    alignSelf: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "rgb(255, 255, 255)",
    marginTop: 0,
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 65,
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 9,
    marginTop: 4,
  },
  icon1: {
    width: 24,
    height: 15,
  },
  icon2: {
    width: 21,
    height: 15,
  },
  icon3: {
    width: 34,
    height: 34,
    marginTop: 36,
  },
});
