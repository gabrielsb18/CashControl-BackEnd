import axios from 'axios';

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
      const response = await axios.get(`${BASE_URL}/contatos/data.json`);
  
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
const criarTransacao = async(categoria, valor, descricao, data) => {
    try {
        const response = await axios.post(`${BASE_URL}/transacoes/data.json`,{
            categoria,
            valor,
            descricao,
            data
        });
        return {id: response.data.name, categoria, valor, descricao, data };
    }catch (error) {
        console.log(error)
    }
}

const excluirTransacao = async(id) => {
    try {
        await axios.delete(`${BASE_URL}/contatos.data.json?name = ${id}.json`)
    }catch (error) {
        console.log(error)
    }
}

export {listarTransacoesPeloId, listarTodasTransacoes, criarTransacao, excluirTransacao};