import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <input value={ value } type="text" data-testid="value-input" />
        <input value={ description } type="text" data-testid="description-input" />
        <select value={ currency } name="currency" data-testid="currency-input">
          <option value="USD">USD</option>
        </select>
        <select
          value={ method }
          name="method"
          data-testid="method-input"
        >
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
          <option value="Dinheiro">Dinheiro</option>
        </select>
        <select value={ tag } name="tag" id="" data-testid="tag-input">
          <option value="Alimentação">Alimentação</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Lazer">Lazer</option>
          <option value="Saúde">Saúde</option>
          <option value="Transporte"> Transporte</option>
        </select>
        <button
          type="button"
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

export default connect(null, null)(Form);
