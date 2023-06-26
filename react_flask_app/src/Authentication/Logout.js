import React, {useState} from 'react';
import {Button, Snackbar} from '@mui/material';
import axios from 'axios';
import config from '../config';

function Logout({onLogout, username}) {
  const baseUrl = config.baseUrl;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleLogout = async () => {
    axios
      .post(`${baseUrl}/auth/logout`, {
        username: username,
      })
      .then((response) => {
        console.log(response.data.logged_out);
        onLogout(response.data.logged_out, username);
        localStorage.clear();
        sessionStorage.clear();

        // Show success message in snackbar
        setSnackbarMessage('Logged out successfully');
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.log(error);
        console.error(error.response.data);
        setSnackbarMessage('Error logging out');
        setOpenSnackbar(true);
      });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
}

export default Logout;
