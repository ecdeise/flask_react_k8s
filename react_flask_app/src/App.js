import React, {useState, useEffect} from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  IconButton,
} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';
import Login from './Login';
import Logout from './Logout';
import ContactApp from './ContactApp';
import Main from './Main';
import Footer from './Footer';
import SignUp from './Signup';

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
function App() {
  const [value, setValue] = useState(0);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('loggedIn') === 'true'
  );
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (!loggedIn) {
      setValue(2);
    }
  }, [loggedIn]);

  const handleLogin = (isLoggedIn, username) => {
    setLoggedIn(isLoggedIn);
    setUsername(username);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
  };

  const handleSignUp = (isLoggedIn, username) => {
    setLoggedIn(isLoggedIn);
    setUsername(username);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('username', username);
  };

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      setUsername(localStorage.getItem('username'));
    }
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          aria-label="tabs"
          variant={loggedIn ? 'standard' : 'fullWidth'}
          indicatorColor="primary"
        >
          <Tab
            label="Home"
            id="tab-0"
            aria-controls="tabpanel-0"
            disabled={!loggedIn}
          />
          <Tab
            label="Contact App"
            id="tab-1"
            aria-controls="tabpanel-1"
            disabled={!loggedIn}
          />

          <Tab
            label={loggedIn ? `Logout (${username})` : 'Login'}
            id="tab-2"
            aria-controls="tabpanel-2"
          />
          {!loggedIn && (
            <Tab label="Signup" id="tab-3" aria-controls="tabpanel-3" />
          )}

          <IconButton color="inherit">
            <AccountCircle />
            {loggedIn ? (
              <Typography variant="subtitle1">
                Logged in as {username}
              </Typography>
            ) : (
              <Typography variant="subtitle1">Logged out</Typography>
            )}
          </IconButton>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {loggedIn && <Main />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {loggedIn && <ContactApp />}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {!loggedIn && <SignUp onSignUp={handleSignUp} />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {loggedIn ? (
          <>
            <Typography variant="h6" gutterBottom>
              You are logged in as {username}
            </Typography>
            <Logout onLogout={handleLogout} username={username} />
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </TabPanel>
      <Footer />
    </div>
  );
}

export default App;
