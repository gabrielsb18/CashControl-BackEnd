import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../../Screens/Home/Home";
import ListagemDespEResp from "../../Screens/ListagemDespEResp/ListagemDespEResp";
import NovaReceita from "../../Screens/AddDespEResp/NovaReceita";
import NovaDespesa from "../../Screens/AddDespEResp/NovaDespesa";

export default function StackRoutesTR() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Principal"
        component={Home}
        options={
          {
            //Bloqueia o gesto para o drawer na tela de login
            //gestureEnabled: false
          }
        }
      />

      <Stack.Screen
        name="ListagemDespEResp"
        component={ListagemDespEResp}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerTitleAlign: "center",
          title: "Categoria",
          headerStyle: {
            backgroundColor: "#9BF500",
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "InterRegular",
            fontSize: 19,
            fontWeight: "400",
          },
        }}
      />
      <Stack.Screen
        name="NovaReceita"
        component={NovaReceita}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          title: "Nova Receita",
          headerStyle: {
            backgroundColor: "#9BF500",
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "InterRegular",
            fontSize: 19,
            fontWeight: "400",
          },
        }}
      />

      <Stack.Screen
        name="NovaDespesa"
        component={NovaDespesa}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "Nova Despesa",
          headerStyle: {
            backgroundColor: "#9BF500",
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "InterRegular",
            fontSize: 19,
            fontWeight: "400",
          },
        }}
      />
    </Stack.Navigator>
  );
}
