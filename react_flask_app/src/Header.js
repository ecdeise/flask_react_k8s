// import React from 'react';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Deise-Labs Home
          </Typography>
          <Typography variant="h6" className={classes.title}>
            About
          </Typography>
          <Typography variant="h6" className={classes.title}>
            Connect
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;


// function Header() {
//   return (
//     <header>
//       <h1>Deise-Labs Home</h1>
//       <nav>
//         <ul>
//           <li>
//             <a className="header-link" href="/">Home</a>
//           </li>
//           <li>
//             <a className="header-link" href="/about">About</a>
//           </li>
//           <li>
//             <a className="header-link" href="/contact">Contact</a>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;
