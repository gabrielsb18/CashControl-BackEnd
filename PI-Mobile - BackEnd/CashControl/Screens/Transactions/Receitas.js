import { View, StyleSheet, Image, ScrollView, FlatList, Text, TouchableOpacity, Modal } from "react-native";
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
import Icon from 'react-native-vector-icons/EvilIcons';
import Editar from "../Editar/Editar";

const Receitas = () => {
  const [carregando, setCarregando] = useState (false)
  const {transacoes, listar, remover, listarPorTipo} = useContext(TransacaoContext);

    useEffect(() => {
      const fetchData = async () => {
        //console.log("Iniciando carregamento...");
        setCarregando(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 10));
          await listarPorTipo("receita");
          //console.log("Dados carregados com sucesso:", transacoes);
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
        } finally {
          //console.log("Finalizando carregamento...");
          setCarregando(false);
      }
      };

      fetchData();
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
              <TouchableOpacity onPress={() =>
                navigation.navigate('Editar', { transacoesId: transacoes.id })
              }>
              <ContentFlat>
                <IconTransaction
                  source={require("../../assets/Images/IconVariedade.png")}
                />
                <DetailsTransaction>
                  <NameTransaction>{item.categoria}</NameTransaction>
                  <SubtitleTransaction>{item.descricao}</SubtitleTransaction>
                  <DataTransaction>{item.data}</DataTransaction>
                </DetailsTransaction>
                <AmountTransaction>{item.valor}</AmountTransaction>
                <View
                  style={{
                    //backgroundColor: "red",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                    position: 'absolute',
                    right: 0
                  }}
                >
                  <Text>{item.nome}</Text>
                  <TouchableOpacity onPress={() => remover(item.id)}>
                  <Icon name="trash" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </ContentFlat>
              </TouchableOpacity>
            )}
            overScrollMode="never" /*Desativa o efeito de limite de rolagem */
            scrollEnabled={true} /*Desativa o scrool da minha lista  */
          />
        </Footer>
      )}
      <FAB
        icon={"plus"}
        onPress={() => navigation.navigate("NovaReceita")}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          margin: 16,
          backgroundColor: "#75B700",
        }}
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
