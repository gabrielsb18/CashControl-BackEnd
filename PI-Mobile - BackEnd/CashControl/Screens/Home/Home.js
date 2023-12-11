import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {LinearGradient} from 'expo-linear-gradient'; {/* lib gradiente do header*/}
import Button_Desp_e_Rec from '../../src/components/ButtonDesp/Button.js';
import { FlatList } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Footer } from '../../src/Utils/style.ts';
import { transactions } from '../../src/Utils/Transactions.js';
import {ContentFlat,
    IconTransaction,
    DetailsTransaction,
    NameTransaction,
    SubtitleTransaction,
    AmountTransaction,
    DataTransaction} from '../../src/Utils/style.ts';

import { useContext, useEffect } from 'react';
import { TransacaoContext } from "../../src/Contexts/TransacoesContext";
import { somarDespesas, somarReceitas } from "../../src/services/TransacoesService";
    
export default function Home() {
  const {transacoes, listar, remover, listarPorTipo} = useContext(TransacaoContext);

  const [carregando, setCarregando] = useState (false)
  useEffect(() => {
    const fetchData = async () => {
      //console.log("Iniciando carregamento...");
      setCarregando(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 10));
        await listar();
        //console.log("Dados carregados com sucesso:", transacoes);
      } catch (error) {
        //console.error("Erro ao carregar dados:", error);
      } finally {
        //console.log("Finalizando carregamento...");
        setCarregando(false);
    }
    };

    fetchData();
}, [])


const [totalReceitas, setTotalReceitas] = useState("0.00");
useEffect(() => {
  const obterTotalReceitas = async () => {
    const total = await somarReceitas(transacoes);
    setTotalReceitas(total);
  };

  obterTotalReceitas();
}, [transacoes]);

const [totalGastos, setTotalGastos] = useState("0.00");
useEffect(() => {
  const obterTotalGastos = async () => {
    const total = await somarDespesas(transacoes);
    setTotalGastos(total);
  };

  obterTotalGastos();
}, [transacoes]);

  const [showValue, setShowValue] = useState (false)
  
  /* Lógica Botão Menu*/
  const navigation = useNavigation();
    const abridrawer = () => {
      navigation.openDrawer(); /* função responsável por abrir nosso drawer*/
    };

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
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        {/*BARRA DE STATUS DO TOP*/}
        {/*<StatusBar style="auto" />*/}
        <LinearGradient
          colors={["rgba(155, 245, 0, 1)", "rgba(120, 189, 0, 1)"]}
          style={styles.headerHome}
        >
          <View style={styles.row1}>
            <TouchableOpacity>
              <Image
                source={require("../../assets/Images/Perfil_Usuario.png")}
                style={styles.imgProfile}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={abridrawer}>
              <Image
                source={require("../../assets/Images/Button_menu.png")}
                style={styles.imgMenu}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.msgWelcome}>Bem Vindo(a) {"\n"}Usuário</Text>
        </LinearGradient>

        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={styles.saldoTotal}>
            <Text
              style={{
                letterSpacing: -0.3,
                fontSize: 15,
                fontFamily: "InterLight",
              }}
            >
              Seu saldo total
            </Text>
            <Text
              style={{ fontSize: 32, marginTop: 16, fontFamily: "InterBold" ,justifyContent: 'center', alignItems: 'center'}}
            >
              R$ {totalReceitas}
            </Text>
            <TouchableOpacity>
              <Image
                source={require("../../assets/Images/Eye_Saldo.png")}
                style={styles.imgEye}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.viewTransacoes}>
          <View style={styles.box1}>
            <Text>R$ {totalReceitas}</Text>
            <Image
              source={require("../../assets/Images/Arrow2.png")}
              style={{ marginLeft: 10 }}
            />
          </View>
          <View style={styles.box2}>
            <Text styles={{ marginLeft: 20 }}>R${totalGastos}</Text>
            <Image
              source={require("../../assets/Images/Arrow1.png")}
              style={{ marginLeft: 10 }}
            />
          </View>
        </View>

        <Button_Desp_e_Rec />

        <View style={styles.textsTr}>
          <Text style={styles.TitleTr}>Últimas transações</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Statistics")}>
            <Text style={styles.textView}>View All</Text>
          </TouchableOpacity>
        </View>

        {/*Lista de ultimas transações*/}
        <Footer>
          <FlatList
            //ADICIONAR FUNÇÃO PARA EXIBIR SOMENTE OS 3 PRIMEIROS ITENS
            data={transacoes.slice(0, 3).reverse()}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ContentFlat>
                {item.tipo === "receita" ? (
                  <IconTransaction
                    source={require("../../assets/Images/IconVariedade.png")}
                  />
                ) : (
                  <IconTransaction
                    source={require("../../assets/Images/IconVariedade2.png")}
                  />
                )}
                <DetailsTransaction>
                  <NameTransaction>{item.categoria}</NameTransaction>
                  <SubtitleTransaction>{item.descricao}</SubtitleTransaction>
                  <DataTransaction>{item.data}</DataTransaction>
                </DetailsTransaction>
                <AmountTransaction
                  style={{ color: item.tipo === "receita" ? "#75B700" : "red" }}
                >
                  {item.valor}
                </AmountTransaction>
              </ContentFlat>
            )}
            overScrollMode="never" /*Desativa o efeito de limite de rolagem */
            scrollEnabled={false} /*Desativa o scrool da minha lista  */
          />
        </Footer>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },
  
  headerHome: {
    width: '100%',
    height: 400, /*Altura do meu background verde*/
    padding: 21,
    borderBottomLeftRadius: 85,
    borderBottomRightRadius: 85,
    backgroundColor: '#9BF500',
  },

  imgProfile: {
    width: 58,
    height: 54,
    borderRadius: 100 /*Aplicando em qualquer imagem*/
  },

  imgMenu: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },

  row1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 45,
    padding: 20,
    //backgroundColor: 'red',
  },

  msgWelcome: {
    fontFamily: 'InterRegular',
    color: 'black',
    fontSize: 30,
    marginLeft: 50,
    marginTop: 30
  },
  
  saldoTotal: {

    backgroundColor: '#75B700',
    fontSize: 15,
    width: '80%',
    height: 115,
    top: -76,
    borderRadius: 14,
    padding: 20,

    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5
  },

  imgEye: {
    marginLeft: '85%',
    marginTop:'-12%',
  },

  viewTransacoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 26,
    marginTop:-66,
    width: '100%'
   //backgroundColor: 'red'
  },

  box1:{
    flexDirection: 'row',
    width: 119,
    height: 52,
    padding: 16,
    backgroundColor:'rgba(117, 183, 0, 0.25)',
    borderRadius: 13,
  },

   box2:{
    flexDirection: 'row',
    width: 119,
    height: 52,
    backgroundColor:'rgba(255, 0, 0, 0.25)',
    padding: 16,
    borderRadius: 13,
  },

  viewreceitas:{
    width: '84%',
    height: '12%',
  },

  receitas: {
    width: '100%',
    height: 94,
    backgroundColor: '#75B700',
    borderRadius: 46,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  imgSeta: { 
    marginLeft: 30,
  },

  list: {
    flex: 1,
  },

  textsTr:{
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection:'row',
    paddingHorizontal: 45,
    paddingBottom:12,
    paddingTop: 12
  },

   TitleTr: {
    fontFamily: 'InterLight',
    letterSpacing: -0.26,
    fontSize: 13,
    flex:1,
  },

  textView: {
    fontFamily: 'InterLight',
    flex:1,
    letterSpacing: -0.26,
    fontSize: 13,
    color: '#75B700',
   },

  FlList:{
    marginStart: 14,
    marginEnd: 14,
    width:350,
    marginTop: -10,
  },

  expenses:{
    color:'red'
  }
});
