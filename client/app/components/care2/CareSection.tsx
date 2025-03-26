import React, { FC } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { CareHeader } from "./CareHeader";
import { CareImage } from "./CareImage";
import { CarePoints } from "./CarePoints";

const carePoints = [
  {
    text: "Every child with autism is unique, and their needs vary.",
  },
  {
    text: "Autism is not a disease; it's a different way of experiencing the world.",
  },
  {
    text: "Early intervention and consistent support can make a huge difference.",
  },
];

export const CareSection: FC = () => {
  return (
    <ScrollView style={styles.scrollView}>
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
        <CarePoints points={carePoints} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#f5f5f5",
  },
  section: {
    backgroundColor: "white",
    maxWidth: 480,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
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
