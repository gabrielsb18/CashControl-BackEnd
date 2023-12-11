import React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";

const ButtonDrawerSair = ({ text, onPress }) => {
  const [fontsLoaded] = useFonts({
    InterRegular: require("../../../assets/Fonts/InterRegular.ttf"),
    InterMedium: require("../../../assets/Fonts/InterMedium.ttf"),
    InterBold: require("../../../assets/Fonts/InterBold.ttf"),
    InterLight: require("../../../assets/Fonts/InterLight.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style = {{justifyContent:'center', alignItems: 'center', width: 250, height: 80, position: 'absolute', bottom: 15 }}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={onPress}
        options={{ drawerActiveTintColor: "#9BF500" }}
      >
        <Text style={styles.text}>{text}</Text>
        <Image
          source={require("../../../assets/Images/Arrow3.png")}
          style={styles.imgSeta}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "transparent",
    borderRadius: 13,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",

    width: 200,
    height: 60,

    fontFamily: "InterLight",
    fontSize: 18,

    borderColor: "#75B700",
    borderWidth: 2,
  },

  text: {
    marginLeft: 11,
    fontSize: 18,
    fontFamily: "InterLight",
    color: "#75B700",
  },

  imgSeta: {
    marginLeft: 89,
  },
});

export default ButtonDrawerSair;
