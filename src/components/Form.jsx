import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrency, SetExpenses } from '../actions/index';
import Input from './Input';
import Select from './Select';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { getMapCurrency } = this.props;
    getMapCurrency();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.state;
    const { addExpense, currencyFromGlobalStore, getMapCurrency } = this.props;
    this.setState({ id: id + 1 });
    addExpense({
      ...this.state,
      exchangeRates: currencyFromGlobalStore,
    });
    getMapCurrency();
    this.clearInputs();
  };

  setExchangeRates = () => {
    const { currencyFromGlobalStore } = this.props;
    this.setState({ exchangeRates: currencyFromGlobalStore });
  }

  currencyFromGlobalStoreTreatment = () => {
    const { currencyFromGlobalStore } = this.props;
    const result = Object.keys(currencyFromGlobalStore)
      .filter((actualCurrency) => actualCurrency !== 'USDT');
    return result;
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { handleChange, handleSubmit, currencyFromGlobalStoreTreatment } = this;
    const paymentMethods = ['Choose a payment method',
      'Cartão de crédito', 'Cartão de débito', 'Dinheiro'];
    const tags = ['Choose a tag',
      'Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Outros'];
    return (
      <form
        className="flex items-center justify-center"
      >
        <div
          className="flex flex-col items-center justify-center"
        >
          <Input
            name="value"
            value={ value }
            type="text"
            onChange={ (e) => handleChange(e) }
            placeholder="Value"
          />
          <Input
            name="description"
            value={ description }
            onChange={ (e) => handleChange(e) }
            placeholder="Description"
          />
        </div>
        <div
          className="flex flex-col items-center justify-center"
        >
          <Select
            id="currency"
            value={ currency }
            name="currency"
            onChange={ handleChange }
            options={ currencyFromGlobalStoreTreatment() }
            ariaLabel="Moeda"
          />
          <Select
            id="tag"
            value={ tag }
            name="tag"
            onChange={ handleChange }
            options={ tags }
            ariaLabel="Tag"
          />
        </div>
        <div
          className="flex flex-col items-center justify-center"
        >
          <Select
            id="method"
            value={ method }
            name="method"
            onChange={ handleChange }
            options={ paymentMethods }
            ariaLabel="Método de pagamento"
          />
          <button
            type="submit"
            onClick={ (e) => {
              handleSubmit(e);
            } }
            className="rounded-md px-8 py-2 font-bold mr-2 mb-2
            bg-blue-500 hover:bg-blue-600 active:scale-90
            duration-150 ease-in-out text-white hover:scale-110"
          >
            Adicionar despesa
          </button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  addExpense: PropTypes.func.isRequired,
  getMapCurrency: PropTypes.func.isRequired,
  currencyFromGlobalStore: PropTypes.shape({
    USD: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    currencyFromGlobalStore: state.wallet.currencies,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addExpense: (expense) => dispatch(SetExpenses(expense)),
    getMapCurrency: () => dispatch(getCurrency()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
