import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

const TextInputExample = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F7F7F7',
    height: 50,
    marginTop: 17,
    marginHorizontal: 16,
    padding: 15,
    borderRadius: 10,
    borderColor: 'lightgray',
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'InterRegular',
    fontSize: 14,
  },
});

export default TextInputExample;