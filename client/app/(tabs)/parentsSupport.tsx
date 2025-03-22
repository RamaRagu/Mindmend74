import * as React from "react";
import { View, ScrollView, StyleSheet, SafeAreaView, Dimensions, Text } from "react-native";
import { PageHeader } from "../components/ui/page-header.native";
import { TopicCard } from "../components/caregiver/topic-card.native";

// Import images for each topic
// You should place these images in your assets folder
const SUPPORT_TOPICS = [
  { 
    id: 1, 
    title: "Understanding Autism", 
    image: require("../../assets/images/at1.jpeg") 
  },
  { 
    id: 2, 
    title: "Communication Tips", 
    image: require("../../assets/images/at2.jpeg") 
  },
  { 
    id: 3, 
    title: "Managing Sensory Sensitivities", 
    image: require("../../assets/images/at3.jpeg") 
  },
  { 
    id: 4, 
    title: "Handling Meltdowns and Anxiety", 
    image: require("../../assets/images/at4.jpeg") 
  },
  { 
    id: 5, 
    title: "Encouraging Social Skills", 
    image: require("../../assets/images/at5.jpeg") 
  },
  { 
    id: 6, 
    title: "Daily Routines and Structure", 
    image: require("../../assets/images/at5.jpeg") 
  },
  { 
    id: 7, 
    title: "Supporting Learning & Development", 
    image: require("../../assets/images/at7.jpeg") 
  },
  { 
    id: 8, 
    title: "Self-Care for Caregivers", 
    image: require("../../assets/images/at8.jpeg") 
  },
  { 
    id: 9, 
    title: "Finding Professional Support", 
    image: require("../../assets/images/at9.jpeg") 
  },
  { 
    id: 10, 
    title: "Encouraging Independence", 
    image: require("../../assets/images/at10.jpeg") 
  },
];

interface IndexProps {
  navigation?: any; // For React Navigation
}

const Index: React.FC<IndexProps> = ({ navigation }) => {
  const handleBack = () => {
    // Navigate back or to a specific route
    navigation?.goBack();
  };

  const handleTopicClick = (topicId: number) => {
    // Navigate to specific topic page
    console.log(`Navigating to topic ${topicId}`);
    // navigation?.navigate('Topic', { topicId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <PageHeader title="Caregiver Support" onBack={handleBack} />
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {SUPPORT_TOPICS.map((topic) => (
            <TopicCard
              key={topic.id}
              number={topic.id}
              title={topic.title}
              image={topic.image}
              onPress={() => handleTopicClick(topic.id)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');
const isLargeDevice = width > 768;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2EAFF',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    maxWidth: isLargeDevice ? 600 : 440, // Wider for tablets
    alignSelf: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: height * 0.04, // Responsive padding
    paddingHorizontal: width * 0.05, // Responsive padding
    gap: height * 0.03, // Responsive gap
  },
});

export default Index;