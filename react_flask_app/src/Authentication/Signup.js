import React, {useState} from 'react';
import {Typography, Button, Snackbar} from '@mui/material';
import axios from 'axios';
import config from '../config';

function SignUp({onSignUp}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const baseUrl = config.baseUrl;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSignUp = () => {
    axios
      .post(`${baseUrl}/auth/signup`, {
        username: username,
        password: password,
        email: email,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('access_token', response.data.access_token);
        onSignUp(true, username, password);

        setSnackbarMessage('Sign up successful');
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.log(error);

        // Show error message in snackbar
        const errorMessage = `Sign up failed: ${
          error.response?.data?.message || 'Sign up error!'
        }`;
        setSnackbarMessage(errorMessage);
        setOpenSnackbar(true);
      });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Sign Up
      </Typography>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleSignUp}>
          Sign Up
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
}

export default SignUp;
