import PropsTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateExpense } from '../actions';
import { paymentMethods, tags } from '../data/optionsToSelect';
import edit from '../helpers/editIcon';
import Input from './Input';
import Select from './Select';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editId: null,
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      setInitialState: true,
    };
  }

  deleteExpenseFromStore = (event, expense) => {
    const { expenses, updateRow } = this.props;
    const newExpenses = expenses.filter((item) => item.id !== expense.id);
    updateRow(newExpenses);
    event.target.parentNode.remove();
  };

  clearInputs = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    });
  };

  editExpenseFromStore = (expense, index) => {
    const { value, description, currency, method } = this.state;
    const { expenses, updateRow } = this.props;
    expense.value = value;
    expense.description = description;
    expense.currency = currency;
    expense.method = method;
    expenses.splice(index, 1, expense);
    updateRow(expenses);
    this.setState({ editId: null });
    this.clearInputs();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  currencyFromGlobalStoreTreatment = () => {
    const { currencyFromGlobalStore } = this.props;
    const result = Object.keys(currencyFromGlobalStore)
      .filter((actualCurrency) => actualCurrency !== 'USDT');
    return result;
  }

  setEdit = (expense, index) => {
    const { value, description, currency, method, tag, setInitialState } = this.state;
    const { handleChange, currencyFromGlobalStoreTreatment } = this;
    console.log(expense.description);
    if (setInitialState) {
      this.setState({
        description: expense.description,
        value: expense.value,
        currency: expense.currency,
        method: expense.method,
        tag: expense.tag,
        setInitialState: false,
      });
    }
    return (
      <td
        colSpan={ 9 }
      >
        <div
          className="flex items-center justify-center m-2"
        >
          <Input
            name="description"
            value={ description }
            onChange={ (e) => handleChange(e) }
            placeholder="Descri????o"
            type="text"
          />
          <Select
            id="method"
            value={ method }
            name="method"
            onChange={ handleChange }
            options={ paymentMethods }
            ariaLabel="M??todo de pagamento"
          />
          <Input
            name="value"
            value={ value }
            type="number"
            onChange={ (e) => handleChange(e) }
            placeholder="Valor"
          />
          <Select
            id="tag"
            value={ tag }
            name="tag"
            onChange={ handleChange }
            options={ tags }
            ariaLabel="Tag"
          />
          <Select
            id="currency"
            value={ currency }
            name="currency"
            onChange={ handleChange }
            options={ currencyFromGlobalStoreTreatment() }
            ariaLabel="Moeda"
          />
          <button
            type="button"
            className="hover:bg-green-500
                hover:text-white rounded-full px-4 py-2
              active:scale-110"
            onClick={ () => {
              this.setState({ setInitialState: true });
              this.editExpenseFromStore(expense, index);
            } }
          >
            { edit }
          </button>
        </div>
      </td>
    );
  }

  render() {
    const { editId } = this.state;
    const { expenses } = this.props;
    const { deleteExpenseFromStore, setEdit } = this;
    const tableTitle = ['Descri????o', 'Tag', 'M??todo de pagamento',
      'Valor', 'Moeda', 'C??mbio utilizado', 'Valor convertido',
      'Moeda de convers??o', 'Editar/Excluir'];
    return (
      <div>
        <table
          border={ 1 }
          className="table-fixed bg-white shadow-md rounded-lg
          mx-auto mt-4 overflow-hidden"
        >
          <thead
            className=""
          >
            {
              tableTitle.map((item) => (
                <th
                  className="p-2 border-b border-gray-200 bg-gray-100
                  text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  key={ item }
                >
                  {item}
                </th>
              ))
            }
          </thead>
          { expenses.length > 0 && expenses.map((expense, index) => (
            <tbody
              className="bg-white divide-y divide-gray-200
              font-mono text-sm text-gray-700 p-2 border-b border-gray-200
              text-center"
              key={ expense.id }
            >
              {expense.id === editId ? setEdit(expense, index) : (
                <>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ expense.value }</td>
                  <td>
                    { expense.exchangeRates[expense.currency]
                      .name.replace('/Real Brasileiro', '')}
                  </td>
                  <td>
                    { Number(expense.exchangeRates[expense.currency]
                      .ask).toFixed(2) }

                  </td>
                  <td>
                    {(Number(expense
                      .exchangeRates[expense.currency]
                      .ask) * Number(expense.value)).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      onClick={ () => this.setState({
                        editId: expense.id,
                      }) }
                      className="hover:bg-yellow-500
                      hover:text-white rounded-full px-4 py-2 active:scale-110"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={ 2 }
                          d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0
                      001.414.586H19a2 2 0 002-2V7a2 2 0
                      00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={ (event) => deleteExpenseFromStore(event, expense) }
                      className="hover:bg-red-500 hover:text-white rounded-full px-4 py-2
                    active:scale-110"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2
                        0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1
                        1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </>
              )}

            </tbody>
          )) }
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropsTypes.arrayOf(PropsTypes.object).isRequired,
  updateRow: PropsTypes.func.isRequired,
  currencyFromGlobalStore: PropsTypes.shape.isRequired,
};

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
    currencyFromGlobalStore: state.wallet.currencies,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateRow: (expense) => dispatch(updateExpense(expense)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
