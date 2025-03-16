import React from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";

export const Navigation: React.FC = () => {
  return (
    <View style={styles.nav}>
      <View style={styles.homeContainer}>
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/554a5c39265e5277389328de1be2569c75ed57c6649497208780e6f0fea795f7" }}
          style={styles.homeIcon}
        />
        <Text style={styles.text}>Home</Text>
      </View>
      <TouchableOpacity>
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/99d2d1c2e90b64a22cdeb1cf6d89aa42e609939c62ad6fb348069e75c7763af8" }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/81e1111fd3c8076cf2806d1fb2cade23908bc1882bfa8811487ebd27d151a879" }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/b373e710440285e2e09ee0221651c7301430342a3bda4b5c9f61b8d55b9f2941" }}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    backgroundColor: "#042558",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 42,
    paddingBottom: 12,
    gap: 47,
  },
  homeContainer: {
    marginTop: -7,
    flex: 1,
    alignItems: "center",
  },
  homeIcon: {
    width: 31,
    height: 27,
  },
  icon: {
    width: 34,
    height: 34,
  },
  text: {
    color: "#E2EAFF",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 25,
  },
});