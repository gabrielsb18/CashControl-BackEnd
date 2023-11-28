import { View, Text, StyleSheet,Image } from 'react-native'
import React from 'react'

const Movements = ({data}) => {
  return (
    <View style = {styles.container}>

    <View style ={styles.content}>
      <Image
      source = {require('../../../assets/Images/Alimentacao.png')}/>
        <Text style ={styles.label}>{data.label}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Text
        //caso meu data.type seja 1(receita) irá ficar verde caso contario(0) vermelho//
        style ={data.type === 1 ? styles.value : styles.expenses}>
        {data.type ===1 ? `R$ ${data.value}` : `R$ ${data.value}`}
        </Text>
    </View>
    </View>
  )
}

const styles = StyleSheet.create ({
    container:{
      marginBottom: 24,
      borderBottomWidth:0.5,
      borderBottonColor: '#DADADA',
    },

    content: {
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'space-between',
      marginBottom:8,
    },

    label: {
      fontSize:16,
      fontFamily: 'InterBold',
      letterSpacing: -0.24,
    },

    description: {
      fontSize:12,
      fontFamily: 'InterRegular',
      letterSpacing: -0.24,
    },

    expenses: {
      fontFamily:'InterBold',
      fontSize:13,
      color: '#FF0000CC',
   
    }
})

export default Movements