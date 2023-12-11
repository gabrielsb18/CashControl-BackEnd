import axios from 'axios';
import BigDecimal from 'bigdecimal';

const BASE_URL = "https://cash-control---back-end-default-rtdb.firebaseio.com/"

//Get listar todos contatos
const listarTransacoesPeloId = async (id) => {
    try {
        const response = await axios.get (`${BASE_URL}/transacoes/data/${id}.json`);
        console.log(response.data)
        return {id, ...response.data}
    }catch (error) {
        console.log(error)
    }
}

//Get listar um contato
const listarTodasTransacoes = async () => {
    try {
      const transacoes = [];
      const response = await axios.get(`${BASE_URL}/transacoes/data.json`);
  
      for (name in response.data) {
        transacoes.push({ id: name, ...response.data[name] });
      }
  
      return transacoes;
    } catch (error) {
      console.error(error);
      // Trate o erro conforme necessário
    }
}

//Post criar um contato
const criarTransacao = async(categoria, valor, descricao, data, icon) => {
    try {
        const response = await axios.post(`${BASE_URL}/transacoes/data.json`,{
            categoria,
            valor,
            descricao,
            data,
            icon,
        });
        return {id: response.data.name, categoria, valor, descricao, data, icon };
    }catch (error) {
        console.log(error)
    }
}

const excluirTransacao = async(id) => {
    try {
        await axios.delete(`${BASE_URL}/transacoes.data.json?name = ${id}.json`)
    }catch (error) {
        console.log(error)
    }
}

export const somarValoresFirebase = async () => {
    try {
      const transactions = await listarTodasTransacoes();
  
      if (!transactions || transactions.length === 0) {
        return '0.00';
      }
  
      const total = transactions.reduce((acc, transaction) => {
        const valorNumerico = parseFloat(
          transaction.valor
            .replace(/[^\d,-]/g, '') // Remove caracteres não numéricos, exceto vírgulas e hífens
            .replace(',', '.') // Substitui vírgula por ponto
        );
  
        // Verifica se é um número válido antes de somar
        return !isNaN(valorNumerico) ? acc + valorNumerico : acc;
      }, 0);
  
      return total.toFixed(2);
    } catch (error) {
      console.error('Erro ao obter dados do Firebase:', error);
      return '0.00';
    }
  };
  
export {listarTransacoesPeloId, listarTodasTransacoes, criarTransacao, excluirTransacao};