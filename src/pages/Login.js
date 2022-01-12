import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import setEmail from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
      isEmailValid: false,
      isPasswordValid: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { isEmailValid, isPasswordValid } = this.state;
    if (prevState.isEmailValid !== isEmailValid) {
      this.checkDisabled();
    }
    if (prevState.isPasswordValid !== isPasswordValid) {
      this.checkDisabled();
    }
  }

  validatorEmail = (e) => {
    const { value } = e.target;
    const isEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (isEmailValid) {
      this.setState({ isEmailValid: true });
    } else {
      this.setState({ isEmailValid: false });
    }
  };

  checkPassword = (event) => {
    const SIX = 6;
    if (event.length >= SIX) {
      this.setState({ isPasswordValid: true });
    } else {
      this.setState({ isPasswordValid: false });
    }
  };

  checkDisabled = () => {
    const { isEmailValid, isPasswordValid } = this.state;
    if (isEmailValid && isPasswordValid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/carteira');
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (event.target.name === 'password') {
      this.checkPassword(event.target.value);
    }
  };

  render() {
    const { email, password, isDisabled } = this.state;
    const { handleChange, validatorEmail, handleClick } = this;
    const { dispatchEmail } = this.props;
    return (

      <div>
        <input
          name="email"
          onChange={ (e) => {
            handleChange(e);
            validatorEmail(e);
          } }
          value={ email }
          data-testid="email-input"
          variant="outlined"
          label="Email"
        />

        <input
          value={ password }
          name="password"
          type="password"
          onChange={ handleChange }
          data-testid="password-input"
          variant="outlined"
          label="Password"
        />

        <button
          type="button"
          onClick={ () => {
            handleClick();
            dispatchEmail(email);
          } }
          disabled={ isDisabled }
          // color="primary"
          // variant="contained"
          // size="large"
          // endIcon={ <ExitToAppIcon /> }
        >
          Entrar
        </button>
      </div>

    );
  }
}

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatchEmail: (state) => dispatch(setEmail(state)),
  };
}

export default connect(null, mapDispatchToProps)(Login);
