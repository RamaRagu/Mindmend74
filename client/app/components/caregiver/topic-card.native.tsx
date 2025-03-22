import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType, ImageBackground } from 'react-native';

interface TopicCardProps {
  number: number;
  title: string;
  image: ImageSourcePropType;
  onPress: () => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ number, title, image, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress} 
      activeOpacity={0.9}
    >
      <ImageBackground 
        source={image} 
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.numberCircle}>
            <Text style={styles.numberText}>{number}</Text>
          </View>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)', // Black overlay with 60% opacity
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  numberText: {
    color: '#042558',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
});