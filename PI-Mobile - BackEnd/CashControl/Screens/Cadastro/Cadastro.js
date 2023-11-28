import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useState } from 'react';
import { useFonts } from 'expo-font';



const Cadastro = () => {
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

  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/*esse TouchableOpacity é meio que um botão invisível, 
        só adicionar a lógica no onPress pra voltar pra tela Login*/}
        <TouchableOpacity
          onPress={() => {}}
          style={styles.returnButtonContainer}>
          <Image
            style={styles.returnButton}
            source={require('../../assets/Images/return-button-1.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Realização de cadastro</Text>
      </View>
      <ScrollView style={styles.formArea}>
        {/*os campos de texto do formulário de cadastro ainda tão sem funcionalidade,
        só pra poder digitar qualquer coisa por enquanto*/}
        <Text style={styles.formTitle}>Criar nova conta</Text>
        <Text style={styles.formItem}>Nome:</Text>
        <TextInput style={styles.textInputBox} onChangeText={() => {}} />
        <Text style={styles.formItem}>Sobrenome:</Text>
        <TextInput style={styles.textInputBox} onChangeText={() => {}} />
        <Text style={styles.formItem}>E-mail:</Text>
        <TextInput style={styles.textInputBox} onChangeText={() => {}} />
        <Text style={styles.formItem}>Senha:</Text>
        <TextInput
          style={styles.textInputBox}
          onChangeText={() => {}}
          secureTextEntry={true}
        />
        <Text style={styles.formItem}>Confirmar Senha:</Text>
        <TextInput
          style={styles.textInputBox}
          onChangeText={() => {}}
          secureTextEntry={true}
        />
        <View style={styles.checkBoxContainer}>
          <Checkbox value={isSelected} onValueChange={setSelection} />
          <Text
            style={{
              marginLeft: 8,
              fontFamily: 'Inter',
              fontSize: 13,
              top: 2,
            }}>
            Concordo com os Termos de Uso
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            contentStyle={{ height: 50 }}
            labelStyle={{
              fontFamily: 'Inter',
              fontSize: 16,
              fontWeight: 300,
              letterSpacing: 0,
            }}
            color="#75B700"
            style={{
              marginTop: 20,
              borderRadius: 14,
              width: 150,
              justifyContent: 'center'
            }}
            mode="contained"
            onPress={() => {}}
            dark={true}>
            CRIAR CONTA
          </Button>
        </View> 
      </ScrollView>
    </View>
  );
};

export default Cadastro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#9BF500',
    height: 90,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerText: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: -1,
    marginBottom: 13,
  },
  returnButtonContainer: {
    position: 'absolute',
    left: 10,
    top: 50,
  },
  returnButton: {
    height: 25,
    width: 30,
  },
  formArea: {
    height: 800,

    marginHorizontal: 30,
  },
  formTitle: {
    fontFamily: 'Inter',
    textAlign: 'center',
    fontSize: 32,
    marginTop: 20,
    marginBottom: 15,
    fontWeight: 600,
    color: '#2D5300',
    letterSpacing: -1,
  },
  formItem: {
    fontFamily: 'Inter',
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 5,
    marginHorizontal: 10,
    marginTop: 5,
  },
  textInputBox: {
    backgroundColor: '#F7F7F7',
    height: 50,
    marginBottom: 17,
    padding: 15,
    borderRadius: 10,
    borderColor: 'lightgray',
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Inter',
    fontSize: 14,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'center'
  }
});
