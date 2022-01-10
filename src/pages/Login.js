import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import Box from '@material-ui/core/Box';

class Login extends React.Component {
  render() {
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
                data-testid="email-input"
                variant="outlined"
                label="Email"
              />
            </Grid>
          </Box>
          <Grid item xs>
            <TextField
              data-testid="password-input"
              variant="outlined"
              label="Password"
            />
          </Grid>
          <Grid item xs>
            <Box mt={ 0.5 }>
              <Button
                variant="contained"
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
