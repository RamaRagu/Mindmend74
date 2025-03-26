import * as React from "react";
import { View, ScrollView, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { PageHeader } from "../components/ui/page-header.native";
import { TopicCard } from "../components/caregiver/topic-card.native";
import { useRouter } from "expo-router";

// Import images for each topic
// You should place these images in your assets folder
const SUPPORT_TOPICS = [
  { 
    id: 1, 
    title: "Understanding Autism", 
    image: require("../../assets/images/at1.jpeg"),
    route: "/cont/cont1"
  },
  { 
    id: 2, 
    title: "Communication Tips", 
    image: require("../../assets/images/at2.jpeg"),
    route: "/cont/communication-tips"
  },
  { 
    id: 3, 
    title: "Managing Sensory Sensitivities", 
    image: require("../../assets/images/at3.jpeg"),
    route: "/topics/sensory-sensitivities"
  },
  { 
    id: 4, 
    title: "Handling Meltdowns and Anxiety", 
    image: require("../../assets/images/at4.jpeg"),
    route: "/topics/meltdowns-anxiety"
  },
  { 
    id: 5, 
    title: "Encouraging Social Skills", 
    image: require("../../assets/images/at5.jpeg"),
    route: "/topics/social-skills"
  },
  { 
    id: 6, 
    title: "Daily Routines and Structure", 
    image: require("../../assets/images/at5.jpeg"),
    route: "/topics/daily-routines"
  },
  { 
    id: 7, 
    title: "Supporting Learning & Development", 
    image: require("../../assets/images/at7.jpeg"),
    route: "/topics/learning-development"
  },
  { 
    id: 8, 
    title: "Self-Care for Caregivers", 
    image: require("../../assets/images/at8.jpeg"),
    route: "/topics/self-care"
  },
  { 
    id: 9, 
    title: "Finding Professional Support", 
    image: require("../../assets/images/at9.jpeg"),
    route: "/topics/professional-support"
  },
  { 
    id: 10, 
    title: "Encouraging Independence", 
    image: require("../../assets/images/at10.jpeg"),
    route: "/topics/independence"
  },
];

interface IndexProps {
  navigation?: any; // For React Navigation
}

const Index: React.FC<IndexProps> = () => {
  const router = useRouter(); // Add router for navigation

  const handleBack = () => {
    // Navigate back or to a specific route
    router.back();
  };

  const handleTopicClick = (topicId: number) => {
    // Find the topic by ID
    const topic = SUPPORT_TOPICS.find(t => t.id === topicId);
    if (topic && topic.route) {
      // Navigate to the corresponding route
      router.push(topic.route as any);
      console.log(`Navigating to: ${topic.route}`);
    }
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