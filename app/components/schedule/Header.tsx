import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Svg, Path, G, Rect, Defs, ClipPath } from "react-native-svg";

export const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Svg width={60} height={61} viewBox="0 0 60 61" fill="none">
          <G clipPath="url(#clip0_411_209)">
            <Path
              d="M57.5 30.8135C57.5 38.107 54.6027 45.1017 49.4455 50.259C44.2882 55.4162 37.2935 58.3135 30 58.3135C22.7066 58.3135 15.7118 55.4162 10.5546 50.259C5.39733 45.1017 2.50001 38.107 2.50001 30.8135C2.4979 28.7091 2.74121 26.6116 3.22501 24.5635C4.63993 18.5242 8.05506 13.1405 12.9157 9.28701C17.7764 5.43348 23.7971 3.33643 30 3.33643C36.2029 3.33643 42.2236 5.43348 47.0843 9.28701C51.945 13.1405 55.3601 18.5242 56.775 24.5635C57.2588 26.6116 57.5021 28.7091 57.5 30.8135Z"
              fill="#04076F"
            />
            <Path
              d="M45 28.3134H21.035L26.7675 22.5809C27.0062 22.3503 27.1967 22.0745 27.3277 21.7694C27.4587 21.4644 27.5277 21.1364 27.5306 20.8044C27.5335 20.4725 27.4702 20.1433 27.3445 19.8361C27.2188 19.5288 27.0332 19.2497 26.7984 19.0149C26.5637 18.7802 26.2846 18.5946 25.9773 18.4689C25.6701 18.3432 25.3409 18.2799 25.009 18.2828C24.677 18.2857 24.349 18.3547 24.0439 18.4857C23.7389 18.6167 23.4631 18.8072 23.2325 19.0459L13.2325 29.0459C12.7638 29.5148 12.5005 30.1505 12.5005 30.8134C12.5005 31.4763 12.7638 32.1121 13.2325 32.5809L23.2325 42.5809C23.704 43.0363 24.3355 43.2883 24.991 43.2826C25.6464 43.2769 26.2735 43.014 26.737 42.5505C27.2005 42.087 27.4634 41.4599 27.4691 40.8044C27.4748 40.1489 27.2228 39.5174 26.7675 39.0459L21.035 33.3134H45C45.663 33.3134 46.2989 33.05 46.7677 32.5812C47.2366 32.1124 47.5 31.4765 47.5 30.8134C47.5 30.1504 47.2366 29.5145 46.7677 29.0457C46.2989 28.5768 45.663 28.3134 45 28.3134Z"
              fill="white"
            />
          </G>
          <Defs>
            <ClipPath id="clip0_411_209">
              <Rect
                width={60}
                height={60}
                fill="white"
                transform="translate(0 0.813477)"
              />
            </ClipPath>
          </Defs>
        </Svg>
      </TouchableOpacity>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/2f8b609224841b823edd76addbcbd69e3b5cdfa6",
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  image: {
    width: 40,
    height: 40,
  },
});
