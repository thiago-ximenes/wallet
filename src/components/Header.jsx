import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      const total = expenses.reduce((acc, curr) => {
        const { value, currency, exchangeRates } = curr;
        const exchangeAsk = exchangeRates[currency].ask;
        const sumValue = value * exchangeAsk;
        return acc + sumValue;
      }, 0);
      return total;
    }
    return 0;
  }

  render() {
    const { email } = this.props;
    const { totalExpenses } = this;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ Number(totalExpenses()).toFixed(2) }</p>
        <div data-testid="header-currency-field">BRL</div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
