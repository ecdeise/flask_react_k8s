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
import Login from './Authentication/Login';
import Logout from './Authentication/Logout';
import ContactApp from './Contact/ContactApp';
import Main from './Main';
import Footer from './Footer';
import SignUp from './Authentication/Signup';
import LibraryApp from './Library/LibraryApp';
import config from './config';
import {checkSession} from './Authentication/session';
import RecipeMain from './Recipe/RecipeMain';

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

  // useEffect(() => {
  //   checkSession;
  //   if (!loggedIn) {
  //     setValue(2);
  //   }
  // }, [loggedIn]);

  useEffect(() => {
    const checkSessionInterval = setInterval(() => {
      const valid_session = checkSession();
      setLoggedIn(valid_session);
      if (!loggedIn) {
        setValue(2);
      }
    }, 1 * 60 * 1000); // Check session every 5 minutes

    return () => clearInterval(checkSessionInterval); // Clear the interval on unmount
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
      <TabPanel value={value} index={2}>
        {loggedIn && <LibraryApp />}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {loggedIn && <RecipeMain />}
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
      <Footer />
    </div>
  );
}

export default App;
