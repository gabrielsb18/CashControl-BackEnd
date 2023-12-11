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

const listarTodasTransacoesPorTipo = async (tipo) => {
  try {
    const transacoes = [];
    const response = await axios.get(`${BASE_URL}/transacoes/data.json`);

    for (const transactionId in response.data) {
      const transaction = response.data[transactionId];

      // Verifica se o tipo da transação é o mesmo que o fornecido
      if (transaction.tipo === tipo) {
        transacoes.push({ id: transactionId, ...transaction });
      }
    }

    return transacoes;
  } catch (error) {
    console.error(error);
  }
};

// const criarTransacao = async(categoria, valor, descricao, data, icon) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/transacoes/data.json`,{
//             categoria,
//             valor,
//             descricao,
//             data,
//             icon,
//         });
//         return {id: response.data.name,categoria, valor, descricao, data, icon };
//     }catch (error) {
//         console.log(error)
//     }
// }

const criarTransacao = async (categoria, valor, descricao, data, icon, tipo) => {
  try {
      const response = await axios.post(`${BASE_URL}/transacoes/data.json`, {
          tipo,
          categoria,
          valor,
          descricao,
          data,
          icon,
      });
      return { id: response.data.name, tipo, categoria, valor, descricao, data, icon };
  } catch (error) {
      console.log(error);
  }
}


// const excluirTransacao = async(id) => {
//     try {
//         await axios.delete(`${BASE_URL}/transacoes.data.json?name=${id}.json`)
//     }catch (error) {
//         console.log(error)
//     }
// }

const excluirTransacao = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/contatos/data/${id}.json`);
  } catch (error) {
    console.log(error);
  }
};


//SOMA TODOS OS OBJETOS
// export const somarValoresFirebase = async () => {
//     try {
//       const transactions = await listarTodasTransacoes();
  
//       if (!transactions || transactions.length === 0) {
//         return '0.00';
//       }
  
//       const total = transactions.reduce((acc, transaction) => {
//         const valorNumerico = parseFloat(
//           transaction.valor
//             .replace(/[^\d,-]/g, '') // Remove caracteres não numéricos, exceto vírgulas e hífens
//             .replace(',', '.') // Substitui vírgula por ponto
//         );
  
//         // Verifica se é um número válido antes de somar
//         return !isNaN(valorNumerico) ? acc + valorNumerico : acc;
//       }, 0);
  
//       return total.toFixed(2);
//     } catch (error) {
//       console.error('Erro ao obter dados do Firebase:', error);
//       return '0.00';
//     }
//   };
  
//SOMA TSOMENTE OS OBJETOS DO TIPO DESPESA
export const somarDespesas = async (transacoes) => {
  try {
    // Filtra apenas as transações do tipo "despesa"
    const despesas = transacoes.filter(transaction => transaction.tipo === 'despesa');

    if (!despesas || despesas.length === 0) {
      return '0.00';
    }

    const total = despesas.reduce((acc, transaction) => {
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

export const somarReceitas = async (transacoes) => {
  try {
    // Filtra apenas as transações do tipo "receita"
    const receitas = transacoes.filter(transaction => transaction.tipo === 'receita');

    if (!receitas || receitas.length === 0) {
      return '0.00';
    }

    const total = receitas.reduce((acc, transaction) => {
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

const alterar = async (id,categoria, valor, descricao, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/transacoes/data/${id}.json`, {
      categoria,
      valor,
      descricao,
      data
    });
    return { id, ...response.data };
  } catch (error) {
    console.log(error);
  }
};

export {listarTransacoesPeloId, listarTodasTransacoes, criarTransacao, excluirTransacao, listarTodasTransacoesPorTipo, alterar};