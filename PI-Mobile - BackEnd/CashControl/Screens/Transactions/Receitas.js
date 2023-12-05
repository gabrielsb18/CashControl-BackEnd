import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, FlatList } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TransacaoContext } from "../../src/Contexts/TransacoesContext";
import { useContext, useEffect,useState } from 'react';
import {ContentFlat,
  IconTransaction,
  DetailsTransaction,
  NameTransaction,
  SubtitleTransaction,
  AmountTransaction,
  Footer,
  DataTransaction} from '../../src/Utils/style.ts';
  import { transactions } from "../../src/Utils/Transactions";

import {FAB} from 'react-native-paper';

const Receitas = () => {
  const [list, setList] = useState(transactions);

  const [carregando, setCarregando] = useState (false)
  const {transacoes, listar, remover} = useContext(TransacaoContext);


  useEffect(() => {
    const fetchData = async () => {
      console.log('Iniciando carregamento...');
      setCarregando(true);
  
      try {
        // Simulando uma chamada assíncrona que leva 2 segundos para ser concluída
        await new Promise(resolve => setTimeout(resolve, 2000));
  
        // Substitua o código acima com a chamada real à sua função listar()
        await listar();
  
        console.log('Dados carregados com sucesso:', transacoes);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        console.log('Finalizando carregamento...');
        setCarregando(false);
      }
    };
  
    fetchData();
  }, []);
  
  
  
  

  const navigation = useNavigation();

  const ButtonAdd = () => {
    navigation.navigate('NovaReceita')
  }

  return (
    <ScrollView contentContainerStyle={style.container} horizontal={true}>
      {transacoes.length === 0 ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../../assets/Images/Illustração.png")}
            style={style.img}
          />
          {/* <TouchableOpacity onPress={ButtonAdd}>
            <View style={style.Button}>
              <Text>Adicionar</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      ) : (
        <Footer>
          <FlatList
            data={transacoes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ContentFlat>
                <IconTransaction source={require("../../assets/Images/IconVariedade.png")} />
                <DetailsTransaction>
                  <NameTransaction>{item.categoria}</NameTransaction>
                  <SubtitleTransaction>{item.descricao}</SubtitleTransaction>
                  <DataTransaction>{item.data}</DataTransaction>  
                </DetailsTransaction>
                <AmountTransaction
                >
                  {item.valor}
                </AmountTransaction>
              </ContentFlat>
            )}
            overScrollMode="never" /*Desativa o efeito de limite de rolagem */
            scrollEnabled={true} /*Desativa o scrool da minha lista  */
          />
        </Footer>
      )}
      {/* <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 16 }}>
        <TouchableOpacity onPress={ButtonAdd}>
          <View style={style.Button}>
            <Text>Adicionar</Text>
          </View>
        </TouchableOpacity>
      </View> */}

      <FAB
        icon={"plus"}
        onPress={() => navigation.navigate("NovaReceita")}
        style={{ position: "absolute", right: 0, bottom: 0, margin: 16, color: "#75B700" }}
      />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },

  img: {
    width: 297,
    height: 154,
  },

  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#75B700",
    borderRadius: 13,
    width: 103,
    height: 59,
    marginTop: 150,
  },
});

export default Receitas;
