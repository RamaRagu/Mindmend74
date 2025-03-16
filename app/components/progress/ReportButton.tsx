import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const ReportButton = () => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => console.log("Generating report...")}
    >
      <Text style={styles.buttonText}>Get Report</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(4,37,88,1)',
    width: 157,
    paddingHorizontal: 38,
    paddingVertical: 9,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
