import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";

export const ActivityGrid = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <TouchableOpacity onPress={() => console.log("speech therapy Pressed")}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/images/speech.png")} // Replace with your local image path
              style={styles.topImage}
            />
            <Text style={styles.imageTitle1}>Speech Therapy</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("exercise Pressed")}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/images/phy.png")} // Replace with your local image path
              style={styles.bottomImage}
            />
            <Text style={styles.imageTitle2}>Exercise</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rightColumn1}>
        <TouchableOpacity onPress={() => console.log("medication Pressed")}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/images/medi.png")} // Replace with your local image path
              style={styles.bottomCard}
            />
            <Text style={styles.imageTitle3}>Medication</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("games Pressed")}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/images/word.png")} // Replace with your local image path
              style={styles.bottomCard1}
            />
            <Text style={styles.imageTitle4}>Word Game</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("game Pressed")}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/images/game.png")} // Replace with your local image path
              style={styles.centerCard}
            />
            <Text style={styles.imageTitle5}>Game</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 384,
    alignItems: "stretch",
    gap: 70,
    marginTop: -20,
  },
  leftColumn: {
    flex: 1,
    marginTop: 16,
  },
  imageContainer: {
    alignItems: "center",
  },
  topImage: {
    width: 180,
    height: 180,
    borderRadius: 15,
    marginLeft: 50,
    marginTop: -15,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 5,
  },
  bottomImage: {
    width: 180,
    height: 180,
    marginTop: 15,
    borderRadius: 15,
    marginLeft: 50,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 5,
  },
  rightColumn1: {
    flex: 1,
    flexDirection: "column",
    gap: 47,
    marginRight: 35,
  },
  bottomCard: {
    width: 180,
    height: 180,
    borderRadius: 15,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 5,
    marginLeft: 18,
  },
  bottomCard1: {
    width: 180,
    height: 180,
    borderRadius: 15,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 5,
    marginLeft: 18,
    marginTop: -30,
  },
  centerCard: {
    width: 180,
    height: 180,
    borderRadius: 15,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 5,
    marginTop: -40,
    marginLeft: -150,
  },
  imageTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
    textAlign: "center",
  },
  imageTitle1: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 13,
    textAlign: "center",
  },
  imageTitle2: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 40,
    textAlign: "center",
  },
  imageTitle3: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 20,
    textAlign: "center",
  },
  imageTitle4: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 20,
    textAlign: "center",
  },
  imageTitle5: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: -140,
    textAlign: "center",
  },
});
