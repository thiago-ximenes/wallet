import PropsTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class Table extends Component {
  deleteExpenseFromStore = (event, expense) => {
    // delete row from table
    const { expenses, deleteRow } = this.props;
    const newExpenses = expenses.filter((item) => item.id !== expense.id);
    console.log(newExpenses);
    deleteRow(newExpenses);
    event.target.parentNode.remove();
  };

  render() {
    const { expenses } = this.props;
    const { deleteExpenseFromStore } = this;
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
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ (event) => deleteExpenseFromStore(event, expense) }
              >
                Delete
              </button>
            </td>
          </tr>
        )) }
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropsTypes.arrayOf(PropsTypes.object).isRequired,
  deleteRow: PropsTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteRow: (expense) => dispatch(deleteExpense(expense)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
