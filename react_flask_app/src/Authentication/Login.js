import React, {useState} from 'react';
import {Grid, Paper, Typography, TextField, Button} from '@material-ui/core';
import axios from 'axios';
import config from '../config.json';

function Login({onLogin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const baseUrl = config[process.env.NODE_ENV].baseUrl;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    axios
      .post(`${baseUrl}/auth/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log('token granted');
        // console.log(response.data);
        sessionStorage.setItem('access_token', response.data.access_token);
        sessionStorage.setItem('user_id', response.data.user_id);
        sessionStorage.setItem('created_at', Date.now());
        onLogin(true, username, password);
        window.location.href = '/'; // redirect to home page
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{minHeight: '100vh'}}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{padding: '2rem'}}>
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
    </Grid>
  );
}

export default Login;
