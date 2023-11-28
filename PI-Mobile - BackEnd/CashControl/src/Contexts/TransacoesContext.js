// TransacaoContext.js
import React, { createContext, useContext, useState } from 'react';
import {listarTransacoesPeloId, listarTodasTransacoes, criarTransacao, excluirTransacao} from "../services/TransacoesService"

const TransacaoContext = createContext();

const TransacaoProvider = ({ children }) => {
  const [transacoes, setTransacoes] = useState([]);

  const adicionar = async(categoria, valor, descricao, data) => {
    try{
        const novaTransacao = await criarTransacao(categoria, valor, descricao, data);
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
        const index =transacoes.findIndex((transacoes) => transacoes.id === id);
        transacoes.splice(index, 1)
        setTransacoes([...transacoes])
    } catch (error) {
        console.log(error.message)
    }
  }

  
  return (
    <TransacaoContext.Provider value={{ transacoes, adicionar, remover, buscar, listar }}>
      {children}
    </TransacaoContext.Provider>
  );
};

export default TransacaoProvider;
export {TransacaoContext};
