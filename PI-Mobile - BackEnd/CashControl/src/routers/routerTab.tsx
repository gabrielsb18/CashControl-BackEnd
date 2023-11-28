import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons, Octicons} from '@expo/vector-icons'

/*Importação de telas*/
import Statistics from '../../Screens/Statistics/Statistics';
import Notification from '../../Screens/Notifications/Notification';
import StackRoutesTR from './routerStackTr';

const Tab = createBottomTabNavigator();

export default function RouterTab() {
  
  return (
    <Tab.Navigator 
      screenOptions = {{tabBarStyle: {
        backgroundColor: '#f7f7f7',
        borderTopColor: 'transparent',
        elevation: 0,}, /*Borda Do criado pelo meu navigator*/
        tabBarActiveTintColor: '#9BF500',/*Cor do meu botão ao estar selecionado*/
        }}>

        <Tab.Screen name = "Home"
          component = {StackRoutesTR}
          options={{
            headerShown: false, /*propriedade responsável pelo header*/
            tabBarIcon: ({color, size}) => <Octicons name = "home" color={color} size={30}/>,
            tabBarLabel: "•",
          }}/>

        <Tab.Screen name = "Statistics"
          component = {Statistics}
          options = {{
            headerShown: false,
            tabBarIcon: ({ color, size}) => <Octicons name = "history" color={color} size={25}/>,
            tabBarLabel: "•"
          }}/>

        <Tab.Screen name = "Notification"
          component = {Notification}
          options = {{
            headerShown: false,
            tabBarIcon: ({ color, size}) => <Ionicons name="notifications-outline" size={30} color= {color}/>,
            tabBarLabel: "•"
          }}/>
    </Tab.Navigator>
  )
}