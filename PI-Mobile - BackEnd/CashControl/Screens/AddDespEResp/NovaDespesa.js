import { View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import React, { useState, useContext,useEffect } from "react";
import { TextInput } from "react-native-paper";
import {SelectList} from 'react-native-dropdown-select-list';
import { useFonts } from 'expo-font';
import { Checkbox } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import Header from "../../src/components/Header/Header";
import { enGB, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)
import { TextInputMask } from 'react-native-masked-text';

import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { TransacaoContext } from '../../src/Contexts/TransacoesContext';
import { transactions } from "../../src/Utils/Transactions";

import DropDownPicker from 'react-native-dropdown-picker';

//Validação do formulario
const schema = yup.object({
  nomeReceita: yup.string().required("Selecione o tipo da sua receita"),
  valorReceita: yup.string().required("Digite o valor da sua receita"),
  Descricao: yup.string().required("Digite sua descrição"),
  Date: yup.string().required("Digite a data para lembrete"),
})

const NovaReceita = () => {
  const {control, handleSubmit, formState: {errors}} = useForm ({
    resolver:yupResolver(schema)
  })

  function handleSignIn(data){
    navigation.goBack();
  }

  const navigation = useNavigation();
  const buttonNav = () => {
    navigation.navigate('Receitas')
  }

  const [checked, setChecked] = useState(null);
  const [selected, setSelected] = useState("");
  const [date, setDate] = useState("");
  // const [descricao, setDescricao] = useState("");
  // const [valor, setValor] = useState("");

  
  //Parei aqui
  const [categoria, setCategoria] = useState(null);
  const [valor, setValor] = useState();
  const [descricao, setDescricao] = useState();
  const [data, setData] = useState();
  const [icon, setIcon] = useState(null);

  const {adicionar} = useContext(TransacaoContext)

  //DropdownPicker
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([

    { key:'1',
      label: "Investimentos",
      value:'Investimentos',
      icon: () => <Image source={require('../../assets/Images/ReceitasIcons/IconInvestimentos.png')} style={style.iconStyle} />
    },

    {
    key:'2',
    label: "Salário",
    value:'Salário',
    icon: () => <Image source={require('../../assets/Images/ReceitasIcons/IconSalario.png')} style={style.iconStyle} />
    },

    {
      key:'3',
      label: "Pagamentos",
      value:'Pagamentos',
      icon: () => <Image source={require('../../assets/Images/ReceitasIcons/IconPagamentos.png')} style={style.iconStyle} />
    },

    {
      key:'4',
      label: "Vendas",
      value:'Vendas',
      icon: () => <Image source={require('../../assets/Images/ReceitasIcons/IconVendas.png')} style={style.iconStyle} />
    },
  ]);


  const [selectedIcon, setSelectedIcon] = useState(null);
  const handleSelect = (item) => {
    setSelectedIcon(item.icon);
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
    <>
      <Header title="Nova Despesa" />
      <View style={style.container}>
        <View>
          <View style={style.input}>
            {/* <Controller
              control={control}
              name="nomeReceita"
              render={({ field: { onChange, value } }) => (
                <SelectList
                  style={style.input}
                  setSelected={(val) => {
                    onChange(val);
                    setCategoria(val);  // Adicione esta linha para chamar setCategoria ao alterar o texto
                  }}
                  data={dataListReceitas}
                  save="value"
                  value={categoria}
                  placeholder="Categoria"
                  boxStyles={{
                    borderRadius: 10,
                    backgroundColor: "white",
                    borderWidth: 1.2,

                    borderWidth: errors.Descricao && 3,
                    borderColor: errors.Descricao && "red",
                  }}
                  inputStyles={{ fontSize: 15 }}
                  dropdownItemStyles={{
                    backgroundColor: "#9BF500",
                    flexDirection: "row",
                    borderRadius: 19,
                    height: 62,
                    marginBottom: 20,
                    marginLeft: 10,
                    marginRight: 10,
                    fontSize: 18,
                    alignItems: "center",
                  }}
                  maxHeight={300}
                />
              )}
            /> */}
            <Controller
              control={control}
              name="nomeReceita"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <DropDownPicker
                  open={open}
                  value={categoria}
                  items={items}
                  setOpen={setOpen}
                  setValue={setCategoria}
                  setItems={setItems}
                  placeholder="Selecione uma categoria"
                  placeholderStyle={{
                    fontWeight: "light",
                    fontFamily: "InterLight",
                    fontSize: 15,
                    color: "#828387",
                  }}
                  dropDownContainerStyle={{
                    backgroundColor: "#9BF500",
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 19,
                  }}
                  itemStyle={{
                    padding: 20,
                    borderRadius: 19,
                    marginBottom: 20,
                    borderWidth: errors.Descricao && 3,
                    borderColor: errors.Descricao && "red",
                  }}
                  onChange={(e) => setCategoriaReceita(e.target.value)}
                />
              )}
            />
          </View>

          <View>
            {/* Passei meu text input para dentero do controller */}
            <Controller
              control={control}
              name="valorReceita"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{ height: 45, marginBottom: 10 }}
                  mode="outlined"
                  outlineStyle={{
                    borderRadius: 10,
                    backgroundColor: "white",
                    borderWidth: 1.2,
                    borderWidth: errors.Descricao && 3,
                    borderColor: errors.Descricao && "red",
                  }}
                  //onChangeText={(text) => setValor(text)}
                  onChangeText={(text) => {
                    onChange(text); // Atualize o valor no react-hook-form
                    setValor(text); // Atualize o valor localmente
                  }}
                  render={(props) => (
                    <TextInputMask
                      {...props}
                      type={"money"}
                      options={{
                        maskType: "BRL",
                      }}
                    />
                  )}
                  value={valor}
                  keyboardType="phone-pad"
                  label="Valor"
                  activeOutlineColor="#75B700"
                  inputStyles={{ fontSize: 15, color: "#828387" }}
                />
              )}
            />
            {errors.valorReceita && (
              <Text style={style.labelError}>
                {errors.valorReceita?.message}
              </Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              name="Descricao"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{ marginBottom: 10, height: 45 }}
                  //onChangeText={(text) => setDescricao(text)}
                  onChangeText={(text) => {
                    onChange(text); // Atualize o valor no react-hook-form
                    setDescricao(text); // Atualize o valor localmente
                  }}
                  value={descricao}
                  outlineStyle={{
                    borderRadius: 10,
                    backgroundColor: "white",
                    borderWidth: 1.2,
                    color: "#828387",

                    borderWidth: errors.Descricao && 3,
                    borderColor: errors.Descricao && "red",
                  }}
                  mode="outlined"
                  label="Descrição"
                  activeOutlineColor="#75B700"
                  inputStyles={{ fontSize: 15, color: "#828387" }}
                />
              )}
            />
            {errors.Descricao && (
              <Text style={style.labelError}>{errors.Descricao?.message}</Text>
            )}
          </View>
          <View>
            {/* Passei meu text input para dentero do controller */}
            <Controller
              control={control}
              name="Date"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{ height: 45, marginBottom: 10 }}
                  mode="outlined"
                  outlineStyle={{
                    borderRadius: 10,
                    backgroundColor: "white",
                    borderWidth: 1.2,

                    borderWidth: errors.Descricao && 3,
                    borderColor: errors.Descricao && "red",
                  }}
                  render={(props) => (
                    <TextInputMask
                      {...props}
                      type={"datetime"}
                      options={{
                        format: "DD/MM/YYYY",
                      }}
                    />
                  )}
                  value={data}
                  //onChangeText={(text) => setData(text)}
                  onChangeText={(text) => {
                    onChange(text); // Atualize o valor no react-hook-form
                    setData(text); // Atualize o valor localmente
                  }}
                  label="Data"
                  activeOutlineColor="#75B700"
                  inputStyles={{ fontSize: 15, color: "#828387" }}
                />
              )}
            />
            {errors.Date && (
              <Text style={style.labelError}>{errors.Date?.message}</Text>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 50,
              width: 250,
              borderWidth: 0,
              borderRadius: 10,

              marginTop: 25,
              padding: 10,

              backgroundColor: "white",
            }}
          >
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
              color="green"
            />
            <Text>Lembrete</Text>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {/* Envolvi minhas duas chamadas de função em uma anonima */}
            <TouchableOpacity
              onPress={() => {
                adicionar(categoria, valor, descricao, data, icon, "despesa");
                //handleSubmit(handleSignIn)();
                handleSignIn(data);
              }}
            >
              <View style={style.Button}>
                <Text>Adicionar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    backgroundColor: "#f7f7f7",
  },

  input: {
    marginBottom: 10
  },

  inputDate: {
    height: 75,
    marginBottom: 10
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
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

  labelError: {
    alignSelf: 'flex-start',
    color: 'red',
    marginBottom: 10
  },

  iconStyle:{
    width: 36,
    height: 36,
  }
  
});

export default NovaReceita;