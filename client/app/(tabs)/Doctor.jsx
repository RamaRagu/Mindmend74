import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "../components/doctor/SearchBar";
import { Header } from "../components/layout/Header";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/doctor");

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await response.json();
        setDoctors(data);
        setFilteredDoctors(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  }, [searchQuery, doctors]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleBookAppointment = (doctor) => {
    navigation.navigate("../DoctorDetails", { doctor }); // Navigate to DoctorDetails with doctor data
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Doctors" />
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Find Your Perfect Doctor</Text>
        <Text style={styles.heroSubtitle}>
          Expert care for your child's needs
        </Text>
      </View>
      <View style={styles.searchSection}>
        <SearchBar
          onChangeText={handleSearch}
          value={searchQuery}
          placeholder="Search doctors by name..."
        />
      </View>
      <View style={styles.mainContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#042558" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : filteredDoctors.length === 0 ? (
          <Text style={styles.notFoundText}>
            No doctors found matching "{searchQuery}"
          </Text>
        ) : (
          <View style={styles.doctorsList}>
            {filteredDoctors.map((doctor, index) => (
              <Pressable
                key={doctor.doctorId || index}
                style={styles.doctorCard}
              >
                <View style={styles.cardContent}>
                  <Image
                    source={{
                      uri: doctor.imageUrl || "https://via.placeholder.com/150",
                    }}
                    style={styles.doctorImage}
                  />
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <Text style={styles.doctorSpecialization}>
                      {doctor.specialization}
                    </Text>
                    <Text style={styles.doctorLicense}>
                      License: {doctor.licenseNumber}
                    </Text>
                    <Pressable
                      style={styles.bookButton}
                      onPress={() => handleBookAppointment(doctor)}
                    >
                      <Text style={styles.bookButtonText}>
                        Book Appointment
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f7ff",
    flex: 1,
  },
  hero: {
    backgroundColor: "#042558",
    padding: 30,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#E2EAFF",
    opacity: 0.8,
  },
  searchSection: {
    width: "100%",
    paddingHorizontal: 23,
    marginTop: -20,
  },
  mainContent: {
    width: "100%",
    marginTop: 17,
    paddingHorizontal: 20,
  },
  doctorsList: {
    gap: 20,
    marginTop: 20,
  },
  doctorCard: {
    backgroundColor: "#E2EAFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#042558",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  doctorInfo: {
    marginLeft: 20,
    flex: 1,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#042558",
    marginBottom: 4,
  },
  doctorSpecialization: {
    fontSize: 16,
    color: "#4A6DB5",
    marginBottom: 4,
  },
  doctorLicense: {
    fontSize: 14,
    color: "#7791C2",
    marginBottom: 12,
  },
  bookButton: {
    backgroundColor: "#042558",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  bookButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  notFoundText: {
    color: "#042558",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Doctor;
