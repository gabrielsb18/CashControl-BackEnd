import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import GoBack from '../GoBack/goBack'
import { useNavigation } from '@react-navigation/native'

const Header = ({title}) => {

  const navigation = useNavigation()

  return (
    <View style = {style.boxHeader}>
      <View style={style.container}>
      {/* /*botão de retornar*/}
      <TouchableOpacity onPress={()=> navigation.goBack()}> 
          <View style = {style.picArrow}>
              <View>
                  <Image
                  source = {require('../../../assets/Images/Arrow6.png')} style ={style.imgBack}/>
              </View>
          </View>
      </TouchableOpacity>
          <Text style = {style.headerText}>{title}</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  
  boxHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

    backgroundColor: '#9BF500',
    width: '100%',
    position: 'top',
    height: 95,
    padding: 20,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    //backgroundColor: 'red',

    marginTop: 25
  },

  headerText: {
    fontFamily: 'InterMedium',
    fontSize: 20,
    letterSpacing: -1,
    fontWeight: '500',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: 90,
  },

  picArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 350,
    marginLeft: 45,
    backgroundColor: 'red', // visualização da area de toque do botão
    width: 50,
    height: 50,
  }
})

export default Header;
