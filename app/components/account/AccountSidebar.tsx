import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
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
  const navigationItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/863e27777ae8915d39b6ccd03ac6adc61557bd1d",
      label: "My Profile",
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

  const handleViewProfile = () => {
    // Handle view profile click
    console.log("View profile clicked");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackArrow onPress={onBack} />
        <Text style={styles.title}>Account</Text>
      </View>

      <ProfileSection
        username={username}
        avatarUrl={avatarUrl}
        onViewProfile={handleViewProfile}
      />

      <NavigationItems items={navigationItems} />

      <LogoutButton onLogout={onLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 348,
    backgroundColor: '#EAEAEA',
    flexDirection: 'column',
    position: 'relative',
    borderTopRightRadius: 37,
    borderBottomRightRadius: 37,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingTop: 56,
    paddingHorizontal: 20,
  },
  title: {
    color: '#042558',
    fontSize: 24,
    fontWeight: '600',
  },
});

export default AccountSidebar;