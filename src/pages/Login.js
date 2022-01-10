import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';
import validator from 'validator';

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
    if (validator.isEmail(value)) {
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
    const { handleChange, validatorEmail } = this;
    return (
      <Box mt={ 5 }>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box mb={ 0.9 }>
            <Grid item xs>
              <TextField
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
            </Grid>
          </Box>
          <Grid item xs>
            <TextField
              value={ password }
              name="password"
              type="password"
              onChange={ handleChange }
              data-testid="password-input"
              variant="outlined"
              label="Password"
            />
          </Grid>
          <Grid item xs>
            <Box mt={ 0.5 }>
              <Button
                disabled={ isDisabled }
                color="primary"
                variant="contained"
                size="large"
                endIcon={ <ExitToAppIcon /> }
              >
                Entrar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Login;
