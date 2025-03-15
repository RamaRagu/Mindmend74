
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Svg, Path, Rect } from "react-native-svg";

export const StatusBarNative = () => {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  return (
    <View style={styles.header}>
      <Text style={styles.time}>{currentTime}</Text>
      <View style={styles.iconsContainer}>
        <View style={styles.iconWrapper}>
          <Svg width={18} height={12} viewBox="0 0 18 12" fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 0H2C0.9 0 0 0.9 0 2V10C0 11.1 0.9 12 2 12H16C17.1 12 18 11.1 18 10V2C18 0.9 17.1 0 16 0ZM3 9.5H1V8H3V9.5ZM6 9.5H4V8H6V9.5ZM9 9.5H7V8H9V9.5ZM12 9.5H10V8H12V9.5ZM15 9.5H13V8H15V9.5Z"
              fill="black"
            />
          </Svg>
        </View>
        <View style={styles.iconWrapper}>
          <Svg width={16} height={12} viewBox="0 0 16 12" fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 2.19L10.33 4.52C10.72 4.91 11.35 4.91 11.74 4.52C12.13 4.13 12.13 3.5 11.74 3.11L7.71 -0.92C7.32 -1.31 6.69 -1.31 6.3 -0.92L2.27 3.11C1.88 3.5 1.88 4.13 2.27 4.52C2.66 4.91 3.29 4.91 3.68 4.52L6 2.19V7C6 7.55 6.45 8 7 8C7.55 8 8 7.55 8 7V2.19ZM15 10C15.55 10 16 10.45 16 11C16 11.55 15.55 12 15 12H1C0.45 12 0 11.55 0 11C0 10.45 0.45 10 1 10H15Z"
              fill="black"
            />
          </Svg>
        </View>
        <View style={styles.iconWrapper}>
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
              fill="black"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
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