import { createDrawerNavigator } from '@react-navigation/drawer';
import { Octicons,  MaterialIcons } from '@expo/vector-icons'
import { useFonts } from 'expo-font';

import RouterTab from './routerTab';
import StackRoutes from './routerStackNav';


const Drawer = createDrawerNavigator();

export default function routerDrawer() {

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
    <Drawer.Navigator screenOptions={{headerShown: false,
      drawerStyle: { /*Personalização do meu drawer*/
        borderTopRightRadius: 42,
        borderBottomRightRadius: 42,
        backgroundColor: 'white',}}}>
      {/* atalho para outra pagina com tabNavigation */}
      <Drawer.Screen
        name ='Feed'
        component ={RouterTab}
        options={{
            drawerIcon: ({color, size}) => <Octicons name = "home" color={color} size={size}/>,
            drawerLabel: 'Home',
            drawerActiveTintColor: '#9BF500',
            drawerLabelStyle: {
              fontFamily: 'InterLight', /*Fonte do meu label*/
              fontSize: 18,
            }
        }}/>
        
        {/* Acessando outra tela do meu app dentro do drawer */}
        <Drawer.Screen
        name ='Profile'
        component ={StackRoutes}
        options={{
            drawerIcon: ({color, size}) => <MaterialIcons name = "logout" color={color} size={size}/>,
            drawerLabel: 'Sair',
            drawerActiveTintColor: '#9BF500',
            drawerLabelStyle: {
              fontFamily: 'InterLight',
              fontSize: 18,
            },
        }}/>
    </Drawer.Navigator>
  )
}