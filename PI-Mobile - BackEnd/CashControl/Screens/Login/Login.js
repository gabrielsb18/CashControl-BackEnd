import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useState } from 'react';
import { useFonts } from 'expo-font';

const Login = () => {

  const [fontsLoaded] = useFonts({
    InterRegular:require('../../assets/Fonts/InterRegular.ttf'),
    InterMedium:require('../../assets/Fonts/InterMedium.ttf'),
    InterBold:require('../../assets/Fonts/InterBold.ttf'),
    InterLight:require('../../assets/Fonts/InterLight.ttf'),
    InterVariable:require('../../assets/Fonts/InterVariable.ttf'),
    });

   if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 240, width: '100%' }}
        source={require('../../assets/Images/shop.png')}
      />
      <View style={styles.overlay} />
      <View style={styles.overlay2} />
      <View style={styles.loginArea}>
        <Text
          style={{
            fontFamily: 'InterVariable',
            textAlign: 'center',
            marginTop: 14,
            fontSize: 32,
            fontWeight: '600',
            color: '#2D5300',
          }}>
          Login
        </Text>
        <Text
          style={{
            fontFamily: 'InterVariable',
            fontSize: 14,
            textAlign: 'center',
            color: '#2D5300',
            letterSpacing: 0,
          }}>
          Acesse sua conta e comece a economizar.
        </Text>
        <TextInput
          style={styles.textInputBox}
          inputMode="email"
          placeholder="E-mail"
          placeholderTextColor="#878787"
          onChangeText={() => {}}
        />
        <TextInput
          style={styles.textInputBox}
          placeholder="Senha"
          secureTextEntry={true}
          placeholderTextColor="#878787"
          onChangeText={() => {}}
        />
        <Text
          style={{
            fontFamily: 'InterVariable',
            marginTop: 13,
            color: '#2D5300',
            textAlign: 'center',
          }}>
          Esqueceu sua senha?
        </Text>
        <Button
          contentStyle={{ height: 50 }}
          labelStyle={{
            fontFamily: 'InterVariable',
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: 0,
          }}
          color="#75B700"
          style={{
            marginTop: 10,
            marginHorizontal: 80,
            borderRadius: 14,
          }}
          mode="contained"
          onPress={() => {}}
          dark={true}>
          LOGIN
        </Button>
        <Button
          labelStyle={{
            fontFamily: 'InterVariable',
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: 0,
          }}
          color="#75B700"
          uppercase={false}
          style={{
            marginTop: 7,
            marginHorizontal: 80,
            borderRadius: 14,
          }}
          mode="contained"
          onPress={() => {}}
          dark={true}>
          Não tenho conta
        </Button>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#3EAB3D',
    overflow: 'hidden',
  },
  loginArea: {
    backgroundColor: 'white',
    height: 390,
    width: '80%',
    borderRadius: 20,
    top: '16%',
  },
  overlay: {
    width: '120%',
    height: '40%',
    backgroundColor: '#9BF500',
    top: '17%',
    left: '-10%',
    position: 'absolute',
    borderTopEndRadius: 2000,
    borderTopLeftRadius: 2000,
  },
  overlay2: {
    width: '120%',
    height: '40%',
    position: 'absolute',
    backgroundColor: '#3EAB3D',
    top: '23%',
    left: '-10%',
    borderTopEndRadius: 2000,
    borderTopLeftRadius: 2000,
  },
  textInputBox: {
    backgroundColor: '#F7F7F7',
    height: 50,
    marginTop: 17,
    marginHorizontal: 16,
    padding: 15,
    borderRadius: 10,
    borderColor: 'lightgray',
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'InterVariable',
    fontSize: 14,
  },
});
