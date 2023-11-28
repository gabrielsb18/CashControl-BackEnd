import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const NovaDespesa = () => {
  return (
    <View style = {style.container}>
      <Text>Nova Despesa</Text>
    </View>
  )
}

const style = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f7f7f7"
}
})

export default NovaDespesa