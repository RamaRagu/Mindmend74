import React, { FC } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface ProfileSectionProps {
  username: string;
  avatarUrl: string;
  onViewProfile: () => void;
}

const ProfileSection: FC<ProfileSectionProps> = ({
  username,
  avatarUrl,
  onViewProfile,
}) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: avatarUrl }}
          style={styles.avatar}
        />
        <Text style={styles.greeting}>Thenusha...!</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{username}</Text>
          <TouchableOpacity onPress={onViewProfile}>
            <Text style={[styles.viewProfile, styles.viewProfileMargin]}>View profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 26,
  },
  greeting: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 20, // Adjust the spacing between the image and the text
    marginTop: -280,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 10,
    paddingHorizontal: 23,
  },
  avatar: {
    width: 82,
    height: 78,
    borderRadius: 368,
  },
  profileInfo: {
    flexDirection: 'column',
  },
  username: {
    color: '#042558',
    fontSize: 24,
    fontWeight: 'bold',
  },
  viewProfile: {
    color: '#042558',
    fontSize: 18,
    marginTop: -190,
  },
  viewProfileMargin: {
    marginLeft: 108, // Adjust this value to move the text to the right
  }
});

export default ProfileSection;