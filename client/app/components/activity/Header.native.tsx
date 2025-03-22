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
            uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/869020650292f3f1f3b851b8f012f660c94dadf0ffa1aa53052345ec5dfa0b00",
          }}
          style={styles.icon1}
        />
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/bdda6abdda828100bf61cada2d859255834c874c6c717e8580247ffee898c83b",
          }}
          style={styles.icon2}
        />
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/ff95fb0e65f345733bb1399dae0db0e4aba6d4d66c4980bb028da28f58c55dc3",
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
