import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Header } from "../components/activity/Header.native";
import { SearchBar } from "../components/activity/SearchBar.native";
import { ActivityGrid } from "../components/activity/ActivityGrid.native";
import { ActivityCard } from "../components/activity/ActivityCard.native";


const Index = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      
        <View style={styles.container}>
          <Header />
          <SearchBar />
          <ActivityGrid />
          <ActivityCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/8821cc1171c31e2c0ff485c55751a43df678dc07d0bd9d90505a89bbf102ed7a"
            title="Game"
            style={styles.gameCard}
          />
          
        </View>
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: "white",
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
});

export default Index;