import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";

export const SearchBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/9350dca220bb797d3af926bf254222ca6b84c74a9e4eb7e6258a59c945e75430",
        }}
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
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 23,
    padding: 19,
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
