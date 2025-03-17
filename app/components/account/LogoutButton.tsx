import React, { FC } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={onLogout}
        style={styles.button}
      >
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1bc0b768a161c00748306f2ce98229d0eda757f8" }}
          style={styles.icon}
        />
        <Text style={styles.text}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 35,
    bottom: 130,
  },
  button: {
    width: 247,
    height: 53,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#FCFCFC',
    borderRadius: 64,
    borderWidth: 5,
    borderColor: '#042558',
  },
  icon: {
    width: 35,
    height: 34,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default LogoutButton;