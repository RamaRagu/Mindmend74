import { StyleSheet, Alert, ScrollView, View, TextInput, Text, TouchableOpacity, Platform } from 'react-native';
import { useState, useCallback } from 'react';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Collapsible } from '../../components/survey/Collapsible';
import ParallaxScrollView from '../../components/survey/ParallaxScrollView';
import { ThemedText } from '../../components/survey/ThemedText';
import { ThemedView } from '../../components/survey/ThemedView';
import { IconSymbol } from '../../components/survey/ui/IconSymbol';

// Define survey questions for autism screening
const surveyQuestions = [
  "Does your child look at you when you call his/her name?",
  "How easy is it for you to get eye contact with your child?",
  "Does your child point to indicate that s/he wants something?",
  "Does your child point to share interest with you?",
  "Does your child pretend?",
  "Does your child follow where you're looking?",
  "If you or someone else in the family is visibly upset, does your child show signs of wanting to comfort them?",
  "Would you describe your child's first words as typical?",
  "Does your child use simple gestures?",
  "Does your child stare at nothing with no apparent purpose?"
];
export default function SurveyScreen() {
  const [answers, setAnswers] = useState(Array(surveyQuestions.length).fill(null));
  const [childInfo, setChildInfo] = useState({
    age: '',
    gender: 'f',
    ethnicity: 'White-European',
    jaundice: 'no',
    autism: 'no',
    country: '',
    usedAppBefore: 'no',
    relation: 'Parent'
  });
  const [loading, setLoading] = useState(false);

  type AnswerValue = "Yes" | "No" | null;
  
  // Fetch child details from database on component mount
  useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/child-details', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch child details');
      }
      
      const data = await response.json();
      setChildInfo({
        age: data.age?.toString() || '',
        gender: data.gender || 'f',
        ethnicity: data.ethnicity || 'White-European',
        jaundice: data.jaundice || 'no',
        autism: data.autism || 'no',
        country: data.country || '',
        usedAppBefore: data.usedAppBefore || 'no',
        relation: data.relation || 'Parent'
      });
    } catch (error) {
      console.error("Error fetching child details:", error);
      Alert.alert("Error", "Failed to load saved information. You may need to enter details manually.");
    } finally {
      setLoading(false);
    }
  }, [])();
  
  const handleAnswer = useCallback((index: number, value: AnswerValue): void => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  }, [answers]);

  type ChildInfoField = keyof typeof childInfo;

  interface ChildInfo {
    age: string;
    gender: 'f' | 'm';
    ethnicity: string;
    jaundice: 'yes' | 'no';
    autism: 'yes' | 'no';
    country: string;
    usedAppBefore: 'yes' | 'no';
    relation: string;
  }

  const handleInfoChange = useCallback((field: ChildInfoField, value: string): void => {
    setChildInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async () => {
    // Check if all questions are answered
    if (answers.includes(null)) {
      Alert.alert("Incomplete Survey", "Please answer all questions before submitting.");
      return;
    }

    // Check if required fields are filled
    if (!childInfo.age.trim()) {
      Alert.alert("Missing Information", "Please enter the child's age.");
      return;
    }

    setLoading(true);
    try {
      // Convert answers to numerical features (Yes = 1, No = 0)
      const questionScores = answers.map(answer => answer === "Yes" ? 1 : 0);
      
      // Create the payload with all parameters
      const payload = {
        A1_Score: questionScores[0],
        A2_Score: questionScores[1],
        A3_Score: questionScores[2],
        A4_Score: questionScores[3],
        A5_Score: questionScores[4],
        A6_Score: questionScores[5],
        A7_Score: questionScores[6],
        A8_Score: questionScores[7],
        A9_Score: questionScores[8],
        A10_Score: questionScores[9],
        age: parseFloat(childInfo.age),
        gender: childInfo.gender,
        ethnicity: childInfo.ethnicity,
        jaundice: childInfo.jaundice,
        autism: childInfo.autism,
        contry_of_res: childInfo.country,
        used_app_before: childInfo.usedAppBefore,
        relation: childInfo.relation,
        age_desc: parseFloat(childInfo.age) < 18 ? "Less than 18" : "18 and more"
      };
      // Send data to model API
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      
      // Navigate to results page with prediction
      router.push({
        pathname: "/survey/main",
        params: { result: JSON.stringify(result) }
      }); 
    } catch (error) {
      console.error("Error predicting autism level:", error);
      Alert.alert("Error", "Failed to analyze survey results. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="checkmark.circle.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Autism Screening Survey</ThemedText>
      </ThemedView>
      <ThemedText style={styles.instructions}>
        Please answer the following questions about your child's behavior.
        Your responses will help us evaluate developmental patterns.
      </ThemedText>

      {/* Child Information Section */}
      <Collapsible title="Child Information">
        <View style={styles.infoContainer}>
          <ThemedText style={styles.label}>Child's Age:</ThemedText>
          <TextInput
            style={styles.input}
            value={childInfo.age}
            onChangeText={(value) => handleInfoChange('age', value)}
            keyboardType="numeric"
            placeholder="Enter age in years"
          />

          <ThemedText style={styles.label}>Gender:</ThemedText>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={childInfo.gender}
              onValueChange={(value: string) => handleInfoChange('gender', value)}
              style={styles.picker}
            >
              <Picker.Item label="Female" value="f" />
              <Picker.Item label="Male" value="m" />
            </Picker>
          </View>

          <ThemedText style={styles.label}>Ethnicity:</ThemedText>
          <View style={styles.pickerContainer}>
            <Picker<string>
              selectedValue={childInfo.ethnicity}
              onValueChange={(value: string) => handleInfoChange('ethnicity', value)}
              style={styles.picker}
            >
              <Picker.Item label="White European" value="White-European" />
              <Picker.Item label="Asian" value="Asian" />
              <Picker.Item label="South Asian" value="South Asian" />
              <Picker.Item label="Middle Eastern" value="Middle Eastern" />
              <Picker.Item label="Black" value="Black" />
              <Picker.Item label="Latino" value="Latino" />
              <Picker.Item label="Hispanic" value="Hispanic" />
              <Picker.Item label="Pasifika" value="Pasifika" />
              <Picker.Item label="Others" value="Others" />
            </Picker>
          </View>

          <ThemedText style={styles.label}>History of Jaundice:</ThemedText>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={[styles.radioButton, childInfo.jaundice === 'yes' && styles.selectedRadio]}
              onPress={() => handleInfoChange('jaundice', 'yes')}
            >
              <ThemedText>Yes</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, childInfo.jaundice === 'no' && styles.selectedRadio]}
              onPress={() => handleInfoChange('jaundice', 'no')}
            >
              <ThemedText>No</ThemedText>
            </TouchableOpacity>
          </View>

          <ThemedText style={styles.label}>Family Member with Autism:</ThemedText>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={[styles.radioButton, childInfo.autism === 'yes' && styles.selectedRadio]}
              onPress={() => handleInfoChange('autism', 'yes')}
            >
              <ThemedText>Yes</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, childInfo.autism === 'no' && styles.selectedRadio]}
              onPress={() => handleInfoChange('autism', 'no')}
            >
              <ThemedText>No</ThemedText>
            </TouchableOpacity>
          </View>

          <ThemedText style={styles.label}>Country:</ThemedText>
          <TextInput
            style={styles.input}
            value={childInfo.country}
            onChangeText={(value) => handleInfoChange('country', value)}
            placeholder="Enter country of residence"
          />

          <ThemedText style={styles.label}>Relationship to Child:</ThemedText>
          <View style={styles.pickerContainer}>
            <Picker<string>
              selectedValue={childInfo.relation}
              onValueChange={(value: string) => handleInfoChange('relation', value)}
              style={styles.picker}
            >
              <Picker.Item label="Parent" value="Parent" />
              <Picker.Item label="Self" value="Self" />
              <Picker.Item label="Relative" value="Relative" />
              <Picker.Item label="Health care professional" value="Health care professional" />
              <Picker.Item label="Others" value="Others" />
            </Picker>
          </View>
        </View>
      </Collapsible>

      {/* Survey Questions */}
      {surveyQuestions.map((question, index) => (
        <Collapsible 
          key={index} 
          title={`Question ${index + 1}`}
        >
          <ThemedText style={styles.questionText}>{question}</ThemedText>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.answerButton, 
                answers[index] === "Yes" && styles.selectedButton
              ]}
              onPress={() => handleAnswer(index, "Yes")}
            >
              <ThemedText style={styles.buttonText}>Yes</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.answerButton, 
                answers[index] === "No" && styles.selectedButton
              ]}
              onPress={() => handleAnswer(index, "No")}
            >
              <ThemedText style={styles.buttonText}>No</ThemedText>
            </TouchableOpacity>
          </View>
        </Collapsible>
      ))}

      <TouchableOpacity 
        style={[styles.submitButton, loading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <ThemedText style={styles.submitButtonText}>
          {loading ? "Processing..." : "Submit Survey"}
        </ThemedText>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  instructions: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 22,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 40,
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  radioButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: '#4a7dff',
  },
  questionText: {
    fontSize: 16,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  answerButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    margin: 5,
  },
  selectedButton: {
    backgroundColor: '#4a7dff',
  },
  buttonText: {
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#4a7dff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: '#a0a0a0',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
