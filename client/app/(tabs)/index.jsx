import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from 'expo-router'; // Import useRouter hook
import { Header } from "../components/home/Header";
import { ActionCard } from "../components/home/ActionCard";
import { ActivityGrid } from "../components/home/ActivityGrid";

// Import the local images
import formImage from "../../assets/images/form.png";
import chatImage from "../../assets/images/chatb.png"; // Import the new image

const Index = () => {
  const router = useRouter(); // Initialize router

  return (
    <View style={styles.container}>
      <Header style={styles.header} />
      
      <View style={styles.content}>
        <View style={styles.actionSection}>
          <ActionCard
            onPress={() => router.push('survey/home')} // Correct the navigation path
            title="Fill the 
            Form to 
            identify 
            the level"
            imageSource={formImage}
            style={styles.formCard}
            imageStyle={styles.formImage}
            titleStyle={styles.formCardTitle}
          />
          {/* <ActionCard
            onPress={() => router.push('UserProfile/profile')} // Correct the navigation path
            title="View Your 
            Profile"
            imageSource={formImage}
            style={styles.formCard}
            imageStyle={styles.formImage}
            titleStyle={styles.formCardTitle}
          /> */}
          <ActionCard
            onPress={() => router.push('chatbot/chatg')} // Correct the navigation path
            title={"Chat\nWith\nme"}
            imageSource={chatImage}
            style={styles.chatCard}
            imageStyle={styles.chatImage}
            titleStyle={styles.chatCardTitle}
          />
        </View>

        <View style={styles.activitySection}>
          <ActivityGrid />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2EAFF",
    maxWidth: 450,
    width: "100%",
    alignSelf: "center",
  },
  header: {
    backgroundColor: "#042558",
    width: "100%",
    paddingLeft: 26,
    paddingRight: 13,
    paddingTop: 2,
    paddingBottom: 1,
    borderRadius: 30,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 5,
    marginTop: -80, // Adjust this value to position the content correctly
  },
  actionSection: {
    flexDirection: "column",
    gap: 15,
    alignItems: "center",
  },
  formCard: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 70,
  },
  formImage: {
    width: 200,
    height: 200,
    marginLeft: -70,
  },
  formCardTitle: {
    fontSize: 30,
    color: "#042558",
    marginLeft: 0,
  },
  chatCard: {
    paddingHorizontal: 56,
    paddingVertical: 10,
  },
  chatImage: {
    width: 150,
    height: 150,
    marginLeft: 100,
  },
  chatCardTitle: {
    fontSize: 30,
    color: "#042558",
    marginLeft: -280,
  },
  activitySection: {
    marginTop: 15,
  },
  navigationContainer: {
    marginTop: 45,
    width: "100%",
  },
});

export default Index;
