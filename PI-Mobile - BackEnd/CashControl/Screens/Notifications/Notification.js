import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import Header from '../../src/components/Header/Header.js';

const Notification = () => {
  return (
    <View style = {styles.container}>
      
      {/* Importando meu componente header e passando como propriedade o seu titulo */}
        <Header title = "Notificações"/>

          <View style = {styles.Text}>
            <Text>Notifications</Text>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f7f7f7'
  },

  Text: {
    justifyContent: 'center',
    flex:1
  }
})

export default Notification