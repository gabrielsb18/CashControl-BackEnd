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
  const [carregando, setCarregando] = useState (false)
  const {transacoes, listar, remover, listarPorTipo} = useContext(TransacaoContext);

  const [suaLista, setSuaLista] = useState([]);
   useEffect(() => {
     const fetchData = async () => {
       //console.log("Iniciando carregamento...");
       setCarregando(true);
       try {
         await listarPorTipo("despesa");
         //console.log("Dados carregados com sucesso:", transacoes);
       } catch (error) {
         console.error("Erro ao carregar dados:", error);
       } finally {
         //console.log("Finalizando carregamento...");
         setCarregando(false);
       }
     };

     // Use setTimeout para simular a chamada assíncrona
     setTimeout(fetchData, 10);
   }, []);

   const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={style.container} horizontal={true}>
      {transacoes.length === 0 ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../../assets/Images/Illustração.png")}
            style={style.img}
          />
        </View>
      ) : (
        <Footer>
          <FlatList
            data={transacoes.reverse()}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ContentFlat>
                <IconTransaction source={require("../../assets/Images/IconVariedade2.png")} />
                <DetailsTransaction>
                  <NameTransaction>{item.categoria}</NameTransaction>
                  <SubtitleTransaction>{item.descricao}</SubtitleTransaction>
                  <DataTransaction>{item.data}</DataTransaction>  
                </DetailsTransaction>
                <AmountTransaction style ={{color: 'red'}}
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
      <FAB
        icon={"plus"}
        onPress={() => navigation.navigate("NovaDespesa")}
        style={{ position: "absolute", right: 0, bottom: 0, margin: 16, backgroundColor: "#75B700",}}
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
   // marginTop: 150,
  },
});

export default Receitas;
