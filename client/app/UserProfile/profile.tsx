import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { StatusBarNative } from "../components/profile/StatusBarNative";
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
};

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
  });

  const handleInputChange =
    (field: keyof ProfileFormData) => (value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSubmit = () => {
    console.log("Form data:", formData);
  };

  return (
    <View style={styles.container}>
      <StatusBarNative />
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
  },
});

export default ProfileNative;
