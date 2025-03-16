import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Svg, Rect, Path } from "react-native-svg";

export const StatusBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>9:41</Text>
      <View style={styles.iconContainer}>
        <Svg width={31} height={15} viewBox="0 0 31 15" fill="none">
          <Rect
            opacity={0.35}
            x={0.904957}
            y={0.84734}
            width={25.7672}
            height={12.7629}
            rx={2.28378}
            stroke="#042558"
            strokeWidth={1.05405}
          />
          <Path
            opacity={0.4}
            d="M28.4185 4.79053V9.66711C29.3995 9.2541 30.0375 8.2933 30.0375 7.22882C30.0375 6.16434 29.3995 5.20355 28.4185 4.79053Z"
            fill="#042558"
          />
          <Rect
            x={2.81641}
            y={2.75879}
            width={21.9446}
            height={8.94041}
            rx={1.40541}
            fill="#042558"
          />
        </Svg>
      </View>
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
  time: {
    color: "#051F48",
    fontSize: 20,
    fontWeight: "bold",
    width: 50,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
