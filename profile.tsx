import React from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Button, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { HeaderNative } from "../components/profile/HeaderNative";
import { ProfileSectionNative } from "../components/profile/ProfileSectionNative";
import { FormSectionNative, FormFieldNative } from "../components/profile/FormSectionNative";
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
    imageUrl: string;
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
        imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/873a0cbd1acbb21191bcb437ba32d933ac38921b",
    });

    const handleInputChange = (field: keyof ProfileFormData) => (value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFormData((prev) => ({
                ...prev,
                imageUrl: result.assets[0].uri,
            }));
        }
    };

    const handleSubmit = () => {
        console.log("Form data:", formData);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.fixedHeader}>
                <HeaderNative title="My Profile" onBack={() => router.push("/(tabs)")} />
            </View>
            <ScrollView style={styles.scrollContainer}>
                <ProfileSectionNative imageUrl={formData.imageUrl} />
                <Button title="Edit" onPress={handleImagePick} color={styles.buttonText.color} />
                <FormSectionNative title="Basic Detail">
                    <FormFieldNative label="Fullname">
                    <View style={{ width: 400 }}>
                        <InputNative
                            placeholder="Enter Your Name"
                            value={formData.fullname}
                            onChangeText={handleInputChange("fullname")}
                            
                        
                        />
                    </View>    
                    </FormFieldNative>
                    <FormFieldNative label="Date of Birth">
                    <View style={{ width: 400 }}>
                        <InputNative
                            placeholder="YYYY-MM-DD"
                            value={formData.dateOfBirth}
                            onChangeText={handleInputChange("dateOfBirth")}
                        />
                    </View>     
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
                    <View style={{ width: 400 }}>
                        <InputNative
                            keyboardType="phone-pad"
                            value={formData.mobileNumber}
                            onChangeText={handleInputChange("mobileNumber")}
                        />
                     </View>      
                    </FormFieldNative>
                    <FormFieldNative label="Email">
                    <View style={{ width: 400 }}>
                        <InputNative
                            keyboardType="email-address"
                            value={formData.email}
                            onChangeText={handleInputChange("email")}
                        />
                     </View>      
                    </FormFieldNative>
                </FormSectionNative>

                <FormSectionNative title="Personal Detail">
                    <FormFieldNative label="Weight (Kg)">
                    <View style={{ width: 400 }}>
                        <InputNative
                            keyboardType="numeric"
                            value={formData.weight.toString()}
                            onChangeText={(text) => {
                                const weight = parseFloat(text) || 0;
                                handleInputChange("weight")(weight.toString());
                            }}
                        />
                     </View>      
                    </FormFieldNative>
                    <FormFieldNative label="Height (cm)">
                    <View style={{ width: 400 }}>
                        <InputNative
                            keyboardType="numeric"
                            value={formData.height.toString()}
                            onChangeText={(text) => {
                                const height = parseFloat(text) || 0;
                                handleInputChange("height")(height.toString());
                            }}
                        />
                     </View>      
                    </FormFieldNative>
                </FormSectionNative>

                <ButtonNative onPress={handleSubmit}>
                    Save
                </ButtonNative>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        maxWidth: 450,
        alignSelf: "center",
        width: "100%",
        marginLeft: 20, 
    },
    fixedHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 40 : 20, 
        
    },
    scrollContainer: {
        flex: 1,
        marginTop: 150, 
    },
    formContainer: {
        paddingHorizontal: 20,
        
    },
    buttonText: {
        color: "#000000", 
        
    },
    
});

export default ProfileNative;