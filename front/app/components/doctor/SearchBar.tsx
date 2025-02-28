import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";

// Import the local image
//import searchIcon from "../../../assets/images/search.png";

export const SearchBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        //source={searchIcon}
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#000"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2EAFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 10,
    borderRadius: 10,
  },
  searchIcon: {
    width: 39,
    height: 33,
    aspectRatio: 1.18,
  },
  input: {
    flex: 1,
    fontSize: 12,
    fontWeight: "300",
    color: "#000",
  },
});