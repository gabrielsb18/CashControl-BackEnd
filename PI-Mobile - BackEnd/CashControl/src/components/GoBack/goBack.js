import { View, Text, StyleSheet,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const GoBack = () => {
  
const navigation = useNavigation(); /* Hook responsável pela navegação*/
    return (
    /*goBack = retorna a página anterior*/
    <TouchableOpacity onPress={()=> navigation.goBack()}> 
        <View style = {styles.container}>
            <View>
                <Image
                source = {require('../../../assets/Images/Arrow6.png')} style ={styles.imgBack}/>
            </View>
        </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 350,
    //backgroundColor: 'red', // visualização da area de toque do botão
    width: 50,
    height: 50,

  },

  imgBack: {
    alignItems: 'center',
  }
})

export default GoBack;