import React, { FC } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import UserIcon from "../icons/UserIcon";

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
      <View style={styles.userIconContainer}>
        <UserIcon />
      </View>
      <Text style={styles.greeting}>Hello ...!</Text>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: avatarUrl }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{username}</Text>
          <TouchableOpacity onPress={onViewProfile}>
            <Text style={styles.viewProfile}>View profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  userIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
    paddingHorizontal: 22,
  },
  greeting: {
    color: 'black',
    fontSize: 28,
    marginTop: 20,
    paddingHorizontal: 26,
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
    fontSize: 16,
  }
});

export default ProfileSection;