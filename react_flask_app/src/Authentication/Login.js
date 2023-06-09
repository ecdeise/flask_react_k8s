import React, {useState} from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
} from '@mui/material';
import axios from 'axios';
import config from '../config';

import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: '2rem',
    width: '100%',
    maxWidth: '400px',
  },
}));

function Login({onLogin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const baseUrl = config.baseUrl;
  const classes = useStyles();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleLogin = () => {
    axios
      .post(`${baseUrl}/auth/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log('token granted');
        sessionStorage.setItem('access_token', response.data.access_token);
        sessionStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('loggedIn', true);

        onLogin(true, username, password);
        window.location.href = '/'; // Redirect to home page

        // Show success message in snackbar
        setSnackbarMessage('Logged in successfully');
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.log(error);

        // Show error message in snackbar
        setSnackbarMessage('Error logging in');
        setOpenSnackbar(true);
      });
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Login
          </Typography>
          <form>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Grid>
  );
}

export default Login;
