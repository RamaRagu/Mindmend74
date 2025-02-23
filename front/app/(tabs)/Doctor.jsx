import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Header } from "../components/layout/Header";
import { SearchBar } from "../components/doctor/SearchBar";
import { DoctorCard } from "../components/doctor/DoctorCard";

const Doctor = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Header />

        <View style={styles.searchSection}>
          <SearchBar />
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.sectionTitle}>Services</Text>

          <Text style={[styles.sectionTitle, styles.doctorsTitle]}>
            Top Doctors
          </Text>

          <View style={styles.doctorsList}>
            <DoctorCard
              name="Dr. R.David"
              image="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/8d3024ca7b76ad6910deaa9a03eddb1cd5b8a4cb705b93bba93908091729547f"
              rating={4.5}
              time="10:30 AM-3:30"
              role="Senior Surgeon"
              fee="$12"
            />

            <DoctorCard
              name="Dr. Alina Fatima"
              image="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/df337b2abae983c2b323db78d5f8a734a1ac676a68a6b9c2b1a9102fe5fa8b63"
              rating={4.5}
              time="10:30 AM-3:30"
            />

            <DoctorCard
              name="Dr. Alina Fatima"
              image="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/df337b2abae983c2b323db78d5f8a734a1ac676a68a6b9c2b1a9102fe5fa8b63"
              rating={4.5}
              time="10:30 AM-3:30"
            />

            <DoctorCard
              name="Dr. Alina Fatima"
              image="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/df337b2abae983c2b323db78d5f8a734a1ac676a68a6b9c2b1a9102fe5fa8b63"
              rating={4.5}
              time="10:30 AM-3:30"
              expanded={true}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  content: {
    maxWidth: 480,
    alignItems: "center",
  },
  searchSection: {
    width: "100%",
    paddingTop: 16,
    paddingHorizontal: 23,
  },
  mainContent: {
    width: "100%",
    marginTop: 17,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#042558",
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 21,
  },
  doctorsTitle: {
    color: "#1E1F2E",
    marginLeft: 15,
    marginTop: 143,
  },
  doctorsList: {
    gap: 16,
    marginTop: 44,
  },
  dotsContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  dots: {
    width: 9,
    height: 11,
    aspectRatio: 0.82,
  },
});

export default Doctor;