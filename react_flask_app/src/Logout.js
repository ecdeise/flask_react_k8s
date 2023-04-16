import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import axios from 'axios';
import config from './config.json';

function Logout({onLogout, username}) {
  const baseUrl = config[process.env.NODE_ENV].baseUrl;
  const handleLogout = async () => {
    axios
      .post(`${baseUrl}/auth/logout`, {
        username: username,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.logged_out);
        onLogout(response.data.logged_out, username);
        //onLogin(false, username, password);
        localStorage.clear(); //for localStorage
        sessionStorage.clear(); //for sessionStorage
      })
      .catch((error) => {
        console.log(error);
        console.error(error.response.data);
        // Do something with the error
      });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default Logout;

// import {useState} from 'react';
// import axios from 'axios';
// import {useNavigate} from 'react-router-dom';

// export default function Logout() {
//   const navigate = useNavigate();
//   const [loggingOut, setLoggingOut] = useState(false);

//   const handleLogout = () => {
//     setLoggingOut(true);
//     axios
//       .get('/logout')
//       .then(() => {
//         navigate('/');
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <h2>Logout</h2>
//       <p>Are you sure you want to logout?</p>
//       <button onClick={handleLogout} disabled={loggingOut}>
//         {loggingOut ? 'Logging out...' : 'Logout'}
//       </button>
//     </div>
//   );
// }
