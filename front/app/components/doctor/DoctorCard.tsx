import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Rating } from "../ui/Rating";


interface DoctorCardProps {
  name: string;
  image: string;
  rating: number;
  time: string;
  role?: string;
  fee?: string;
  expanded?: boolean;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  image,
  rating,
  time,
  role,
  fee,
  expanded = false,
}) => {
  if (expanded) {
    return (
      <View style={styles.expandedContainer}>
        <View style={styles.ratingContainer}>
          <Rating value={rating} />
        </View>
        <View style={styles.doctorInfoExpanded}>
          <Image source={{ uri: image }} style={styles.doctorImage} />
          <Text style={styles.doctorNameExpanded}>{name}</Text>
        </View>
        
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <View style={styles.doctorInfo}>
            <Image source={{ uri: image }} style={styles.doctorImage} />
            <View style={styles.textInfo}>
              <Text style={styles.doctorName}>{name}</Text>
              {role && <Text style={styles.roleText}>{role}</Text>}
              {fee && <Text style={styles.feeText}>Fee: {fee}</Text>}
            </View>
          </View>
        </View>
        <View style={styles.rightSection}>
          <Rating value={rating} />
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/0fafb3744be64bba95337069a4751cd9/8bfd3c76e1a8173680ddcf523011c7ad7f6cc4a721ffce9313be3a803824d9fe",
            }}
            style={styles.actionButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2EAFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 6,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
    padding: 19,
    borderRadius: 20,
  },
  content: {
    flexDirection: "row",
    gap: 20,
  },
  leftSection: {
    width: "70%",
  },
  rightSection: {
    width: "30%",
  },
  doctorInfo: {
    flexDirection: "row",
    gap: 20,
  },
  doctorImage: {
    width: 88,
    height: 88,
    aspectRatio: 1.01,
  },
  textInfo: {
    marginTop: 10,
  },
  doctorName: {
    color: "#042558",
    fontSize: 15,
    fontWeight: "600",
  },
  roleText: {
    color: "#9C9C9C",
    fontSize: 15,
    fontWeight: "300",
    marginTop: 10,
  },
  feeText: {
    color: "#9C9C9C",
    fontSize: 15,
    fontWeight: "400",
    marginTop: 7,
  },
  actionButton: {
    width: 36,
    height: 36,
    aspectRatio: 1,
    marginTop: 43,
  },
  expandedContainer: {
    backgroundColor: "#E2EAFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 6,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
    borderRadius: 20,
    paddingTop: 12,
  },
  ratingContainer: {
    alignSelf: "flex-end",
    marginRight: 70,
  },
  doctorInfoExpanded: {
    flexDirection: "row",
    alignItems: "center",
    gap: 21,
    marginLeft: 19,
  },
  doctorNameExpanded: {
    fontSize: 15,
    color: "#042558",
    fontWeight: "600",
  },
  bottomSection: {
    backgroundColor: "#042558",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 42,
    paddingBottom: 16,
    marginTop: 10,
  },
  iconContainer: {
    width: 30,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    padding: 6,
  },
  backgroundIcon: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  foregroundIcon: {
    width: "100%",
    aspectRatio: 1.15,
    zIndex: 1,
  },
  actionSection: {
    flexDirection: "row",
    gap: 26,
    marginTop: -12,
  },
  timeSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 33,
  },
  timeIcon: {
    width: 34,
    height: 34,
    aspectRatio: 1,
  },
  actionIcons: {
    flexDirection: "row",
    gap: 3,
    marginTop: 34,
  },
  actionIcon: {
    width: 32,
    height: 32,
    aspectRatio: 1,
  },
  smallActionIcon: {
    width: 18,
    height: 19,
    aspectRatio: 0.95,
  },
  doctorLabel: {
    alignItems: "center",
  },
  doctorIcon: {
    width: 34,
    height: 34,
    aspectRatio: 1,
  },
  doctorText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 22,
  },
});