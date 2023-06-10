import React, {useState} from 'react';
import {Typography, Button} from '@material-ui/core';
import axios from 'axios';
import config from '../config';

function SignUp({onSignUp}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
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

  const handleSignUp = () => {
    axios
      .post(`${baseUrl}/auth/signup`, {
        username: username,
        password: password,
        email: email,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        localStorage.setItem('access_token', response.data.access_token);
        onSignUp(true, username, password);
      })
      .catch((error) => {
        console.log(error);
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
    </>
  );
}

export default SignUp;

// import React, {useState} from 'react';
// import axios from 'axios';
// import {makeStyles} from '@material-ui/core/styles';
// import {TextField, Button} from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginTop: theme.spacing(10),
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     width: '100%',
//     marginTop: theme.spacing(2),
//   },
//   textField: {
//     marginBottom: theme.spacing(2),
//   },
//   button: {
//     marginTop: theme.spacing(2),
//   },
// }));

// function Signup() {
//   const classes = useStyles();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post(`${baseUrl}/signup`, {
//         username,
//         password,
//         email,
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error.response.data);
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <h1>Signup</h1>
//       <form className={classes.form} onSubmit={handleSubmit}>
//         <TextField
//           label="Username"
//           variant="outlined"
//           className={classes.textField}
//           value={username}
//           onChange={handleUsernameChange}
//         />
//         <TextField
//           label="Password"
//           variant="outlined"
//           className={classes.textField}
//           type="password"
//           value={password}
//           onChange={handlePasswordChange}
//         />
//         <TextField
//           label="Email"
//           variant="outlined"
//           className={classes.textField}
//           type="email"
//           value={email}
//           onChange={handleEmailChange}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           className={classes.button}
//         >
//           Signup
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default Signup;
