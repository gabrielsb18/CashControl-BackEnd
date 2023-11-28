import IconAlimento from '../../assets/Images/IconAlimento.png';
import IconVariedade from '../../assets/Images/IconVariedade.png'

export const transactions = [
  
  {
    id: '1',
    title: 'Alimentação',
    subtitle: 'Compra do Mês',
    Amount: '800,00',
    type: 0, // 1 para receita e 0 para despesa
    Icon: IconAlimento,
    month: 'Jan', // Adicione a propriedade month
  },

  {
    id: '2',
    title: 'Assinatura',
    subtitle: 'HBO Max',
    Amount: '34,90',
    type: 0,
    Icon: IconVariedade,
    month: 'Fev', // Adicione a propriedade month
  },
]

//Função responsável por somar os valores da lista
export const somarValores = (transactions) => {
    if (!transactions || transactions.length === 0) {
      return '0.00';
    }
  
    const total = transactions.reduce((acc, transaction) => {
      const valorNumerico = parseFloat(transaction.Amount.replace(',', '.')) || 0;
      return acc + valorNumerico;
    }, 0);
  
    return total.toFixed(2);
  };