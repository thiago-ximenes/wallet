import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      expenses: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { expenses } = this.state;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{`Despesas Totais de Gasto: ${expenses}`}</p>
        <div data-testid="header-currency-field">BRL</div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
