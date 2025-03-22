import React, { FC } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import BackArrow from "../icons/BackArrow";
import ProfileSection from "./ProfileSection";
import NavigationItems from "./NavigationItems";
import LogoutButton from "./LogoutButton";

interface AccountSidebarProps {
  onBack: () => void;
  onLogout: () => void;
  username: string;
  avatarUrl: string;
}

const AccountSidebar: FC<AccountSidebarProps> = ({
  onBack,
  onLogout,
  username,
  avatarUrl,
}) => {
  const router = useRouter();

  const handleViewProfile = () => {
    router.push("/UserProfile/profile");
    // onBack removed as requested
  };
  
  const handleBackArrowPress = () => {
    router.push("/"); // Navigate to home page
  };

  const navigationItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/863e27777ae8915d39b6ccd03ac6adc61557bd1d",
      label: "My Profile",
      onPress: handleViewProfile,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/31ab7bf255e3cd2ab7897a7a0b3b3fc6c35c480b",
      label: "About app",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/24b89fd525b96f3449c441479ff3213029a9c27d",
      label: "Setting",
    },
  ];

  return (
    <View style={styles.overlay}>
      <BlurView intensity={20} style={styles.blurBackground} />
      <Pressable style={styles.dismissArea} onPress={onBack} />
      
      <View style={styles.container}>
        <View style={styles.header}>
          <BackArrow onPress={handleBackArrowPress} />
          <Text style={styles.title}>Account</Text>
        </View>

        <ProfileSection
          username={username}
          avatarUrl={avatarUrl}
          onViewProfile={handleViewProfile}
        />

        <View style={styles.navigationContainer}>
          <NavigationItems items={navigationItems} />
        </View>

        <View style={styles.footer}>
          <LogoutButton onLogout={onLogout} />
        </View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    flexDirection: 'row',
  },
  blurBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  dismissArea: {
    flex: 1,
  },
  container: {
    width: 348,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopRightRadius: 37,
    borderBottomRightRadius: 37,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingTop: 56,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  title: {
    color: '#042558',
    fontSize: 28,
    fontWeight: '600',
  },
  navigationContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  }
});

export default AccountSidebar;