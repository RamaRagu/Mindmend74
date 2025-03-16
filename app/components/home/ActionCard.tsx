import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";

interface ActionCardProps {
  title: string;
  style?: object;
  onPress?: () => void;
  imageSource?: any;
  imageStyle?: object;
  titleStyle?: object;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  style = {},
  onPress,
  imageSource,
  imageStyle = {},
  titleStyle = {},
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
      <View style={styles.content}>
        {imageSource && <Image source={imageSource} style={[styles.image, imageStyle]} />}
        <Text style={[styles.text, titleStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 5,
    width: 409,
    maxWidth: "100%",
    borderRadius: 21,
    padding: 20,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    marginLeft: 130,
  },
  text: {
    fontSize: 30,
    color: "#042558",
    fontWeight: "800",

  },
});