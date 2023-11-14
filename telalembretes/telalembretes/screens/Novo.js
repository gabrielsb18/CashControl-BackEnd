import { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, Button, TextInput, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';

import { LembreteContext } from '../contexts/LembreteContext';

const Novo = ({ navigation }) => {
  const { adicionar } = useContext(LembreteContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    adicionar(data);
    navigation.pop();
  };

  const rulesNome = {
    required: { value: true, message: 'Campo obrigatório' },
  };

  const rulesTelefone = {
    required: { value: true, message: 'Campo obrigatório' },
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header theme={{colors:{primary:'#9BF500'}}}>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title="Novo Lembrete" />
      </Appbar.Header>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Controller
          name="nome"
          control={control}
          rules={rulesNome}
          render={({ field: { value, onChange } }) => (
            <TextInput label="Título" value={value} onChangeText={onChange} />
          )}
        />
        <HelperText type="error" visible={true}>
          {errors.nome && errors.nome.message}
        </HelperText>
        <Controller
          name="telefone"
          control={control}
          rules={rulesTelefone}
          render={({ field: { value, onChange } }) => (
            <TextInput
              label="Data"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <HelperText type="error" visible={true}>
          {errors.telefone && errors.telefone.message}
        </HelperText>
        <Button theme={{colors:{primary:'#75B700'}}} mode="contained" onPress={handleSubmit(onSubmit)}>
          Salvar
        </Button>
      </ScrollView>
    </View>
  );
};

export default Novo;
