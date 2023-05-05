export const checkSession = () => {
  console.log('Checking Session');
  const sessionToken = sessionStorage.getItem('access_token');
  if (!sessionToken) {
    console.log('No Valid Token');
    localStorage.setItem('loggedIn', false);
    // User is not authenticated, redirect to login page
    //history.push('/login');
    return false;
  }

  // Check if session token has expired
  const sessionDuration = 60 * 60 * 1000; // 1 hour
  const createdAt = sessionStorage.getItem('created_at');
  const now = Date.now();
  console.log(now);
  console.log(createdAt);
  console.log(now - createdAt);
  console.log(sessionDuration);
  console.log(now - createdAt > sessionDuration);
  if (now - createdAt > sessionDuration) {
    // Session has expired, log out the user
    console.log('Session Expired');
    //sessionStorage.removeItem('access_token');
    //sessionStorage.removeItem('created_at');
    //history.push('/login');
    localStorage.setItem('loggedIn', false);
    return false;
  }
  localStorage.setItem('loggedIn', true);
  return true;
  // Set createdAt to current time
  //sessionStorage.setItem('created_at', Date.now());
};

// const checkSession = () => {
//   console.log('Checking Session');
//   const sessionToken = sessionStorage.getItem('access_token');
//   if (!sessionToken) {
//     console.log('No Valid Token');
//     localStorage.setItem('loggedIn', false);
//     // User is not authenticated, redirect to login page
//     //history.push('/login');
//     return false;
//   }

//   // Check if session token has expired
//   const sessionDuration = 60 * 60 * 1000; // 1 hour
//   const createdAt = sessionStorage.getItem('created_at');
//   const now = Date.now();
//   console.log(now);
//   console.log(createdAt);
//   console.log(now - createdAt);
//   console.log(sessionDuration);
//   console.log(now - createdAt > sessionDuration);
//   if (now - createdAt > sessionDuration) {
//     // Session has expired, log out the user
//     console.log('Session Expired');
//     //sessionStorage.removeItem('access_token');
//     //sessionStorage.removeItem('created_at');
//     //history.push('/login');
//     localStorage.setItem('loggedIn', false);
//     return false;
//   }
//   localStorage.setItem('loggedIn', true);
//   return true;
//   // Set createdAt to current time
//   //sessionStorage.setItem('created_at', Date.now());
// };

// // Check session every 5 minutes
// // setInterval(checkSession, 5 * 60 * 1000);
