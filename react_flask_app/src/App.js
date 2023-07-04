import React, {useState, useEffect} from 'react';
import {AppBar, Tabs, Tab, Typography, Box, IconButton} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SignUp from './Authentication/Signup';
import Login from './Authentication/Login';
import Logout from './Authentication/Logout';
import Main from './Main';
import Footer from './Footer';
import ContactApp from './Contact/ContactApp';
import LibraryApp from './Library/LibraryApp';
import RecipeMain from './Recipe/RecipeMain';
import config from './config';

console.log(process.env.NODE_ENV);
const baseUrl = config.baseUrl;
console.log(`baseurl: ${baseUrl}`);

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      style={{width: '100%', flexGrow: 1}}
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
    const checkTokenExpiration = () => {
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        // Token not found or expired
        setLoggedIn(false);
        return false;
      }

      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (currentTimestamp >= tokenData.exp) {
        // Token has expired
        // Perform any necessary actions (e.g., logout, redirect to login page)
        console.log('Token has expired');
        setLoggedIn(false);
        setValue(2);
        return false;
      }

      // Token is valid
      console.log('Token valid');
      setLoggedIn(true);
      return true;
    };

    // Check token expiration every 5 minutes
    const intervalId = setInterval(() => {
      checkTokenExpiration();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
      <AppBar position="static" style={{backgroundColor: '#D0D3D4'}}>
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
            label="Contacts"
            id="tab-1"
            aria-controls="tabpanel-1"
            disabled={!loggedIn}
          />
          <Tab
            label="Library"
            id="tab-2"
            aria-controls="tabpanel-2"
            disabled={!loggedIn}
          />
          <Tab label="Recipes" id="tab-3" aria-controls="tabpanel-3" />
          <Tab
            label={loggedIn ? `Logout (${username})` : 'Login'}
            id="tab-4"
            aria-controls="tabpanel-4"
          />
          {!loggedIn && (
            <Tab label="Signup" id="tab-5" aria-controls="tabpanel-5" />
          )}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {loggedIn && <Main />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {loggedIn && <ContactApp />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {loggedIn && <LibraryApp />}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {loggedIn && <RecipeMain username={username} />}
      </TabPanel>
      <TabPanel value={value} index={5}>
        {!loggedIn && <SignUp onSignUp={handleSignUp} />}
      </TabPanel>
      <TabPanel value={value} index={4}>
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
      <Footer loggedIn={loggedIn} username={username} />
    </div>
  );
}

export default App;
