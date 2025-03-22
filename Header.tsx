import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { UserAvatar } from "./UserAvatar";
import { useRouter } from 'expo-router'; 


export const Header: React.FC = () => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <View style={styles.statusBar}>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => router.push("components/account/AccountSidebar")}>
            <UserAvatar
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb455c48e2cf6e2d2c5090ab15c59424a2046c0e"
            />
          </TouchableOpacity>
          <Text style={styles.greeting}>Hello Thenusha !</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={{ uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/c2e30b8e566b60074faefe2ef49fb5a4efc8004fe18b916a6c1495b2f2ee69d2" }}
            style={styles.notificationIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#042558",
    width: "100%",
    paddingLeft: 26,
    paddingRight: 13,
    paddingTop: 27,
    paddingBottom: 177,
    borderRadius: 20,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 328,
    alignSelf: "center",
    width: "100%",
  },
  time: {
    color: "#E2EAFF",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  icons: {
    flexDirection: "row",
    gap: 9,
    alignItems: "center",
  },
  signalIcon: {
    width: 24,
    height: 14,
  },
  batteryIcon: {
    width: 21,
    height: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: -35,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  greeting: {
    color: "#FFFDFD",
    fontSize: 32,
    fontWeight: "500",
  },
  notificationIcon: {
    width: 34,
    height: 34,
  },
});