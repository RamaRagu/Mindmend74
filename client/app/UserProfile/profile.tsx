import React from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { HeaderNative } from "../components/profile/HeaderNative";
import { ProfileSectionNative } from "../components/profile/ProfileSectionNative";
import {
  FormSectionNative,
  FormFieldNative,
} from "../components/profile/FormSectionNative";
import { InputNative } from "../components/ui/InputNative";
import { SelectNative } from "../components/ui/SelectNative";
import { ButtonNative } from "../components/ui/ButtonNative";
import { useRouter } from "expo-router";

type ProfileFormData = {
  fullname: string;
  dateOfBirth: string;
  gender: string;
  mobileNumber: string;
  email: string;
  weight: number;
  height: number;
  age: number;
  ethnicity: string;
  hasJaundice: string;
  hasFamilyAutism: string;
  country: string;
  usedAppBefore: string;
  relation: string;
  hasFamilyHistory: string;
  screeningScore: number;
  result: string;
};

const ethnicityOptions = [
  { label: "White", value: "0" },
  { label: "Black", value: "1" },
  { label: "Asian", value: "2" },
  { label: "Hispanic", value: "3" },
  { label: "Other", value: "4" },
];

const countryOptions = [
  { label: "USA", value: "0" },
  { label: "UK", value: "1" },
  { label: "Australia", value: "2" },
  { label: "Canada", value: "3" },
  { label: "Other", value: "4" },
];

const relationOptions = [
  { label: "Self", value: "0" },
  { label: "Parent", value: "1" },
  { label: "Healthcare professional", value: "2" },
  { label: "Relative", value: "3" },
  { label: "Other", value: "4" },
];

const yesNoOptions = [
  { label: "No", value: "0" },
  { label: "Yes", value: "1" },
];

const ProfileNative = () => {
  const router = useRouter();

  const [formData, setFormData] = React.useState<ProfileFormData>({
    fullname: "",
    dateOfBirth: "",
    gender: "Male",
    mobileNumber: "",
    email: "",
    weight: 0,
    height: 0,
    age: 0,
    ethnicity: "2",
    hasJaundice: "0",
    hasFamilyAutism: "0",
    country: "1",
    usedAppBefore: "0",
    relation: "2",
    hasFamilyHistory: "0",
    screeningScore: 2,
    result: "0",
  });

  const handleInputChange =
    (field: keyof ProfileFormData) => (value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const validateForm = () => {
    // Basic validation
    if (!formData.fullname.trim()) {
      Alert.alert("Error", "Please enter your full name");
      console.log("Error", "Please enter your full name");
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      console.log("Error", "Please enter a valid email address")
      return false;
    }
    if (!formData.mobileNumber.trim()) {
      Alert.alert("Error", "Please enter your mobile number");
      console.log("Error", "Please enter your mobile number")
      return false;
    }
    if (formData.age <= 0) {
      Alert.alert("Error", "Please enter a valid age");
      console.log("Error", "Please enter a valid age")
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form data:", formData);
      fetch("https://glorious-carnival-pj77qgpj7j752rwj-3000.app.github.dev/api/parent/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
        throw new Error("Failed to save parent profile data");
          }
          return response.json();
        })
        .then((parentData) => {
          console.log("Parent data saved:", parentData);
          
          // Now save child data with the parent's ID
          return fetch("https://glorious-carnival-pj77qgpj7j752rwj-3000.app.github.dev/api/child/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          parentId: parentData.id 
        }),
          });
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save profile data");
          }
          return response.json();
        })
        .then((data) => {
          Alert.alert("Success", "Profile data saved successfully");
          console.log("Response data:", data);
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
          console.error("Error:", error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderNative title="My Profile" onBack={() => router.push("/(tabs)")} />
      <ProfileSectionNative imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/873a0cbd1acbb21191bcb437ba32d933ac38921b" />

      <ScrollView style={styles.formContainer}>
        <FormSectionNative title="Basic Detail">
          <FormFieldNative label="Fullname">
            <InputNative
              placeholder="Enter your fullname"
              value={formData.fullname}
              onChangeText={handleInputChange("fullname")}
            />
          </FormFieldNative>
          <FormFieldNative label="Date of Birth">
            <InputNative
              placeholder="YYYY-MM-DD"
              value={formData.dateOfBirth}
              onChangeText={handleInputChange("dateOfBirth")}
            />
          </FormFieldNative>
          <FormFieldNative label="Age">
            <InputNative
              placeholder="Enter your age"
              keyboardType="numeric"
              value={formData.age.toString()}
              onChangeText={(text) => {
                const age = parseInt(text) || 0;
                handleInputChange("age")(age.toString());
              }}
            />
          </FormFieldNative>
          <FormFieldNative label="Gender">
            <SelectNative
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
              ]}
              defaultValue={formData.gender}
              onValueChange={handleInputChange("gender")}
            />
          </FormFieldNative>
          <FormFieldNative label="Ethnicity">
            <SelectNative
              options={ethnicityOptions}
              defaultValue={formData.ethnicity}
              onValueChange={handleInputChange("ethnicity")}
            />
          </FormFieldNative>
        </FormSectionNative>

        <FormSectionNative title="Contact Detail">
          <FormFieldNative label="Mobile number">
            <InputNative
              placeholder="Enter your mobile number"
              keyboardType="phone-pad"
              value={formData.mobileNumber}
              onChangeText={handleInputChange("mobileNumber")}
            />
          </FormFieldNative>
          <FormFieldNative label="Email">
            <InputNative
              placeholder="Enter your email"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={handleInputChange("email")}
            />
          </FormFieldNative>
          <FormFieldNative label="Country">
            <SelectNative
              options={countryOptions}
              defaultValue={formData.country}
              onValueChange={handleInputChange("country")}
            />
          </FormFieldNative>
        </FormSectionNative>

        <FormSectionNative title="Personal Detail">
          <FormFieldNative label="Weight (Kg)">
            <InputNative
              keyboardType="numeric"
              value={formData.weight.toString()}
              onChangeText={(text) => {
                const weight = parseFloat(text) || 0;
                handleInputChange("weight")(weight.toString());
              }}
            />
          </FormFieldNative>
          <FormFieldNative label="Height (cm)">
            <InputNative
              keyboardType="numeric"
              value={formData.height.toString()}
              onChangeText={(text) => {
                const height = parseFloat(text) || 0;
                handleInputChange("height")(height.toString());
              }}
            />
          </FormFieldNative>
        </FormSectionNative>

        <FormSectionNative title="Medical History">
          <FormFieldNative label="Born with jaundice?">
            <SelectNative
              options={yesNoOptions}
              defaultValue={formData.hasJaundice}
              onValueChange={handleInputChange("hasJaundice")}
            />
          </FormFieldNative>
          <FormFieldNative label="Family member with autism?">
            <SelectNative
              options={yesNoOptions}
              defaultValue={formData.hasFamilyAutism}
              onValueChange={handleInputChange("hasFamilyAutism")}
            />
          </FormFieldNative>
          <FormFieldNative label="Family history of disorders?">
            <SelectNative
              options={yesNoOptions}
              defaultValue={formData.hasFamilyHistory}
              onValueChange={handleInputChange("hasFamilyHistory")}
            />
          </FormFieldNative>
        </FormSectionNative>

        <FormSectionNative title="App Information">
          <FormFieldNative label="Used app before?">
            <SelectNative
              options={yesNoOptions}
              defaultValue={formData.usedAppBefore}
              onValueChange={handleInputChange("usedAppBefore")}
            />
          </FormFieldNative>
          <FormFieldNative label="Relation to subject">
            <SelectNative
              options={relationOptions}
              defaultValue={formData.relation}
              onValueChange={handleInputChange("relation")}
            />
          </FormFieldNative>
          <FormFieldNative label="Screening score">
            <InputNative
              placeholder="Enter screening score"
              keyboardType="numeric"
              value={formData.screeningScore.toString()}
              onChangeText={(text) => {
                const score = parseInt(text) || 0;
                handleInputChange("screeningScore")(score.toString());
              }}
            />
          </FormFieldNative>
          <FormFieldNative label="Result">
            <SelectNative
              options={[
                { label: "No ASD", value: "0" },
                { label: "ASD", value: "1" },
              ]}
              defaultValue={formData.result}
              onValueChange={handleInputChange("result")}
            />
          </FormFieldNative>
        </FormSectionNative>

        <ButtonNative onPress={handleSubmit}>Save</ButtonNative>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    maxWidth: 440,
    alignSelf: "center",
    width: "100%",
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});

export default ProfileNative;
