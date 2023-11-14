import { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, Button, TextInput, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';

import { LembreteContext } from '../contexts/LembreteContext';

const Editar = ({ route, navigation }) => {
  const { contatoId } = route.params;

  const { buscar, atualizar } = useContext(LembreteContext);

  const contato = buscar(contatoId);

  console.log(contato);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: contato.nome,
      telefone: contato.telefone,
    },
  });

  const onSubmit = (data) => {
    atualizar(contatoId, data);
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
        <Appbar.Content title="Editar Lembrete" />
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
              keyboardType="phone-pad"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <HelperText type="error" visible={true}>
          {errors.telefone && errors.telefone.message}
        </HelperText>
        <Button mode="contained" onPress={handleSubmit(onSubmit)} theme={{colors:{primary:'#75B700'}}}>
          Salvar
        </Button>
      </ScrollView>
    </View>
  );
};

export default Editar;