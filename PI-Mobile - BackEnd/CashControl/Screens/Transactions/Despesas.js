import { View, StyleSheet, Image, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Despesas = () => {

  const navigation = useNavigation()

  const ButtonAddDesp = () => {
    navigation.navigate('NovaDespesa')
  }
  return (
    <View style={style.container}>
      <Image
        source={require("../../assets/Images/Illustração.png")}
        style={style.img}
      />
      <TouchableOpacity onPress={ButtonAddDesp}>
        <View style = {style.Button}>
          <Text>Adicionar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },

  img: {
    width: 297,
    height: 154,
  },

  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#75B700",
    borderRadius: 13,
    width: 103,
    height: 59,
    marginTop: 88
  }
});

export default Despesas;
