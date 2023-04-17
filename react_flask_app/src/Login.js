import React, {useState} from 'react';
import {Typography, Button} from '@material-ui/core';
import axios from 'axios';
import config from './config.json';

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
        onLogin(true, username, password);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Login
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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </form>
    </>
  );
}

export default Login;
