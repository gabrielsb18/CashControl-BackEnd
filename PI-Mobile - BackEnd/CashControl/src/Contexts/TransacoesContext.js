// TransacaoContext.js
import React, { createContext, useContext, useState } from 'react';
import {listarTransacoesPeloId, listarTodasTransacoes, criarTransacao, excluirTransacao, listarTodasTransacoesPorTipo, alterar} from "../services/TransacoesService"

const TransacaoContext = createContext();

const TransacaoProvider = ({ children }) => {
  const [transacoes, setTransacoes] = useState([]);

  const adicionar = async(tipo, categoria, valor, descricao, data, icon) => {
    try{
        const novaTransacao = await criarTransacao(tipo, categoria, valor, descricao, data, icon);
        setTransacoes([...transacoes, novaTransacao]);
    } catch {
        console.log(error.message)
    }
}

  //funções para excluir, listar, etc.
  const listar = async() => {
    try {
        const listaAtualizada = await listarTodasTransacoes();
        setTransacoes(listaAtualizada)
    } catch(error) {
        console.log(error.message)
    }
  }

  const listarPorTipo = async (tipo) => {
    try {
        //console.log('Chamando listarPorTipo com tipo:', tipo);
        const listaAtualizada = await listarTodasTransacoesPorTipo(tipo);
        //console.log('Lista atualizada:', listaAtualizada);
        setTransacoes(listaAtualizada);
    } catch (error) {
        console.log('Erro em listarPorTipo:', error.message);
    }
};

  
  const buscar = async(id) => {
    try {
        return await listarTransacoesPeloId(id)
    } catch (error){
        console.log(error.message)
    }
  }

  const remover = async(id) => {
    try {
        await excluirTransacao(id);
        const index = transacoes.findIndex((transacoes) => transacoes.id === id);
        transacoes.splice(index, 1)
        setTransacoes([...transacoes])
    } catch (error) {
        console.log(error.message)
    }
  }

  const atualizar = async (id, categoria, valor, descricao, data,) => {
    try {
      const transacaoAtualizada = await alterar(id, categoria, valor, descricao, data);
      const listaAtualizada = transacoes.map((transacoes) =>
      transacoes.id === id ? transacaoAtualizada : transacoes
      );
      setContatos(listaAtualizada);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <TransacaoContext.Provider value={{ transacoes, adicionar, buscar, remover, listar, listarPorTipo, atualizar }}>
      {children}
    </TransacaoContext.Provider>
  );
};

export default TransacaoProvider;
export {TransacaoContext};
