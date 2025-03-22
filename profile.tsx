import React, { useRef } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Button, TextInput } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { HeaderNative } from "../components/profile/HeaderNative";
import { ProfileSectionNative } from "../components/profile/ProfileSectionNative";
import { FormSectionNative, FormFieldNative } from "../components/profile/FormSectionNative";
import InputNative from "../components/ui/InputNative";
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
        imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/eb455c48e2cf6e2d2c5090ab15c59424a2046c0e",
    });

    const [editableField, setEditableField] = React.useState<string | null>(null);

    const fullnameRef = useRef<TextInput>(null);
    const dateOfBirthRef = useRef<TextInput>(null);
    const mobileNumberRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const weightRef = useRef<TextInput>(null);
    const heightRef = useRef<TextInput>(null);

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

    const handleEdit = (field: string, ref: React.RefObject<TextInput>) => {
        setEditableField(field);
        setTimeout(() => {
            ref.current?.focus();
        }, 100);
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
                                ref={fullnameRef}
                                value={formData.fullname}
                                onChangeText={handleInputChange("fullname")}
                                editable={editableField === "fullname"}
                            />
                            <View style={{ marginLeft: 350, marginTop: -35 }}>
                                <Button title="Edit" onPress={() => handleEdit("fullname", fullnameRef)} color={styles.buttonText.color} />
                            </View>
                        </View>
                    </FormFieldNative>
                    <FormFieldNative label="Date of Birth">
                        <View style={{ width: 400 }}>
                            <InputNative
                                ref={dateOfBirthRef}
                                value={formData.dateOfBirth}
                                onChangeText={handleInputChange("dateOfBirth")}
                                editable={editableField === "dateOfBirth"}
                            />
                            <View style={{ marginLeft: 350, marginTop: -35 }}>
                                <Button title="Edit" onPress={() => handleEdit("dateOfBirth", dateOfBirthRef)} color={styles.buttonText.color} />
                            </View>
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
                                ref={mobileNumberRef}
                                keyboardType="phone-pad"
                                value={formData.mobileNumber}
                                onChangeText={handleInputChange("mobileNumber")}
                                editable={editableField === "mobileNumber"}
                            />
                            <View style={{ marginLeft: 350, marginTop: -35 }}>
                                <Button title="Edit" onPress={() => handleEdit("mobileNumber", mobileNumberRef)} color={styles.buttonText.color} />
                            </View>
                        </View>
                    </FormFieldNative>
                    <FormFieldNative label="Email">
                        <View style={{ width: 400 }}>
                            <InputNative
                                ref={emailRef}
                                keyboardType="email-address"
                                value={formData.email}
                                onChangeText={handleInputChange("email")}
                                editable={editableField === "email"}
                            />
                            <View style={{ marginLeft: 350, marginTop: -35 }}>
                                <Button title="Edit" onPress={() => handleEdit("email", emailRef)} color={styles.buttonText.color} />
                            </View>
                        </View>
                    </FormFieldNative>
                </FormSectionNative>

                <FormSectionNative title="Personal Detail">
                    <FormFieldNative label="Weight (Kg)">
                        <View style={{ width: 400 }}>
                            <InputNative
                                ref={weightRef}
                                keyboardType="numeric"
                                value={formData.weight.toString()}
                                onChangeText={(text) => {
                                    const weight = parseFloat(text) || 0;
                                    handleInputChange("weight")(weight.toString());
                                }}
                                editable={editableField === "weight"}
                            />
                            <View style={{ marginLeft: 350, marginTop: -35 }}>
                                <Button title="Edit" onPress={() => handleEdit("weight", weightRef)} color={styles.buttonText.color} />
                            </View>
                        </View>
                    </FormFieldNative>
                    <FormFieldNative label="Height (cm)">
                        <View style={{ width: 400 }}>
                            <InputNative
                                ref={heightRef}
                                keyboardType="numeric"
                                value={formData.height.toString()}
                                onChangeText={(text) => {
                                    const height = parseFloat(text) || 0;
                                    handleInputChange("height")(height.toString());
                                }}
                                editable={editableField === "height"}
                            />
                            <View style={{ marginLeft: 350, marginTop: -35 }}>
                                <Button title="Edit" onPress={() => handleEdit("height", heightRef)} color={styles.buttonText.color} />
                            </View>
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