export const checkSession = () => {
  console.log('Checking Session');
  const sessionToken = sessionStorage.getItem('access_token');
  if (!sessionToken) {
    console.log('No Valid Token');
    localStorage.setItem('loggedIn', false);
    // User is not authenticated, redirect to login page
    // history.push('/login');
    return false;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
  const expiresAt = Math.floor(
    new Date(sessionStorage.getItem('expires_at')).getTime() / 1000
  );
  console.log('Current timestamp: ' + currentTimestamp);
  console.log('Expires at: ' + expiresAt);
  console.log('Difference in time: ' + (expiresAt - currentTimestamp));

  if (currentTimestamp < expiresAt) {
    localStorage.setItem('loggedIn', true);
    //onLogin(true, username, password);
    window.location.href = '/'; // Redirect to home page
    return true;
  } else {
    console.log('Session Expired');
    localStorage.setItem('loggedIn', false);
    // Handle session expiration, e.g., show a message or redirect to login page
    // history.push('/login');
    return false;
  }
};
