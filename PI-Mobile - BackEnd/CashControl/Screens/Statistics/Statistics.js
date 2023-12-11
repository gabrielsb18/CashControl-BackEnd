import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import {Picker} from '@react-native-picker/picker';
import { useFonts } from "expo-font";
import React from "react";
import { Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import {ContentFlat,
  IconTransaction,
  DetailsTransaction,
  NameTransaction,
  SubtitleTransaction,
  AmountTransaction,
DataTransaction} from '../../src/Utils/style.ts';
import { useState, useEffect } from "react";
import { FlatList } from 'react-native-gesture-handler';
import { Footer } from '../../src/Utils/style.ts';
import { transactions } from '../../src/Utils/Transactions.js';
import { somarValores } from "../../src/Utils/Transactions.js";
import Header from "../../src/components/Header/Header";
import { useContext } from "react";
import { TransacaoContext } from "../../src/Contexts/TransacoesContext";
import { useFocusEffect } from '@react-navigation/native';

import { somarDespesas, somarReceitas } from "../../src/services/TransacoesService";

const Statistics = () => {
  const windowWidth = Dimensions.get('window').width;
  const {transacoes, listar, remover, listarPorTipo} = useContext(TransacaoContext);

  const [carregando, setCarregando] = useState (false)
  const [suaLista, setSuaLista] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setCarregando(true);
  //     try {
  //       await new Promise(resolve => setTimeout(resolve, 300));
  //       await listar();
  //     } catch (error) {
  //       console.error('Erro ao carregar dados:', error);
  //     } finally {
  //       setCarregando(false);
  //     }
  //   };
  
  //   fetchData();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setCarregando(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 300));
          await listar();
          setSuaLista(transacoes);
        } catch (error) {
          console.error('Erro ao carregar dados:', error);
        } finally {
          setCarregando(false);
        }
      };

      fetchData();

      return () => {
      };
    }, [listar, transacoes])
  );

  //Carrossel dos meses
  const mesesDoAno = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  const [selectedMonth, setSelectedMonth] = useState(mesesDoAno[0]);

  const renderMonths = () => {
    return mesesDoAno.map((month, index) => (
      <TouchableOpacity
        key={index}
        style={style.monthButton}
        onPress={() => setSelectedMonth(month)}
      >
        <Text style={style.monthButtonText}>{month}</Text>
      </TouchableOpacity>
    ));
  };

  
  const filterTransactionsByMonth = () => {
    if (selectedMonth === null) {
      // Retorna a lista completa se nenhum mês estiver selecionado
      return transactions;
    }
  
    // Retorna a lista filtrada apenas se um mês estiver selecionado
    return transactions.filter(item => item.month.startsWith(selectedMonth));
  };

  const [outraTransacao, SetOutraTransacao] = useState([]);
  const adicionarTransacao = (novaTransacao) => {
    SetOutraTransacao((transacoesAtuais) => [
      ...transacoesAtuais,
      novaTransacao,
    ]);
  };

  const [totalGastos, setTotalGastos] = useState("0.00");
  useEffect(() => {
    const obterTotalGastos = async () => {
      const total = await somarDespesas(transacoes);
      setTotalGastos(total);
    };

    obterTotalGastos();
  }, [transacoes]);

  //SearcBar
  const [list, setList] = useState(transacoes);
  const [searchQuery, setSearchQuery] = useState('');

  //Implementação da busca da minha lista // ANTIGA
  // useEffect(() => {
  //   if(searchQuery ==='') {
  //     setList(transacoes);
  //   } else {
  //     setList (
  //       transacoes.filter(transacoes => (transacoes.categoria.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 ||
  //       transacoes.valor.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
  //     ));
  //   }
  // },[searchQuery])

  useEffect(() => {
    if (searchQuery === '') {
      setList(transacoes);
    } else {
      setList(
        transacoes.filter(transacao =>
          transacao.categoria.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transacao.valor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transacao.data.includes(searchQuery)
        )
      );
    }
  }, [searchQuery, transacoes]);
  

  function setSearch(s) {
    return transactions.filter((d) => d.title.includes(s));
   }

  const [fontsLoaded] = useFonts({
    InterRegular: require("../../assets/Fonts/InterRegular.ttf"),
    InterMedium: require("../../assets/Fonts/InterMedium.ttf"),
    InterBold: require("../../assets/Fonts/InterBold.ttf"),
    InterLight: require("../../assets/Fonts/InterLight.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={style.container}>
      <Header title="Histórico" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.textTitle}>
          <Text
            style={{
              fontFamily: "InterLight",
              fontSize: 18,
              letterSpacing: -1,
            }}
          >
            Gastos do Mês
          </Text>
          <Text
            style={{ fontFamily: "InterBold", fontSize: 32, letterSpacing: -1 }}
          >
            R$ {totalGastos}
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../../assets/Images/Grafico.png")}
            style={style.imgGraph}
          />
        </View>
        <View style={style.scroolMonths}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={style.scrollView}
          >
            {renderMonths()}
          </ScrollView>
        </View>
        <View
          style={{
            padding: 15,
            paddingTop: 0,
            justifyContent: "center",
            alignItems: "center",
            //backgroundColor: 'red',
            // marginTop: -120
          }}
        >
          <Searchbar
            placeholder="Search"
            onChangeText={(s) => setSearchQuery(s)}
            value={searchQuery}
            style={{
              width: "100%",
              backgroundColor: "lightgray",
              borderRadius: 9,
              margin: "5%",
              marginBottom: 0,
            }}
          />
        </View>
        <View style={style.textsTr}>
          <Text style={style.TitleTr}>Transações</Text>
        </View>
        <Footer style={{ justifyContent: "center", alignItems: "center" }}>
          <FlatList
            style={{ width: "112%" }}
            data={list}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ContentFlat style={{ width: "100%" }}>
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
                {/* <AmountTransaction
                >
                  {item.valor}
                </AmountTransaction> */}
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
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },

  textTitle: {
    justifyContent: "row",
    alignItems: "center",
    padding: 20,
    marginTop: 22,
  },

  imgGraph: {
    alignItems: "center",
    justifyContent: "center",
    height: 213,
    width: 213,
  },

  expenses:{
    color:'red'
  },

  scroolMonths: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red',
    
    height: 50,
    width: 326,
    marginBottom: 14,
    marginLeft: '5%',
    marginRight: 0
  },

  scrollView: {
    height: 50,
    width: 335,
    marginTop: 20,
    //backgroundColor: 'red'
  },

  monthButton: {
    //backgroundColor: 'red',
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    height: 24
  },

  monthButtonText: {
    fontFamily: 'InterBold',
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default Statistics;