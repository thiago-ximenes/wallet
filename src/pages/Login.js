import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setEmail } from '../actions/index';

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

  handleClick = (event) => {
    event.preventDefault();
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

      <div
        className="h-screen w-screen flex bg-gray-200"
      >
        <form
          className="max-w-lg w-full bg-green-300 m-auto rounded
          p-8 h-auto max-h-full shadow-lg"
        >
          <header>
            <h1 className="text-center text-5xl font-bold mb-7 text-green-700 italic">
              LOGIN
            </h1>
          </header>
          <div>
            <h2
              className="block mb-2 text-green-700 font-bold"
            >
              Email
            </h2>
            <input
              type="email"
              id="email"
              className="w-full p-1 mb-6 text-green-700
              border-b-2 border-green-700 shadow-lg"
              name="email"
              onChange={ (e) => {
                handleChange(e);
                validatorEmail(e);
              } }
              value={ email }
              data-testid="email-input"
            />
          </div>
          <h2
            className="block mb-2 text-green-700 font-bold
            "
          >
            Senha
          </h2>
          <input
            className="w-full p-1 mb-6 text-green-700 border-b-2
            border-green-700 shadow-lg"
            value={ password }
            name="password"
            type="password"
            onChange={ handleChange }
            data-testid="password-input"
            variant="outlined"
            label="Password"
          />
          <button
            className="w-full
            bg-green-900 text-white hover:bg-green-600
            font-bold py-2 px-4 rounded-lg cursor-pointer mb-8 shadow-lg
            disabled:opacity-25"
            type="submit"
            onClick={ (event) => {
              handleClick(event);
              dispatchEmail(email);
            } }
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
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
