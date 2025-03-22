import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { Header } from "../components/activity/Header.native";
// import { SearchBar } from "../components/activity/SearchBar.native";
import { ActivityGrid } from "../components/activity/ActivityGrid.native";
import { ActivityCard } from "../components/activity/ActivityCard.native";

const Index = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/bg4.jpeg")} // Ensure this path is correct
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header />
          <ActivityGrid />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 37, 93, 0.7)",
  },
  container: {
    flex: 1,
    maxWidth: 480,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    paddingTop: 0,
  },
  gameCard: {
    marginTop: 30,
  },
  bottomCard: {
    width: 180,
    height: 180,
    borderRadius: 15,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 5,
    marginLeft: -12,
  },
});

export default Index;
