import React, { FC, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from "react-native";

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
  const [modalVisible, setModalVisible] = useState(false);

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
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={[styles.viewProfile, styles.viewProfileMargin]}>View profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/873a0cbd1acbb21191bcb437ba32d933ac38921b" }}
              style={styles.largeAvatar}
              resizeMode="cover" // Ensure the image covers the entire area
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: -90,
    marginTop: -330,
  },
  largeAvatar: {
    width: 250,
    height: 250,
    borderRadius: 0, // Set to 0 to make the image square
    resizeMode: 'cover', // Ensure the image covers the entire area
  },
  closeButton: {
    marginTop: 20,
    color: '#042558',
    fontSize: 18,
  },
});

export default ProfileSection;