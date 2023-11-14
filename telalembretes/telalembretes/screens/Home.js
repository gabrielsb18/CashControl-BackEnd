import { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, IconButton, List, FAB } from 'react-native-paper';

import { LembreteContext } from '../contexts/LembreteContext';

const Home = ({ navigation }) => {
  const { contatos, remover } = useContext(LembreteContext);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header theme={{colors:{primary:'#9BF500'}}}>
        <Appbar.Content title="Lembretes"/>
      </Appbar.Header>
      <ScrollView style={{ flex: 1 }}>
        {contatos.map((contato) => (
          <List.Item
          
            key={contato.id}
            title={contato.nome}
            description={contato.telefone}
            onPress={() =>
              navigation.navigate('Editar', { contatoId: contato.id })
            }
            right={(props) => (
              <IconButton
                {...props}
                icon="delete"
                onPress={() => {
                  remover(contato.id);
                }}
              />
            )}

            left={(props) => (
              <IconButton
                {...props}
                icon="delete"
              />
            )}
            
          />
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        style={{ position: 'absolute', right: 0, bottom: 0, margin: 16 }}
        onPress={() => navigation.navigate('Novo')}
      />
    </View>
  );
};

export default Home;
