import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const Question = ({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
  onSubmit,
  isLastQuestion,
  onPreviousQuestion,
  onNextQuestion,
}) => {
  const progressBars = Array(totalQuestions).fill(0);
  const handlePreviousQuestion = () => {
    if (questionNumber > 1) {
      onPreviousQuestion();
    }
  };

  const handleNextQuestion = () => {
    if (questionNumber < totalQuestions) {
      onNextQuestion();
    }
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity>
            <Text style={styles.backButton}>{'<'}</Text>
          </TouchableOpacity> */}
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            Social Interaction & Communication
          </Text>
          <View style={styles.questionCounter}>
            <TouchableOpacity
              style={[
                styles.arrowButton,
                questionNumber === 1 && styles.arrowButtonDisabled,
              ]}
              onPress={handlePreviousQuestion}
              disabled={questionNumber === 1}
            >
              <Text
                style={[
                  styles.arrowText,
                  questionNumber === 1 && styles.arrowTextDisabled,
                ]}
              >
                {"<"}
              </Text>
            </TouchableOpacity>
            <View style={styles.numberContainer}>
              <Text style={styles.currentNumber}>
                {String(questionNumber).padStart(2, "0")}
              </Text>
              <Text style={styles.separator}> / </Text>
              <Text style={styles.totalNumber}>
                {String(totalQuestions).padStart(2, "0")}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.arrowButton,
                questionNumber === totalQuestions && styles.arrowButtonDisabled,
              ]}
              onPress={handleNextQuestion}
              disabled={questionNumber === totalQuestions}
            >
              <Text
                style={[
                  styles.arrowText,
                  questionNumber === totalQuestions && styles.arrowTextDisabled,
                ]}
              >
                {">"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.progressContainer}>
          {progressBars.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressBar,
                {
                  backgroundColor:
                    index < questionNumber ? "#374278" : "#E5E5E5",
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Question */}
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.SubmitButtonContainer}>
        {isLastQuestion && (
          <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => onAnswer("Yes")}
        >
          <Text style={styles.optionText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => onAnswer("No")}
        >
          <Text style={styles.optionText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    gap: 30,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#E5E5E5',
    // backgroundColor: '#fff',
  },
  backButton: {
    fontSize: 18,
    color: "#000",
    marginBottom: 10,
  },
  headerCenter: {
    alignItems: "center",
    marginBottom: 15,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    marginTop: 10,
    marginBottom: 1,
  },
  progressBar: {
    height: 4,
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374278",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    paddingBottom: 8,
  },
  questionCounter: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  arrowButton: {
    paddingLeft: 100,
    paddingRight: 100,
  },
  arrowText: {
    fontSize: 16,
    color: "#000",
  },
  numberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  currentNumber: {
    fontSize: 16,
    color: "#1a237e", // or any color you want for current number
    fontWeight: "600",
  },
  separator: {
    fontSize: 16,
    color: "#000",
  },
  totalNumber: {
    fontSize: 16,
    color: "#666", // or any color you want for total number
  },
  SubmitButtonContainer: {
    marginTop: -100,
    paddingLeft: 50,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 150,
    marginBottom: 300,
    paddingHorizontal: 20,
    color: "#374278",
  },
  optionsContainer: {
    paddingHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#374278",
    gap: 15,
  },
  optionButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  submitButton: {
    backgroundColor: "#1a237e",
    width: 300,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  arrowButtonDisabled: {
    opacity: 0.5,
  },
  arrowTextDisabled: {
    color: "#999",
  },
});

export default Question;
