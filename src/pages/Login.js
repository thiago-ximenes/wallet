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
      isDisabled: false,
    };
  }

  validatorEmail = (e) => {
    const { value } = e.target;
    if (validator.isEmail(value)) {
      this.setState({ isDisabled: true });


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { email, password, isDisabled } = this.state;
    const { handleChange } = this;
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
