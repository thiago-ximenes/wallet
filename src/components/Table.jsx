import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <table>
        <tr>
          <th>
            Descrição
          </th>
          <th>
            Tag
          </th>
          <th>
            Método de pagamento
          </th>
          <th>
            Valor
          </th>
          <th>
            Moeda
          </th>
          <th>
            Câmbio utilizado
          </th>
          <th>
            Valor convertido
          </th>
          <th>
            Moeda de conversão
          </th>
          <th>
            Editar/Excluir
          </th>
        </tr>
        { expenses.length > 0 && expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value }</td>
            <td>
              { expense.exchangeRates[expense.currency]
                .name.replace('/Real Brasileiro', '')}
            </td>
            <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
            <td>
              {(Number(expense
                .exchangeRates[expense.currency]
                .ask) * Number(expense.value)).toFixed(2)}
            </td>
            <td>Real</td>
          </tr>
        )) }
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropsTypes.arrayOf(PropsTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(Table);
