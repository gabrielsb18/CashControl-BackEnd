import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useFonts } from 'expo-font';
import Receitas from "../Transactions/Receitas";
import Despesas from "../Transactions/Despesas";
import Header from "../../src/components/Header/Header";
import {useState } from 'react';

const TabGroup = createMaterialTopTabNavigator();

const ListagemDespEResp = () => {

    const [fontsLoaded] = useFonts({
        InterRegular:require('../../assets/Fonts/InterRegular.ttf'),
        InterMedium:require('../../assets/Fonts/InterMedium.ttf'),
        InterBold:require('../../assets/Fonts/InterBold.ttf'),
        InterLight:require('../../assets/Fonts/InterLight.ttf')
    
        });
    
       if (!fontsLoaded) {
        return null;
      }

  return (
    <>
      <Header title="Categoria" />
      <TabGroup.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#000",
          lazy: true,
          tabBarIndicatorStyle: {
            backgroundColor: "#338F25",
            borderRadius: 10,
            height: 3,
          },
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: "InterRegular",
            textTransform: "lowercase",
            fontWeight: '500',
            letterSpacing: -0.9
          },
          tabBarStyle: { backgroundColor: "#9BF500" },
        }}
      >
        <TabGroup.Screen name="Receitas" component={Receitas}/>
        <TabGroup.Screen name="Despesas" component={Despesas} />
      </TabGroup.Navigator>
    </>
  );
};

export default ListagemDespEResp;
