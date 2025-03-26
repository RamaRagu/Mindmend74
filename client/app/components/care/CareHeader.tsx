import React, { FC } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface CareHeaderProps {
  icon: string;
  title: string;
}

export const CareHeader: FC<CareHeaderProps> = ({ icon, title }) => {
  const handlePress = () => {
    console.log("Redirecting to ParentSupport...");
  };

  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: icon }}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} onPress={handlePress}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    width: "100%",
    paddingTop: 69,
    paddingBottom: 14,
    paddingHorizontal: 18,
  },
  container: {
    flexDirection: "row",
    gap: 20,
  },
  iconContainer: {
    width: "15%",
  },
  icon: {
    width: 60,
    height: 60,
  },
  titleContainer: {
    width: "85%",
    marginLeft: 5,
  },
  title: {
    color: "rgba(4,37,88,1)",
    fontSize: 24,
    fontWeight: "600",
    marginTop: 12,
  },
});
