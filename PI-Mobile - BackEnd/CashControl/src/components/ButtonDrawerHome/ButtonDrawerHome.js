import React from 'react'
import { Text, StyleSheet, Image } from 'react-native'
import { useFonts } from 'expo-font';
import {Octicons} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

const ButtonDrawerHome = ({text, onPress}) => {
    const [fontsLoaded] = useFonts({
        InterRegular:require('../../../assets/Fonts/InterRegular.ttf'),
        InterMedium:require('../../../assets/Fonts/InterMedium.ttf'),
        InterBold:require('../../../assets/Fonts/InterBold.ttf'),
        InterLight:require('../../../assets/Fonts/InterLight.ttf')
    
        });
    
       if (!fontsLoaded) {
        return null;
      }

  return (
  <TouchableOpacity
    style = {styles.buttonContainer}
      onPress = {onPress}
      options = {{drawerActiveTintColor: '#9BF500'}}>

    <Octicons name = "home" color={'black'} size={30} styles={styles.imgHome}/>
    <Text style= {styles.text}>{text}</Text>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer:{
    backgroundColor: 'transparent',
    marginBottom: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',

    width: 196,
    height: 60,
        
    fontFamily: 'InterLight',
    fontSize: 18, /*Não carregou*/
  },

  text: {
    marginLeft: 11,
    fontSize: 18,
    fontFamily: 'InterLight'
  }
})

export default ButtonDrawerHome;