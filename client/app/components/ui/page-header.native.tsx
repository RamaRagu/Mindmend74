import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BackButton } from "./back-button.native";

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack }) => {
  return (
    <View style={styles.header}>
      <BackButton onPress={onBack} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: height * 0.18, // Responsive height based on screen height
    minHeight: 100, // Minimum height for very small devices
    maxHeight: 143, // Maximum height for consistency with the design
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05, // Responsive padding
    gap: width * 0.08, // Responsive gap
  },
  title: {
    color: '#042558',
    fontSize: isSmallDevice ? 20 : 24, // Smaller font for small devices
    fontWeight: 'bold',
    flexShrink: 1, // Allow text to shrink if needed
  },
});
