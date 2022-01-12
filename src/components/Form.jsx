import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrency, SetExpenses } from '../actions/index';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
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
      currency: '',
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

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencyFromGlobalStore } = this.props;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <input
          name="value"
          value={ value }
          type="text"
          data-testid="value-input"
          onChange={ (e) => handleChange(e) }
        />
        <input
          name="description"
          value={ description }
          data-testid="description-input"
          onChange={ (e) => handleChange(e) }
        />
        <select
          value={ currency }
          name="currency"
          data-testid="currency-input"
          onChange={ (e) => handleChange(e) }
        >
          <option value="">Choose a currency</option>
          { Object.keys(currencyFromGlobalStore).map((actualCurrency) => (
            <option
              key={ actualCurrency }
              value={ actualCurrency }
            >
              { actualCurrency }
            </option>
          )) }
          <option value="BRL">BRL</option>
        </select>
        <select
          value={ method }
          name="method"
          data-testid="method-input"
          onChange={ handleChange }
        >
          <option value="">Choose a payment method</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
          <option value="Dinheiro">Dinheiro</option>
        </select>
        <select
          value={ tag }
          name="tag"
          id=""
          data-testid="tag-input"
          onChange={ handleChange }
        >
          <option value="">Choose a tag</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Lazer">Lazer</option>
          <option value="Saúde">Saúde</option>
          <option value="Transporte"> Transporte</option>
        </select>
        <button
          type="submit"
          onClick={ (e) => {
            handleSubmit(e);
          } }
        >
          Adicionar despesa
        </button>
      </div>
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
