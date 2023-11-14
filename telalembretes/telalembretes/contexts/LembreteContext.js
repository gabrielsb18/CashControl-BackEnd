import { createContext, useState } from 'react';

const LembreteContext = createContext();

const LembreteProvider = ({ children }) => {
  const [contatos, setContatos] = useState([
  ]);

  const adicionar = ({ nome, telefone }) => {
    const contatoNovo = { id: contatos.length + 1, nome, telefone };
    setContatos([...contatos, contatoNovo]);
  };

  const buscar = (id) => {
    return contatos.find((contato) => contato.id === id);
  };

  const atualizar = (id, { nome, telefone }) => {
    const contatoAtualizado = { id, nome, telefone };
    const listaAtualizada = contatos.map((contato) =>
      contato.id === id ? contatoAtualizado : contato
    );
    setContatos(listaAtualizada);
  };

  const remover = (id) => {
    const listaAtualizada = contatos.filter((contato) => contato.id !== id)
    setContatos(listaAtualizada);
  }

  return (
    <LembreteContext.Provider value={{ contatos, adicionar, buscar, atualizar, remover }}>
      {children}
    </LembreteContext.Provider>
  );
};

export default LembreteProvider;
export { LembreteContext };