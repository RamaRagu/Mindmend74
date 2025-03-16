
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface FormSectionNativeProps {
  title: string;
  children: React.ReactNode;
}

export const FormSectionNative: React.FC<FormSectionNativeProps> = ({
  title,
  children,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

interface FormFieldNativeProps {
  label: string;
  children: React.ReactNode;
}

export const FormFieldNative: React.FC<FormFieldNativeProps> = ({ label, children }) => {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#042558",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    color: "#042558",
    fontSize: 16,
    marginBottom: 10,
  },
});