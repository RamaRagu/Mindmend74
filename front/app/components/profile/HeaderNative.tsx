import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";

interface HeaderNativeProps {
  title: string;
  onBack?: () => void;
}

export const HeaderNative: React.FC<HeaderNativeProps> = ({ title, onBack }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={onBack}
        style={styles.backButton}
        activeOpacity={0.7}
        accessibilityLabel="Go back"
      >
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
            fill="#042558"
          />
        </Svg>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 20,
  },
  backButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#042558",
    fontSize: 32,
    fontWeight: "bold",
  },
});