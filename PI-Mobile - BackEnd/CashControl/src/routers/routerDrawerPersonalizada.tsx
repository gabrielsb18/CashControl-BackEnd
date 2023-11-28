import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import {Text, StyleSheet, View, Image} from 'react-native';
import { Octicons,  MaterialIcons } from '@expo/vector-icons'
import { useFonts } from 'expo-font';

import RouterTab from './routerTab';
import StackRoutes from './routerStackNav';

import ButtonDrawerHome from '../components/ButtonDrawerHome/ButtonDrawerHome';
import ButtonDrawerSair from '../components/ButtonDrawerSair/ButtonDrawerSair';
import StackRoutesTR from './routerStackTr';


const Drawer = createDrawerNavigator();

export default function routerDrawer2() {

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
      backgroundColor: 'white',
     
      borderColor: '#75B700',
      borderWidth: 2,}}}
    
    drawerContent={(props) => <MenuItems {...props }/> }>
      
      {/*Elementos do meu Drawer*/}
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
      {/* atalho para a pilha com o tabNavigation */}
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
    </Drawer.Navigator>
  )
}

const MenuItems = ({navigation}) => {
  
  return (
    <DrawerContentScrollView
    style={styles.container}>

      {/* /*Perfil Usuario*/}
      <View style ={styles.perfilUser}>
        <Image
          source = {require('../../assets/Images/Perfil_Usuario.png')} style ={styles.Perfil}/>
        <Text style = {(styles.title)}> Usuario da Silva </Text>
      </View>
      
      <ButtonDrawerHome
        text = "Home"
        onPress ={() => navigation.navigate('Feed')}/>

      <ButtonDrawerSair
        text = "Sair"
        onPress ={() => navigation.navigate('Profile')}/>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },

  title: {
    fontSize: 18,
    fontFamily: 'InterBold',
    padding: 11
  },
  
  Perfil: {
    width: 58,
    height: 54,
  },

  perfilUser: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  }
})
