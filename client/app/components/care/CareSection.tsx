import React, { FC } from "react";
import { View, StyleSheet } from "react-native"; // Remove ScrollView import
import { CareImage } from "./CareImage";
import { CareHeader } from "./CareHeader";
import { CarePoints } from "./CarePoints";

// ...existing carePoints array...

export const CareSection: FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <CareHeader
                    icon="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/6b194b113fdad599885e59a8f3149878f56a1939?placeholderIfAbsent=true"
                    title="1. Understanding Autism"
                />
                <View style={styles.imageContainer}>
                    <CareImage
                        src="https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/bfd80120255de0ecfe17dd6756f1dba3e62424c5?placeholderIfAbsent=true"
                        alt="Understanding Autism Illustration"
                    />
                </View>
                <CarePoints
                    points={[
                        { text: "Autism is a developmental condition." },
                        { text: "It affects how people communicate and interact." },
                        { text: "Understanding autism helps in providing better care." },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    backgroundColor: "white",
    maxWidth: 480,
    width: "100%",
    flexDirection: "column",
    alignItems: "center", // Centers children horizontally
    justifyContent: "center", // Centers children vertically
    overflow: "hidden",
    paddingBottom: 113,
    alignSelf: "center",
  },
  imageContainer: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  }
});