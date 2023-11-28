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
  Footer} from '../../src/Utils/style.ts';
  import { transactions } from "../../src/Utils/Transactions";

const Receitas = () => {
  const [list, setList] = useState(transactions);

  const [carregando, setCarregando] = useState (false)
  const {transacoes, listar, remover} = useContext(TransacaoContext)

  useEffect(() =>{
     setCarregando(true);
     setTimeout(() => listar().then(setCarregando(false)), 5000);
   }, []);

  const navigation = useNavigation();

  const ButtonAdd = () => {
    navigation.navigate('NovaReceita')
  }

  return (
    <View style={style.container}>
        {/* <View style = {{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require("../../assets/Images/Illustração.png")}
          style={style.img}
        />
        <TouchableOpacity onPress={ButtonAdd}>
          <View style={style.Button}>
            <Text>Adicionar</Text>
          </View>
        </TouchableOpacity>
      </View> */}

        <Footer>
          <FlatList
            data={transacoes}
            key={transacoes.id}
            renderItem={({ item }) => (
              <ContentFlat>
                <IconTransaction source={item.Icon} />
                <DetailsTransaction>
                  <NameTransaction>{item.categoria}</NameTransaction>
                  <SubtitleTransaction>{item.descricao}</SubtitleTransaction>
                </DetailsTransaction>
                <AmountTransaction
                  style={item.type === 1 ? style.value : style.expenses}
                >
                  {item.type === 1 ? `${item.valor}` : `${item.valor}`}
                </AmountTransaction>
              </ContentFlat>
            )}
            overScrollMode="never" /*Desativa o efeito de limite de rolagem */
            scrollEnabled={true} /*Desativa o scrool da minha lista  */
            //keyExtractor={(item) => item.id.toString()}
          />
        </Footer>

        <View style={{ justifyContent: "center", alignItems: "center"}}>
            <TouchableOpacity onPress={ButtonAdd}>
              <View style={style.Button}>
                <Text>Adicionar</Text>
              </View>
            </TouchableOpacity>
        </View>
    </View>
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
  }
  
});

export default Receitas;
