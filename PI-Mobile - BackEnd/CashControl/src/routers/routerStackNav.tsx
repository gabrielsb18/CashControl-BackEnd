import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../Screens/Login/Login";
import Home from "../../Screens/Home/Home";
import RouterTab from "./routerTab";

export default function StackRoutes() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        //Troquei minha rota de Login direto pra Home pelo routerTab
        name="RouterTab"
        component={RouterTab} //StackRoutesTR
        options={{
          //Bloqueia o gesto para o drawer na tela de login
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}
