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
      <div
        className="text-gray-700"
      >
        <h2
          className="text-center font-semibold text-2xl italic"
          data-testid="email-field"
        >
          { email }
          teste
        </h2>
        <div
          className="flex justify-end p-3"
        >
          <span
            data-testid="total-field"
            className="bg-blue-500 shadow-sm text-white
            font-bold text-2xl p-2 rounded-lg italic
            "
          >
            { Number(totalExpenses()).toFixed(2) }

          </span>
          <span
            data-testid="header-currency-field"
            className="italic text-sm text-gray-500 pl-1"
          >
            BRL

          </span>
        </div>
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
